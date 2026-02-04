// ── Types ──

export type DurationCommitment = 'FULL' | 'MOST' | 'HALF' | 'SHORT' | 'UNSURE';

export interface Participant {
  name: string;
  email: string;
  ideaBlurb: string;
  aiCapabilityScore: number; // 0-5
  isEditor: boolean;
  traditionalSkills: string[];
  durationCommitment: DurationCommitment;
}

export interface TeamConfig {
  teamSize: number; // 4-8
  enforceEditorConstraint: boolean;
  enforceAILeadConstraint: boolean;
  enforceAnchorConstraint: boolean;
  anchorsPerTeam: number;
  weightAIBalance: number; // 0-1
  weightDurationBalance: number; // 0-1
  weightSkillCoverage: number; // 0-1
  weightRedundancyPenalty: number; // 0-1
}

export interface TeamDiagnostics {
  hasEditor: boolean;
  hasAILead: boolean;
  avgAIScore: number;
  stabilityScore: number; // 0-100
  skillCoverage: string[];
}

export interface Team {
  id: number;
  members: Participant[];
  diagnostics: TeamDiagnostics;
}

export interface TeamOption {
  id: number;
  teams: Team[];
  overallScore: number;
}

export interface FeasibilityResult {
  feasible: boolean;
  errors: string[];
  warnings: string[];
  stats: {
    totalParticipants: number;
    editorCount: number;
    aiLeadCount: number;
    fullDurationCount: number;
    expectedTeamCount: number;
  };
}

export interface PublishedTeamsData {
  publishedAt: string;
  optionScore: number;
  teams: Array<{
    id: number;
    members: Array<{
      name: string;
      email: string;
      aiCapabilityScore: number;
      isEditor: boolean;
      traditionalSkills: string[];
      durationCommitment: string;
    }>;
  }>;
}

// ── Constants ──

const DURATION_WEIGHTS: Record<DurationCommitment, number> = {
  FULL: 1.0,
  MOST: 0.8,
  HALF: 0.5,
  SHORT: 0.25,
  UNSURE: 0.4,
};

const RESTARTS = 50;
const TOP_OPTIONS = 5;

export const DEFAULT_CONFIG: TeamConfig = {
  teamSize: 6,
  enforceEditorConstraint: true,
  enforceAILeadConstraint: true,
  enforceAnchorConstraint: true,
  anchorsPerTeam: 2,
  weightAIBalance: 0.7,
  weightDurationBalance: 0.6,
  weightSkillCoverage: 0.5,
  weightRedundancyPenalty: 0.4,
};

export const STORAGE_KEY = 'genjam_published_teams';

// ── Helpers ──

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function durationWeight(p: Participant): number {
  return DURATION_WEIGHTS[p.durationCommitment];
}

function isAILead(p: Participant): boolean {
  return p.aiCapabilityScore >= 3;
}

function isAnchor(p: Participant): boolean {
  return durationWeight(p) >= 0.8;
}

// ── Diagnostics ──

export function computeDiagnostics(members: Participant[]): TeamDiagnostics {
  const hasEditor = members.some((m) => m.isEditor);
  const hasAILead = members.some((m) => isAILead(m));
  const avgAIScore = members.length > 0 ? members.reduce((sum, m) => sum + m.aiCapabilityScore, 0) / members.length : 0;

  const totalDurationWeight = members.reduce((sum, m) => sum + durationWeight(m), 0);
  const maxDurationWeight = members.length * 1.0;
  const stabilityScore = maxDurationWeight > 0 ? Math.round((totalDurationWeight / maxDurationWeight) * 100) : 0;

  const skillSet = new Set<string>();
  for (const m of members) {
    for (const s of m.traditionalSkills) {
      skillSet.add(s);
    }
  }

  return {
    hasEditor,
    hasAILead,
    avgAIScore: Math.round(avgAIScore * 10) / 10,
    stabilityScore,
    skillCoverage: Array.from(skillSet),
  };
}

// ── Feasibility Check ──

export function feasibilityCheck(participants: Participant[], config: TeamConfig): FeasibilityResult {
  const N = participants.length;
  const T = Math.ceil(N / config.teamSize);
  const editors = participants.filter((p) => p.isEditor).length;
  const aiLeads = participants.filter((p) => isAILead(p)).length;
  const anchors = participants.filter((p) => isAnchor(p)).length;

  const errors: string[] = [];
  const warnings: string[] = [];

  if (N < config.teamSize) {
    errors.push(`Not enough participants (${N}) to form even one team of ${config.teamSize}`);
  }

  if (config.enforceEditorConstraint && editors < T) {
    errors.push(`Not enough editors: need ${T} (one per team) but only have ${editors}`);
  }

  if (config.enforceAILeadConstraint && aiLeads < T) {
    errors.push(`Not enough AI leads (score >= 3): need ${T} but only have ${aiLeads}`);
  }

  if (config.enforceAnchorConstraint && anchors < T * config.anchorsPerTeam) {
    errors.push(`Not enough full-duration anchors: need ${T * config.anchorsPerTeam} but only have ${anchors}`);
  }

  // Warnings
  if (editors > 0 && editors < T && !config.enforceEditorConstraint) {
    warnings.push(`Only ${editors} editors for ${T} teams — some teams won't have one`);
  }

  if (aiLeads > 0 && aiLeads < T && !config.enforceAILeadConstraint) {
    warnings.push(`Only ${aiLeads} AI leads for ${T} teams — some teams won't have one`);
  }

  const shortDuration = participants.filter((p) => p.durationCommitment === 'SHORT' || p.durationCommitment === 'UNSURE').length;
  if (shortDuration > N * 0.4) {
    warnings.push(`${shortDuration} of ${N} participants have limited availability (SHORT/UNSURE)`);
  }

  return {
    feasible: errors.length === 0,
    errors,
    warnings,
    stats: {
      totalParticipants: N,
      editorCount: editors,
      aiLeadCount: aiLeads,
      fullDurationCount: anchors,
      expectedTeamCount: T,
    },
  };
}

// ── Scoring ──

function scoreTeamForPerson(teamMembers: Participant[], person: Participant, config: TeamConfig): number {
  const allMembers = [...teamMembers, person];

  // AI Balance: how close is the team average to 2.5 (midpoint of 0-5)?
  const aiAvg = allMembers.reduce((s, m) => s + m.aiCapabilityScore, 0) / allMembers.length;
  const aiBalance = 1 - Math.abs(2.5 - aiAvg) / 2.5; // 0-1, higher is better

  // Duration balance: average duration weight
  const durationAvg = allMembers.reduce((s, m) => s + durationWeight(m), 0) / allMembers.length;
  const durationBalance = durationAvg; // 0-1, higher is better

  // Skill coverage: unique skills count normalized
  const skills = new Set<string>();
  for (const m of allMembers) {
    for (const s of m.traditionalSkills) {
      skills.add(s);
    }
  }
  const skillCoverage = Math.min(skills.size / 6, 1); // cap at 6 unique skills

  // Redundancy: penalize duplicate editors
  const editorCount = allMembers.filter((m) => m.isEditor).length;
  const redundancyPenalty = editorCount > 1 ? (editorCount - 1) * 0.3 : 0;

  return (
    config.weightAIBalance * aiBalance +
    config.weightDurationBalance * durationBalance +
    config.weightSkillCoverage * skillCoverage -
    config.weightRedundancyPenalty * redundancyPenalty
  );
}

function scoreOption(teams: Participant[][], config: TeamConfig): number {
  let total = 0;
  for (const team of teams) {
    if (team.length === 0) continue;
    const aiAvg = team.reduce((s, m) => s + m.aiCapabilityScore, 0) / team.length;
    const aiBalance = 1 - Math.abs(2.5 - aiAvg) / 2.5;
    const durationAvg = team.reduce((s, m) => s + durationWeight(m), 0) / team.length;
    const skills = new Set<string>();
    for (const m of team) {
      for (const s of m.traditionalSkills) skills.add(s);
    }
    const skillCoverage = Math.min(skills.size / 6, 1);
    const editorCount = team.filter((m) => m.isEditor).length;
    const redundancy = editorCount > 1 ? (editorCount - 1) * 0.3 : 0;

    total +=
      config.weightAIBalance * aiBalance +
      config.weightDurationBalance * durationAvg +
      config.weightSkillCoverage * skillCoverage -
      config.weightRedundancyPenalty * redundancy;
  }
  return Math.round((total / teams.length) * 100) / 100;
}

// ── Team Generation ──

function generateOnce(participants: Participant[], config: TeamConfig): { teams: Participant[][]; score: number } | null {
  const shuffled = shuffle(participants);
  const T = Math.ceil(shuffled.length / config.teamSize);
  const teams: Participant[][] = Array.from({ length: T }, () => []);
  const used = new Set<string>();

  // Phase A: Seed hard constraints
  if (config.enforceEditorConstraint) {
    const editors = shuffle(shuffled.filter((p) => p.isEditor));
    for (let i = 0; i < T; i++) {
      if (i >= editors.length) return null; // infeasible
      teams[i].push(editors[i]);
      used.add(editors[i].email);
    }
  }

  if (config.enforceAILeadConstraint) {
    const leads = shuffle(shuffled.filter((p) => isAILead(p) && !used.has(p.email)));
    for (let i = 0; i < T; i++) {
      if (teams[i].some((m) => isAILead(m))) continue; // already has one
      const lead = leads.pop();
      if (!lead) return null; // infeasible
      teams[i].push(lead);
      used.add(lead.email);
    }
  }

  if (config.enforceAnchorConstraint) {
    const anchorsPool = shuffle(shuffled.filter((p) => isAnchor(p) && !used.has(p.email)));
    for (let i = 0; i < T; i++) {
      const currentAnchors = teams[i].filter((m) => isAnchor(m)).length;
      let needed = config.anchorsPerTeam - currentAnchors;
      while (needed > 0) {
        const anchor = anchorsPool.pop();
        if (!anchor) return null; // infeasible
        teams[i].push(anchor);
        used.add(anchor.email);
        needed--;
      }
    }
  }

  // Phase B: Fill remaining greedily
  const remaining = shuffle(shuffled.filter((p) => !used.has(p.email)));

  for (const person of remaining) {
    let bestTeamIdx = 0;
    let bestScore = -Infinity;

    for (let i = 0; i < T; i++) {
      // Prefer teams that aren't full yet
      if (teams[i].length >= config.teamSize) continue;
      const s = scoreTeamForPerson(teams[i], person, config);
      if (s > bestScore) {
        bestScore = s;
        bestTeamIdx = i;
      }
    }

    // If all preferred teams are full, find the smallest team
    if (bestScore === -Infinity) {
      let minSize = Infinity;
      for (let i = 0; i < T; i++) {
        if (teams[i].length < minSize) {
          minSize = teams[i].length;
          bestTeamIdx = i;
        }
      }
    }

    teams[bestTeamIdx].push(person);
  }

  const score = scoreOption(teams, config);
  return { teams, score };
}

export function generateTeams(participants: Participant[], config: TeamConfig): TeamOption[] {
  const results: Array<{ teams: Participant[][]; score: number }> = [];

  for (let i = 0; i < RESTARTS; i++) {
    const result = generateOnce(participants, config);
    if (result) {
      results.push(result);
    }
  }

  // Sort by score descending and take top N
  results.sort((a, b) => b.score - a.score);
  const top = results.slice(0, TOP_OPTIONS);

  return top.map((result, idx) => ({
    id: idx + 1,
    teams: result.teams.map((members, teamIdx) => ({
      id: teamIdx + 1,
      members,
      diagnostics: computeDiagnostics(members),
    })),
    overallScore: result.score,
  }));
}

// ── CSV Export ──

export function exportTeamsToCSV(option: TeamOption): string {
  const rows: string[] = ['team_number,name,email,ai_capability_score,is_editor,traditional_skills,duration_commitment'];

  for (const team of option.teams) {
    for (const m of team.members) {
      const skills = m.traditionalSkills.join(';');
      rows.push(`${team.id},"${m.name}","${m.email}",${m.aiCapabilityScore},${m.isEditor},"${skills}",${m.durationCommitment}`);
    }
  }

  return rows.join('\n');
}
