import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { GenJamHeader } from './GenJamHeader';
import { StepProgressBar } from './StepProgressBar';
import { EventTimer } from './EventTimer';
import { PageNavigation } from './PageNavigation';
import { GenJamFooter } from './GenJamFooter';

interface LayoutProps {
  children: ReactNode;
  currentStep: number;
  title?: string;
  subtitle?: string;
  emoji?: string;
  backTo?: string | null;
  backLabel?: string;
  nextTo?: string | null;
  nextLabel?: string;
  nextDisabled?: boolean;
  onNext?: () => void;
  showTimer?: boolean;
  className?: string;
}

export function Layout({
  children,
  currentStep,
  title,
  subtitle,
  emoji,
  backTo,
  backLabel,
  nextTo,
  nextLabel,
  nextDisabled,
  onNext,
  showTimer = true,
  className,
}: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex justify-center">
        <div className={cn('w-full max-w-4xl px-6 sm:px-8 lg:px-12 py-10 sm:py-12', className)}>
          {/* Page Header */}
          {title && (
            <GenJamHeader
              title={title}
              subtitle={subtitle}
              currentStep={currentStep}
              emoji={emoji}
              className="mb-10"
            />
          )}

          {/* Timer and Instructions */}
          {showTimer && (
            <EventTimer currentStep={currentStep} className="mb-8" />
          )}

          {/* Step Progress Bar */}
          <StepProgressBar currentStep={currentStep} className="mb-6" />

          {/* Navigation Button - positioned before content */}
          <PageNavigation
            backTo={backTo}
            backLabel={backLabel}
            nextTo={nextTo}
            nextLabel={nextLabel}
            nextDisabled={nextDisabled}
            onNext={onNext}
            className="mb-12"
          />

          {/* Page Content */}
          <div className="animate-fade-in">{children}</div>

          {/* Bottom Navigation */}
          <PageNavigation
            backTo={backTo}
            backLabel={backLabel}
            nextTo={nextTo}
            nextLabel={nextLabel}
            nextDisabled={nextDisabled}
            onNext={onNext}
            className="mt-12"
          />
        </div>
      </main>

      {/* Footer */}
      <GenJamFooter />
    </div>
  );
}
