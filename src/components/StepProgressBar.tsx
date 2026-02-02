import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface StepProgressBarProps {
  currentStep: number;
  className?: string;
}

const STEPS = [
  { id: 1, label: 'Registration', shortLabel: 'Reg' },
  { id: 2, label: 'Skills', shortLabel: 'Skills' },
  { id: 3, label: 'Icebreaker', shortLabel: 'Ice' },
  { id: 4, label: 'Ideas', shortLabel: 'Ideas' },
  { id: 5, label: 'Workflow', shortLabel: 'Flow' },
  { id: 6, label: 'Cheat Sheet', shortLabel: 'Tools' },
  { id: 7, label: 'Examples', shortLabel: 'Ex' },
  { id: 8, label: 'Storyboard', shortLabel: 'Story' },
  { id: 9, label: 'Submit', shortLabel: 'Sub' },
  { id: 10, label: 'Voting', shortLabel: 'Vote' },
  { id: 11, label: 'Follow-up', shortLabel: 'Done' },
];

export function StepProgressBar({ currentStep, className }: StepProgressBarProps) {
  return (
    <div className={cn('w-full', className)}>
      {/* Mobile: Simple progress bar with current step info */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-primary-600">
            Step {currentStep} of 11
          </span>
          <span className="text-sm text-gray-500">
            {STEPS[currentStep - 1]?.label}
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / 11) * 100}%` }}
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
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300',
                      isCompleted && 'bg-primary-200 text-primary-700',
                      isCurrent && 'bg-gradient-primary text-white shadow-glow scale-110',
                      isPending && 'bg-gray-200 text-gray-500'
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
                      'mt-2 text-xs font-medium transition-colors',
                      isCurrent && 'text-primary-600',
                      isCompleted && 'text-primary-500',
                      isPending && 'text-gray-400'
                    )}
                  >
                    {step.shortLabel}
                  </span>
                </div>

                {/* Connector line */}
                {index < STEPS.length - 1 && (
                  <div
                    className={cn(
                      'flex-1 h-0.5 mx-2 transition-colors duration-300',
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
