import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface StepProgressBarProps {
  currentStep: number;
  className?: string;
}

const STEPS = [
  { id: 1, label: 'Registration', shortLabel: 'Reg', path: '/' },
  { id: 2, label: 'Skills', shortLabel: 'Skills', path: '/skills-survey' },
  { id: 3, label: 'My Team', shortLabel: 'Team', path: '/my-team' },
  { id: 4, label: 'Icebreaker', shortLabel: 'Ice', path: '/icebreaker' },
  { id: 5, label: 'Ideas', shortLabel: 'Ideas', path: '/ideas-submission' },
  { id: 6, label: 'Workflow', shortLabel: 'Flow', path: '/workflow' },
  { id: 7, label: 'Cheat Sheet', shortLabel: 'Tools', path: '/cheatsheet' },
  { id: 8, label: 'Examples', shortLabel: 'Ex', path: '/examples' },
  { id: 9, label: 'Storyboard', shortLabel: 'Story', path: '/storyboard' },
  { id: 10, label: 'Submit', shortLabel: 'Sub', path: '/submit' },
  { id: 11, label: 'Voting', shortLabel: 'Vote', path: '/voting' },
];

const TOTAL_STEPS = 11;

export function StepProgressBar({ currentStep, className }: StepProgressBarProps) {
  const navigate = useNavigate();

  return (
    <div className={cn('w-full', className)}>
      {/* Mobile: Compact progress bar with step indicator */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎬</span>
            <span className="text-sm font-bold text-[#1a1a1a]">
              Step {currentStep} of {TOTAL_STEPS}
            </span>
          </div>
          <span className="text-sm text-[#1a1a1a] font-medium">
            {STEPS[currentStep - 1]?.label}
          </span>
        </div>
        <div 
          className="h-3 bg-white rounded-full overflow-hidden"
          style={{ border: '2px solid #1a1a1a' }}
        >
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ 
              width: `${(currentStep / TOTAL_STEPS) * 100}%`,
              backgroundColor: '#FFD700'
            }}
          />
        </div>
      </div>

      {/* Desktop: Full step indicators - Machine Cinema style */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between">
          {STEPS.map((step, index) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;
            const isPending = step.id > currentStep;

            return (
              <div key={step.id} className="flex items-center flex-1 last:flex-none">
                {/* Step indicator */}
                <button
                  onClick={() => navigate(step.path)}
                  title={step.label}
                  className="flex flex-col items-center group"
                >
                  <div
                    className={cn(
                      'w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 cursor-pointer',
                      isCompleted && 'group-hover:scale-105',
                      isCurrent && 'scale-110',
                      isPending && 'group-hover:scale-105'
                    )}
                    style={{
                      backgroundColor: isCompleted ? '#00FF66' : isCurrent ? '#FFD700' : 'white',
                      border: '3px solid #1a1a1a',
                      color: '#1a1a1a',
                      boxShadow: isCurrent ? '4px 4px 0 #1a1a1a' : 'none'
                    }}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5" />
                    ) : isCurrent ? (
                      <span className="text-base">🎬</span>
                    ) : (
                      step.id
                    )}
                  </div>
                  <span
                    className={cn(
                      'mt-2 text-xs font-bold transition-colors uppercase',
                      isCurrent && 'text-[#1a1a1a]',
                      isCompleted && 'text-[#00D954]',
                      isPending && 'text-gray-400 group-hover:text-[#1a1a1a]'
                    )}
                  >
                    {step.shortLabel}
                  </span>
                </button>

                {/* Connector line */}
                {index < STEPS.length - 1 && (
                  <div
                    className="flex-1 h-1 mx-2 transition-colors duration-300"
                    style={{
                      backgroundColor: step.id < currentStep ? '#FFD700' : '#E5E5E5',
                      border: step.id < currentStep ? '1px solid #1a1a1a' : 'none'
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export { STEPS, TOTAL_STEPS };
