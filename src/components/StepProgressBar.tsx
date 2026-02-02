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
  { id: 3, label: 'Icebreaker', shortLabel: 'Ice', path: '/icebreaker' },
  { id: 4, label: 'Ideas', shortLabel: 'Ideas', path: '/ideas-submission' },
  { id: 5, label: 'Workflow', shortLabel: 'Flow', path: '/workflow' },
  { id: 6, label: 'Cheat Sheet', shortLabel: 'Tools', path: '/cheatsheet' },
  { id: 7, label: 'Examples', shortLabel: 'Ex', path: '/examples' },
  { id: 8, label: 'Storyboard', shortLabel: 'Story', path: '/storyboard' },
  { id: 9, label: 'Submit', shortLabel: 'Sub', path: '/submit' },
  { id: 10, label: 'Voting', shortLabel: 'Vote', path: '/voting' },
];

const TOTAL_STEPS = 10;

export function StepProgressBar({ currentStep, className }: StepProgressBarProps) {
  const navigate = useNavigate();

  return (
    <div className={cn('w-full', className)}>
      {/* Mobile: Compact progress bar with step indicator */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎬</span>
            <span className="text-sm font-semibold text-gray-700">
              Step {currentStep} of {TOTAL_STEPS}
            </span>
          </div>
          <span className="text-sm text-gray-500 font-medium">
            {STEPS[currentStep - 1]?.label}
          </span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      {/* Desktop: Full step indicators */}
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
                      'w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 cursor-pointer border-2',
                      isCompleted && 'bg-primary-100 border-primary-300 text-primary-700 group-hover:bg-primary-200 group-hover:scale-105',
                      isCurrent && 'bg-gradient-primary border-primary-500 text-white shadow-lg scale-110',
                      isPending && 'bg-gray-50 border-gray-200 text-gray-400 group-hover:bg-gray-100 group-hover:border-gray-300 group-hover:scale-105'
                    )}
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
                      'mt-2 text-xs font-medium transition-colors',
                      isCurrent && 'text-primary-600 font-semibold',
                      isCompleted && 'text-primary-500 group-hover:text-primary-700',
                      isPending && 'text-gray-400 group-hover:text-gray-600'
                    )}
                  >
                    {step.shortLabel}
                  </span>
                </button>

                {/* Connector line */}
                {index < STEPS.length - 1 && (
                  <div
                    className={cn(
                      'flex-1 h-0.5 mx-2 transition-colors duration-300 rounded-full',
                      step.id < currentStep ? 'bg-primary-300' : 'bg-gray-200'
                    )}
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
