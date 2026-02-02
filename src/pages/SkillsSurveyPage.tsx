import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, GenJamHeader } from '@/components';
import { cn } from '@/lib/utils';
import {
  Pen,
  Film,
  Music,
  Palette,
  Sparkles,
  Volume2,
  Clapperboard,
  Wand2,
  Box,
  Camera,
  Mic,
  Brain,
} from 'lucide-react';

type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

interface SkillCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const SKILLS: SkillCategory[] = [
  { id: 'writing', name: 'Writing & Storytelling', icon: <Pen className="w-5 h-5" />, description: 'Script writing, dialogue, narrative' },
  { id: 'directing', name: 'Directing', icon: <Clapperboard className="w-5 h-5" />, description: 'Vision, shot planning, leadership' },
  { id: 'video_editing', name: 'Video Editing', icon: <Film className="w-5 h-5" />, description: 'Cutting, pacing, transitions' },
  { id: 'sound_design', name: 'Sound Design', icon: <Volume2 className="w-5 h-5" />, description: 'Sound effects, audio mixing' },
  { id: 'music', name: 'Music Composition', icon: <Music className="w-5 h-5" />, description: 'Scoring, soundtrack creation' },
  { id: 'visual_effects', name: 'Visual Effects', icon: <Sparkles className="w-5 h-5" />, description: 'VFX, compositing, motion graphics' },
  { id: 'animation', name: 'Animation', icon: <Wand2 className="w-5 h-5" />, description: '2D/3D animation, motion design' },
  { id: '3d_modeling', name: '3D Modeling', icon: <Box className="w-5 h-5" />, description: 'Character/environment modeling' },
  { id: 'cinematography', name: 'Cinematography', icon: <Camera className="w-5 h-5" />, description: 'Lighting, framing, camera work' },
  { id: 'voice_acting', name: 'Voice Acting', icon: <Mic className="w-5 h-5" />, description: 'Character voices, narration' },
  { id: 'concept_art', name: 'Concept Art', icon: <Palette className="w-5 h-5" />, description: 'Visual development, design' },
  { id: 'ai_tools', name: 'AI Tools', icon: <Brain className="w-5 h-5" />, description: 'Prompt engineering, AI workflows' },
];

const EXPERIENCE_LEVELS: { value: SkillLevel; label: string; description: string }[] = [
  { value: 'beginner', label: 'Beginner', description: 'Just starting out' },
  { value: 'intermediate', label: 'Intermediate', description: 'Some experience' },
  { value: 'advanced', label: 'Advanced', description: 'Very experienced' },
  { value: 'expert', label: 'Expert', description: 'Professional level' },
];

const PREFERRED_ROLES = [
  'Director',
  'Producer',
  'Writer',
  'Editor',
  'Sound Designer',
  'Composer',
  'VFX Artist',
  'Animator',
  'Voice Actor',
];

export function SkillsSurveyPage() {
  const navigate = useNavigate();
  const [selectedSkills, setSelectedSkills] = useState<Record<string, SkillLevel>>({});
  const [preferredRole, setPreferredRole] = useState<string>('');
  const [excitedToLearn, setExcitedToLearn] = useState<string>('');

  const toggleSkill = (skillId: string) => {
    setSelectedSkills((prev) => {
      const newSkills = { ...prev };
      if (newSkills[skillId]) {
        delete newSkills[skillId];
      } else {
        newSkills[skillId] = 'intermediate';
      }
      return newSkills;
    });
  };

  const setSkillLevel = (skillId: string, level: SkillLevel) => {
    setSelectedSkills((prev) => ({
      ...prev,
      [skillId]: level,
    }));
  };

  const handleSubmit = () => {
    // TODO: Save to backend
    console.log('Skills data:', { selectedSkills, preferredRole, excitedToLearn });
    navigate('/icebreaker');
  };

  return (
    <Layout
      currentStep={2}
      backTo="/"
      backLabel="Back to Registration"
      nextTo="/icebreaker"
      nextLabel="Continue to Icebreaker"
      onNext={handleSubmit}
      header={
        <GenJamHeader
          title="Skills Survey"
          subtitle="Help us understand your creative background so we can form balanced teams."
          currentStep={2}
          emoji="🎯"
        />
      }
    >
      <div className="mt-8 sm:mt-10 space-y-8 sm:space-y-10">
        {/* Skills Grid */}
        <div className="card">
          <h2 className="text-xl font-bold mb-6">Your Creative Skills</h2>
          <p className="text-gray-600 mb-8">
            Select the skills you have and rate your experience level. Click a skill to select it.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SKILLS.map((skill) => {
              const isSelected = selectedSkills[skill.id] !== undefined;
              const level = selectedSkills[skill.id];

              return (
                <div
                  key={skill.id}
                  className={cn(
                    'rounded-2xl border-2 p-5 transition-all duration-200 cursor-pointer',
                    isSelected
                      ? 'border-primary-400 bg-primary-50'
                      : 'border-gray-200 bg-white hover:border-primary-200 hover:bg-primary-50/50'
                  )}
                  onClick={() => toggleSkill(skill.id)}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        'w-12 h-12 rounded-xl flex items-center justify-center transition-colors flex-shrink-0',
                        isSelected
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 text-gray-500'
                      )}
                    >
                      {skill.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg">{skill.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{skill.description}</p>
                    </div>
                  </div>

                  {/* Experience Level Selector */}
                  {isSelected && (
                    <div
                      className="mt-5 pt-5 border-t border-primary-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <p className="text-sm font-medium text-gray-700 mb-3">
                        Experience Level:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {EXPERIENCE_LEVELS.map((exp) => (
                          <button
                            key={exp.value}
                            onClick={() => setSkillLevel(skill.id, exp.value)}
                            className={cn(
                              'px-4 py-2 rounded-full text-sm font-medium transition-all',
                              level === exp.value
                                ? 'bg-primary-500 text-white'
                                : 'bg-white text-gray-600 hover:bg-primary-100'
                            )}
                          >
                            {exp.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Preferred Role */}
        <div className="card">
          <h2 className="text-xl font-bold mb-6">Preferred Role</h2>
          <p className="text-gray-600 mb-6">
            What role do you prefer to take in a creative project?
          </p>

          <div className="flex flex-wrap gap-4">
            {PREFERRED_ROLES.map((role) => (
              <button
                key={role}
                onClick={() => setPreferredRole(role)}
                className={cn(
                  'px-5 py-3 rounded-xl border-2 font-medium transition-all',
                  preferredRole === role
                    ? 'border-primary-500 bg-primary-100 text-primary-700'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-primary-300'
                )}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* What are you excited to learn */}
        <div className="card">
          <h2 className="text-xl font-bold mb-6">What Are You Excited to Learn?</h2>
          <p className="text-gray-600 mb-6">
            Tell us what you're hoping to explore or improve during this GenJam.
          </p>

          <textarea
            value={excitedToLearn}
            onChange={(e) => setExcitedToLearn(e.target.value)}
            placeholder="I'm excited to learn about AI video generation tools and how to create compelling narratives using AI..."
            className="input min-h-[150px] resize-none"
          />
        </div>

        {/* Summary */}
        {Object.keys(selectedSkills).length > 0 && (
          <div className="bg-primary-50 rounded-2xl p-6 border border-primary-200">
            <p className="text-base text-primary-700">
              <span className="font-semibold">
                {Object.keys(selectedSkills).length} skill{Object.keys(selectedSkills).length !== 1 ? 's' : ''}
              </span>{' '}
              selected
              {preferredRole && (
                <>
                  {' '}• Preferred role: <span className="font-semibold">{preferredRole}</span>
                </>
              )}
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
