import { useState, useRef } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { cn } from '@/lib/utils';
import { parseCSV } from '@/lib/csvParser';
import type { CSVParseResult } from '@/lib/csvParser';
import {
  feasibilityCheck,
  generateTeams,
  exportTeamsToCSV,
  DEFAULT_CONFIG,
  STORAGE_KEY,
} from '@/lib/teamBuilder';
import type {
  Participant,
  TeamConfig,
  TeamOption,
  FeasibilityResult,
  PublishedTeamsData,
} from '@/lib/teamBuilder';
import {
  Upload,
  FileSpreadsheet,
  Users,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ChevronRight,
  ChevronLeft,
  Download,
  Zap,
  Shield,
  Clock,
  Brain,
  Film,
  RotateCcw,
} from 'lucide-react';

type BuilderPhase = 'upload' | 'preview' | 'configure' | 'results';

const PHASE_LABELS: Record<BuilderPhase, string> = {
  upload: 'Upload CSV',
  preview: 'Preview Data',
  configure: 'Configure',
  results: 'Results',
};

const PHASES: BuilderPhase[] = ['upload', 'preview', 'configure', 'results'];

export function TeamBuilderPage() {
  const [phase, setPhase] = useState<BuilderPhase>('upload');
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [parseErrors, setParseErrors] = useState<string[]>([]);
  const [config, setConfig] = useState<TeamConfig>(DEFAULT_CONFIG);
  const [feasibility, setFeasibility] = useState<FeasibilityResult | null>(null);
  const [options, setOptions] = useState<TeamOption[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [published, setPublished] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── File handling ──

  const processFile = (file: File) => {
    if (!file.name.endsWith('.csv')) {
      setParseErrors(['Please upload a .csv file']);
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const result: CSVParseResult = parseCSV(text);
      setParticipants(result.participants);
      setParseErrors(result.errors);
      if (result.participants.length > 0) {
        setPhase('preview');
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  // ── Config helpers ──

  const updateConfig = (partial: Partial<TeamConfig>) => {
    const newConfig = { ...config, ...partial };
    setConfig(newConfig);
    if (participants.length > 0) {
      setFeasibility(feasibilityCheck(participants, newConfig));
    }
  };

  // ── Generation ──

  const handleGenerate = () => {
    setIsGenerating(true);
    // Use setTimeout to allow UI to update before running computation
    setTimeout(() => {
      const result = generateTeams(participants, config);
      setOptions(result);
      setSelectedOptionId(null);
      setPublished(false);
      setIsGenerating(false);
      setPhase('results');
    }, 50);
  };

  // ── Publish ──

  const handlePublish = (optionId: number) => {
    const option = options.find((o) => o.id === optionId);
    if (!option) return;

    const data: PublishedTeamsData = {
      publishedAt: new Date().toISOString(),
      optionScore: option.overallScore,
      teams: option.teams.map((team) => ({
        id: team.id,
        members: team.members.map((m) => ({
          name: m.name,
          email: m.email,
          aiCapabilityScore: m.aiCapabilityScore,
          isEditor: m.isEditor,
          traditionalSkills: m.traditionalSkills,
          durationCommitment: m.durationCommitment,
        })),
      })),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setSelectedOptionId(optionId);
    setPublished(true);
  };

  // ── Export ──

  const handleExport = (optionId: number) => {
    const option = options.find((o) => o.id === optionId);
    if (!option) return;

    const csv = exportTeamsToCSV(option);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `genjam_teams_option_${optionId}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ── Reset ──

  const handleReset = () => {
    setPhase('upload');
    setParticipants([]);
    setParseErrors([]);
    setOptions([]);
    setSelectedOptionId(null);
    setPublished(false);
    setFeasibility(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // ── Phase navigation ──

  const goToPhase = (p: BuilderPhase) => {
    if (p === 'configure' && participants.length > 0) {
      setFeasibility(feasibilityCheck(participants, config));
    }
    setPhase(p);
  };

  const currentPhaseIdx = PHASES.indexOf(phase);

  return (
    <AdminLayout>
      {/* Page Title */}
      <div className="text-center mb-8 sm:mb-20">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: '#1a1a1a' }}>
          Team Builder
        </h1>
        <p className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto">
          Upload your Google Form responses, configure constraints, and generate balanced teams.
        </p>
      </div>

      {/* Phase Breadcrumb */}
      <div className="flex items-center justify-center gap-3 mb-8 sm:mb-20 flex-wrap">
        {PHASES.map((p, i) => (
          <div key={p} className="flex items-center gap-3">
            <button
              onClick={() => {
                if (p === 'upload' || (p === 'preview' && participants.length > 0) || (p === 'configure' && participants.length > 0) || (p === 'results' && options.length > 0)) {
                  goToPhase(p);
                }
              }}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide transition-all',
                phase === p
                  ? 'text-[#1a1a1a]'
                  : currentPhaseIdx > i
                    ? 'text-[#00D954] cursor-pointer hover:opacity-80'
                    : 'text-gray-400'
              )}
              style={phase === p ? { backgroundColor: '#FFD700', border: '2px solid #1a1a1a' } : {}}
            >
              {PHASE_LABELS[p]}
            </button>
            {i < PHASES.length - 1 && <ChevronRight className="w-4 h-4 text-gray-300" />}
          </div>
        ))}
      </div>

      {/* ═══════════════ UPLOAD PHASE ═══════════════ */}
      {phase === 'upload' && (
        <div className="space-y-8">
          <div
            className={cn(
              'card flex flex-col items-center justify-center py-16 sm:py-20 cursor-pointer transition-all',
              isDragOver && 'ring-4 ring-[#FFD700] ring-offset-2'
            )}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
          >
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
              style={{ backgroundColor: isDragOver ? '#FFD700' : '#F5F5F5', border: '3px solid #1a1a1a' }}
            >
              <Upload className="w-10 h-10" style={{ color: isDragOver ? '#1a1a1a' : '#999' }} />
            </div>
            <h2 className="text-xl font-bold mb-10">Drop your CSV here</h2>
            <p className="text-gray-500 mb-6">or click to browse files</p>
            <span className="badge badge-secondary">CSV from Google Sheets</span>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {parseErrors.length > 0 && participants.length === 0 && (
            <div className="card" style={{ borderColor: '#FF3366' }}>
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#FF3366' }} />
                <div>
                  <h3 className="font-bold text-[#FF3366]">Parse Errors</h3>
                  {parseErrors.map((err, i) => (
                    <p key={i} className="text-sm text-gray-600 mt-1">{err}</p>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Expected format hint */}
          <div className="card">
            <h3 className="font-bold mb-4 flex items-center gap-3">
              <FileSpreadsheet className="w-5 h-5" />
              Expected CSV Format
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-2 px-3 font-bold">Column</th>
                    <th className="text-left py-2 px-3 font-bold">Type</th>
                    <th className="text-left py-2 px-3 font-bold">Example</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-b border-gray-100"><td className="py-2 px-3 font-medium">name</td><td className="py-2 px-3">text</td><td className="py-2 px-3">Alice Smith</td></tr>
                  <tr className="border-b border-gray-100"><td className="py-2 px-3 font-medium">email</td><td className="py-2 px-3">text</td><td className="py-2 px-3">alice@example.com</td></tr>
                  <tr className="border-b border-gray-100"><td className="py-2 px-3 font-medium">idea_blurb</td><td className="py-2 px-3">text</td><td className="py-2 px-3">A time travel story</td></tr>
                  <tr className="border-b border-gray-100"><td className="py-2 px-3 font-medium">ai_capability_score</td><td className="py-2 px-3">0-5</td><td className="py-2 px-3">3</td></tr>
                  <tr className="border-b border-gray-100"><td className="py-2 px-3 font-medium">is_editor</td><td className="py-2 px-3">true/false</td><td className="py-2 px-3">true</td></tr>
                  <tr className="border-b border-gray-100"><td className="py-2 px-3 font-medium">traditional_skills</td><td className="py-2 px-3">semicolon-separated</td><td className="py-2 px-3">writing;directing</td></tr>
                  <tr><td className="py-2 px-3 font-medium">duration_commitment</td><td className="py-2 px-3">enum</td><td className="py-2 px-3">FULL / MOST / HALF / SHORT / UNSURE</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════ PREVIEW PHASE ═══════════════ */}
      {phase === 'preview' && (
        <div className="space-y-8">
          {/* Stats bar */}
          <div className="flex flex-wrap gap-4">
            <div className="card flex-1 min-w-[140px] text-center py-5">
              <div className="text-3xl font-bold" style={{ color: '#1a1a1a' }}>{participants.length}</div>
              <div className="text-sm text-gray-500 font-medium mt-1">Participants</div>
            </div>
            <div className="card flex-1 min-w-[140px] text-center py-5">
              <div className="text-3xl font-bold" style={{ color: '#00D954' }}>{participants.filter((p) => p.isEditor).length}</div>
              <div className="text-sm text-gray-500 font-medium mt-1">Editors</div>
            </div>
            <div className="card flex-1 min-w-[140px] text-center py-5">
              <div className="text-3xl font-bold" style={{ color: '#00D4FF' }}>{participants.filter((p) => p.aiCapabilityScore >= 3).length}</div>
              <div className="text-sm text-gray-500 font-medium mt-1">AI Leads (3+)</div>
            </div>
            <div className="card flex-1 min-w-[140px] text-center py-5">
              <div className="text-3xl font-bold" style={{ color: '#9966FF' }}>{participants.filter((p) => p.durationCommitment === 'FULL' || p.durationCommitment === 'MOST').length}</div>
              <div className="text-sm text-gray-500 font-medium mt-1">Full Duration</div>
            </div>
          </div>

          {parseErrors.length > 0 && (
            <div className="rounded-xl px-6 py-5 flex items-start gap-3" style={{ backgroundColor: '#FFF3CD', border: '2px solid #FFD700' }}>
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#CC8800' }} />
              <div>
                <p className="font-bold text-sm" style={{ color: '#CC8800' }}>{parseErrors.length} row(s) had issues</p>
                {parseErrors.slice(0, 5).map((err, i) => (
                  <p key={i} className="text-sm text-gray-600">{err}</p>
                ))}
                {parseErrors.length > 5 && <p className="text-sm text-gray-400">...and {parseErrors.length - 5} more</p>}
              </div>
            </div>
          )}

          {/* Participant table */}
          <div className="card overflow-hidden">
            <h3 className="font-bold mb-4">Participant Preview</h3>
            <div className="overflow-x-auto -mx-6 sm:-mx-8 px-6 sm:px-8">
              <table className="w-full text-sm min-w-[700px]">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-2 font-bold">#</th>
                    <th className="text-left py-3 px-2 font-bold">Name</th>
                    <th className="text-left py-3 px-2 font-bold">Email</th>
                    <th className="text-center py-3 px-2 font-bold">AI Score</th>
                    <th className="text-center py-3 px-2 font-bold">Editor</th>
                    <th className="text-left py-3 px-2 font-bold">Skills</th>
                    <th className="text-center py-3 px-2 font-bold">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {participants.map((p, i) => (
                    <tr key={p.email} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-2.5 px-2 text-gray-400">{i + 1}</td>
                      <td className="py-2.5 px-2 font-medium">{p.name}</td>
                      <td className="py-2.5 px-2 text-gray-500">{p.email}</td>
                      <td className="py-2.5 px-2 text-center">
                        <span
                          className="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold"
                          style={{
                            backgroundColor: p.aiCapabilityScore >= 4 ? '#00FF66' : p.aiCapabilityScore >= 2 ? '#FFD700' : '#F5F5F5',
                            border: '2px solid #1a1a1a',
                          }}
                        >
                          {p.aiCapabilityScore}
                        </span>
                      </td>
                      <td className="py-2.5 px-2 text-center">
                        {p.isEditor ? (
                          <CheckCircle className="w-5 h-5 inline" style={{ color: '#00D954' }} />
                        ) : (
                          <span className="text-gray-300">-</span>
                        )}
                      </td>
                      <td className="py-2.5 px-2">
                        <div className="flex flex-wrap gap-1">
                          {p.traditionalSkills.slice(0, 3).map((s) => (
                            <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                              {s}
                            </span>
                          ))}
                          {p.traditionalSkills.length > 3 && (
                            <span className="text-xs text-gray-400">+{p.traditionalSkills.length - 3}</span>
                          )}
                        </div>
                      </td>
                      <td className="py-2.5 px-2 text-center">
                        <span
                          className={cn(
                            'text-xs font-bold px-2 py-1 rounded-full',
                            p.durationCommitment === 'FULL' && 'bg-green-100 text-green-700',
                            p.durationCommitment === 'MOST' && 'bg-blue-100 text-blue-700',
                            p.durationCommitment === 'HALF' && 'bg-yellow-100 text-yellow-700',
                            p.durationCommitment === 'SHORT' && 'bg-red-100 text-red-700',
                            p.durationCommitment === 'UNSURE' && 'bg-gray-100 text-gray-500'
                          )}
                        >
                          {p.durationCommitment}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button className="btn btn-ghost" onClick={handleReset}>
              <ChevronLeft className="w-4 h-4 mr-1 inline" /> Start Over
            </button>
            <button className="btn btn-primary" onClick={() => goToPhase('configure')}>
              Configure Teams <ChevronRight className="w-4 h-4 ml-1 inline" />
            </button>
          </div>
        </div>
      )}

      {/* ═══════════════ CONFIGURE PHASE ═══════════════ */}
      {phase === 'configure' && (
        <div className="space-y-8">
          {/* Team Size */}
          <div className="card">
            <h3 className="font-bold mb-6 flex items-center gap-3">
              <Users className="w-5 h-5" /> Team Size
            </h3>
            <div className="flex items-center gap-6">
              <input
                type="range"
                min={4}
                max={8}
                value={config.teamSize}
                onChange={(e) => updateConfig({ teamSize: parseInt(e.target.value) })}
                className="flex-1 h-3 rounded-full appearance-none cursor-pointer"
                style={{ accentColor: '#FFD700' }}
              />
              <span
                className="text-2xl font-bold w-12 h-12 flex items-center justify-center rounded-xl"
                style={{ backgroundColor: '#FFD700', border: '2px solid #1a1a1a' }}
              >
                {config.teamSize}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              {participants.length} participants / {config.teamSize} per team = {Math.ceil(participants.length / config.teamSize)} teams
            </p>
          </div>

          {/* Hard Constraints */}
          <div className="card">
            <h3 className="font-bold mb-6 flex items-center gap-3">
              <Shield className="w-5 h-5" /> Hard Constraints
            </h3>
            <div className="space-y-5">
              <ToggleRow
                label="Require editor per team"
                description="Every team must have at least one person who can edit end-to-end"
                icon={<Film className="w-5 h-5" />}
                checked={config.enforceEditorConstraint}
                onChange={(v) => updateConfig({ enforceEditorConstraint: v })}
              />
              <ToggleRow
                label="Require AI lead per team"
                description="Every team must have someone with AI capability score >= 3"
                icon={<Brain className="w-5 h-5" />}
                checked={config.enforceAILeadConstraint}
                onChange={(v) => updateConfig({ enforceAILeadConstraint: v })}
              />
              <ToggleRow
                label="Require full-duration anchors"
                description={`At least ${config.anchorsPerTeam} member(s) per team committed FULL or MOST`}
                icon={<Clock className="w-5 h-5" />}
                checked={config.enforceAnchorConstraint}
                onChange={(v) => updateConfig({ enforceAnchorConstraint: v })}
              />
            </div>
          </div>

          {/* Soft Weights */}
          <div className="card">
            <h3 className="font-bold mb-6 flex items-center gap-3">
              <Zap className="w-5 h-5" /> Optimization Weights
            </h3>
            <div className="space-y-8">
              <WeightSlider label="AI Skill Balance" value={config.weightAIBalance} onChange={(v) => updateConfig({ weightAIBalance: v })} />
              <WeightSlider label="Duration Stability" value={config.weightDurationBalance} onChange={(v) => updateConfig({ weightDurationBalance: v })} />
              <WeightSlider label="Skill Coverage" value={config.weightSkillCoverage} onChange={(v) => updateConfig({ weightSkillCoverage: v })} />
              <WeightSlider label="Redundancy Penalty" value={config.weightRedundancyPenalty} onChange={(v) => updateConfig({ weightRedundancyPenalty: v })} />
            </div>
          </div>

          {/* Feasibility Display */}
          {feasibility && (
            <div className="card" style={{ borderColor: feasibility.feasible ? '#00D954' : '#FF3366' }}>
              <h3 className="font-bold mb-4 flex items-center gap-3">
                {feasibility.feasible ? (
                  <CheckCircle className="w-5 h-5" style={{ color: '#00D954' }} />
                ) : (
                  <XCircle className="w-5 h-5" style={{ color: '#FF3366' }} />
                )}
                Feasibility Check
              </h3>

              {feasibility.errors.length > 0 && (
                <div className="space-y-10 mb-4">
                  {feasibility.errors.map((err, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm">
                      <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#FF3366' }} />
                      <span style={{ color: '#FF3366' }}>{err}</span>
                    </div>
                  ))}
                </div>
              )}

              {feasibility.warnings.length > 0 && (
                <div className="space-y-10 mb-4">
                  {feasibility.warnings.map((w, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm">
                      <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#CC8800' }} />
                      <span className="text-gray-600">{w}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <span>{feasibility.stats.totalParticipants} participants</span>
                <span>{feasibility.stats.expectedTeamCount} teams</span>
                <span>{feasibility.stats.editorCount} editors</span>
                <span>{feasibility.stats.aiLeadCount} AI leads</span>
                <span>{feasibility.stats.fullDurationCount} anchors</span>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between">
            <button className="btn btn-ghost" onClick={() => goToPhase('preview')}>
              <ChevronLeft className="w-4 h-4 mr-1 inline" /> Back to Preview
            </button>
            <button
              className="btn btn-primary"
              disabled={feasibility !== null && !feasibility.feasible}
              onClick={handleGenerate}
            >
              {isGenerating ? 'Generating...' : 'Generate Teams'}
              <Zap className="w-4 h-4 ml-1 inline" />
            </button>
          </div>
        </div>
      )}

      {/* ═══════════════ RESULTS PHASE ═══════════════ */}
      {phase === 'results' && (
        <div className="space-y-8">
          {published && (
            <div
              className="rounded-xl px-6 py-5 flex items-start gap-3"
              style={{ backgroundColor: '#E8FFF0', border: '2px solid #00D954' }}
            >
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#00D954' }} />
              <div>
                <p className="font-bold text-sm" style={{ color: '#00A843' }}>Teams Published!</p>
                <p className="text-sm text-gray-600">
                  Participants can now view their team assignments at <strong>/my-team</strong>
                </p>
              </div>
            </div>
          )}

          {options.length === 0 ? (
            <div className="card text-center py-16">
              <p className="text-gray-500">No options generated. Try adjusting constraints.</p>
            </div>
          ) : (
            <>
              {/* Option Tabs */}
              <div className="flex flex-wrap gap-3">
                {options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedOptionId(opt.id)}
                    className={cn(
                      'px-5 py-3 rounded-xl font-bold text-sm transition-all border-2',
                      (selectedOptionId ?? options[0].id) === opt.id
                        ? 'border-[#1a1a1a] shadow-[4px_4px_0_#1a1a1a]'
                        : 'border-gray-200 hover:border-gray-400'
                    )}
                    style={(selectedOptionId ?? options[0].id) === opt.id ? { backgroundColor: '#FFD700' } : {}}
                  >
                    Option {opt.id}
                    <span className="ml-2 text-xs opacity-70">({opt.overallScore.toFixed(1)})</span>
                  </button>
                ))}
              </div>

              {/* Active Option Detail */}
              {(() => {
                const activeOption = options.find((o) => o.id === (selectedOptionId ?? options[0].id));
                if (!activeOption) return null;

                return (
                  <div className="space-y-8">
                    {/* Team Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {activeOption.teams.map((team) => (
                        <div key={team.id} className="card">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-bold text-lg">Team {team.id}</h4>
                            <span className="text-sm text-gray-400">{team.members.length} members</span>
                          </div>

                          {/* Members */}
                          <div className="space-y-4 mb-4">
                            {team.members.map((m) => (
                              <div key={m.email} className="flex items-center gap-3 text-sm">
                                <span
                                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                                  style={{
                                    backgroundColor: m.aiCapabilityScore >= 4 ? '#00FF66' : m.aiCapabilityScore >= 2 ? '#FFD700' : '#F5F5F5',
                                    border: '2px solid #1a1a1a',
                                  }}
                                >
                                  {m.aiCapabilityScore}
                                </span>
                                <span className="font-medium flex-1">{m.name}</span>
                                {m.isEditor && (
                                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-bold">
                                    Editor
                                  </span>
                                )}
                                <span
                                  className={cn(
                                    'text-xs font-bold px-2 py-0.5 rounded-full',
                                    m.durationCommitment === 'FULL' && 'bg-green-100 text-green-700',
                                    m.durationCommitment === 'MOST' && 'bg-blue-100 text-blue-700',
                                    m.durationCommitment === 'HALF' && 'bg-yellow-100 text-yellow-700',
                                    m.durationCommitment === 'SHORT' && 'bg-red-100 text-red-700',
                                    m.durationCommitment === 'UNSURE' && 'bg-gray-100 text-gray-500'
                                  )}
                                >
                                  {m.durationCommitment}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Diagnostics row */}
                          <div className="pt-16 border-t border-gray-100 flex flex-wrap gap-3 text-xs">
                            <span className={cn('flex items-center gap-1', team.diagnostics.hasEditor ? 'text-green-600' : 'text-red-500')}>
                              {team.diagnostics.hasEditor ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                              Editor
                            </span>
                            <span className={cn('flex items-center gap-1', team.diagnostics.hasAILead ? 'text-green-600' : 'text-red-500')}>
                              {team.diagnostics.hasAILead ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                              AI Lead
                            </span>
                            <span className="text-gray-500">
                              Stability: {team.diagnostics.stabilityScore}%
                            </span>
                            <span className="text-gray-500">
                              Avg AI: {team.diagnostics.avgAIScore}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap gap-4 justify-center">
                      <button
                        className="btn btn-primary"
                        onClick={() => handlePublish(activeOption.id)}
                      >
                        {published && selectedOptionId === activeOption.id ? 'Published!' : 'Publish This Option'}
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleExport(activeOption.id)}
                      >
                        <Download className="w-4 h-4 mr-1 inline" />
                        Export CSV
                      </button>
                    </div>
                  </div>
                );
              })()}
            </>
          )}

          {/* Bottom navigation */}
          <div className="flex justify-between">
            <button className="btn btn-ghost" onClick={() => goToPhase('configure')}>
              <ChevronLeft className="w-4 h-4 mr-1 inline" /> Back to Configure
            </button>
            <button className="btn btn-ghost" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-1 inline" /> Start Over
            </button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

// ── Sub-components ──

function ToggleRow({
  label,
  description,
  icon,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  icon: React.ReactNode;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-100 flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <p className="font-medium text-sm">{label}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={cn(
          'relative w-12 h-7 rounded-full transition-colors flex-shrink-0',
          checked ? 'bg-[#00D954]' : 'bg-gray-300'
        )}
        style={{ border: '2px solid #1a1a1a' }}
      >
        <span
          className={cn(
            'absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white transition-transform',
            checked ? 'translate-x-5.5' : 'translate-x-0.5'
          )}
          style={{ width: '18px', height: '18px', border: '2px solid #1a1a1a' }}
        />
      </button>
    </div>
  );
}

function WeightSlider({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm text-gray-500 font-mono">{Math.round(value * 100)}%</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={Math.round(value * 100)}
        onChange={(e) => onChange(parseInt(e.target.value) / 100)}
        className="w-full h-2.5 rounded-full appearance-none cursor-pointer"
        style={{ accentColor: '#FFD700' }}
      />
    </div>
  );
}
