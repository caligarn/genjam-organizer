import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Logo } from './Logo';
import { StepProgressBar } from './StepProgressBar';
import { EventTimer } from './EventTimer';
import { PageNavigation } from './PageNavigation';
import { GenJamFooter } from './GenJamFooter';

interface LayoutProps {
  children: ReactNode;
  currentStep: number;
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
        <div className={cn('w-full max-w-4xl px-6 sm:px-8 lg:px-12 py-16 sm:py-20', className)}>
          {/* Header with Logo */}
          <div className="flex justify-center mb-16 sm:mb-20">
            <Logo size="lg" />
          </div>

          {/* Timer and Instructions */}
          {showTimer && (
            <EventTimer currentStep={currentStep} className="mb-16 sm:mb-20" />
          )}

          {/* Step Progress Bar */}
          <StepProgressBar currentStep={currentStep} className="mb-16 sm:mb-20" />

          {/* Navigation Button - positioned before content */}
          <PageNavigation
            backTo={backTo}
            backLabel={backLabel}
            nextTo={nextTo}
            nextLabel={nextLabel}
            nextDisabled={nextDisabled}
            onNext={onNext}
            className="mb-16 sm:mb-20"
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
            className="mt-16 sm:mt-20"
          />
        </div>
      </main>

      {/* Footer */}
      <GenJamFooter />
    </div>
  );
}
