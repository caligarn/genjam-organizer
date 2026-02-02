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
  { id: 11, label: 'Follow-up', shortLabel: 'Done', path: '/followup' },
];

export function StepProgressBar({ currentStep, className }: StepProgressBarProps) {
  const navigate = useNavigate();

  return (
    <div className={cn('w-full', className)}>
      {/* Mobile: Compact step dots with progress bar */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-primary-600">
            Step {currentStep} of 11
          </span>
          <span className="text-sm text-gray-500">
            {STEPS[currentStep - 1]?.label}
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-gradient-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / 11) * 100}%` }}
          />
        </div>
        <div className="flex items-center justify-between">
          {STEPS.map((step) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;
            return (
              <button
                key={step.id}
                onClick={() => navigate(step.path)}
                title={step.label}
                className={cn(
                  'w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-semibold transition-all duration-200',
                  isCompleted && 'bg-primary-200 text-primary-700 hover:bg-primary-300',
                  isCurrent && 'bg-gradient-primary text-white shadow-glow scale-110',
                  !isCompleted && !isCurrent && 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                )}
              >
                {isCompleted ? <Check className="w-3 h-3" /> : step.id}
              </button>
            );
          })}
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
                      'w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 cursor-pointer',
                      isCompleted && 'bg-primary-200 text-primary-700 group-hover:bg-primary-300 group-hover:scale-105',
                      isCurrent && 'bg-gradient-primary text-white shadow-glow scale-110',
                      isPending && 'bg-gray-200 text-gray-500 group-hover:bg-gray-300 group-hover:scale-105'
                    )}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <span
                    className={cn(
                      'mt-1.5 text-xs font-medium transition-colors',
                      isCurrent && 'text-primary-600',
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
                      'flex-1 h-0.5 mx-1.5 transition-colors duration-300',
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

export { STEPS };
