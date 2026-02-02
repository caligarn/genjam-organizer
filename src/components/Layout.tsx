import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Logo } from './Logo';
import { StepProgressBar } from './StepProgressBar';
import { EventTimer } from './EventTimer';
import { PageNavigation } from './PageNavigation';
import { GenJamFooter } from './GenJamFooter';

interface LayoutProps {
  children: ReactNode;
  header?: ReactNode;
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
  header,
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
        <div className={cn('w-full max-w-4xl px-6 sm:px-8 lg:px-12 py-10 sm:py-14', className)}>
          {/* Header with Logo */}
          <div className="flex justify-center mb-10">
            <Logo size="lg" />
          </div>

          {header && (
            <div className="mb-10 sm:mb-12">{header}</div>
          )}

          {/* Timer and Progress */}
          <div className="flex flex-col gap-8 sm:gap-10 mb-8 sm:mb-10">
            {showTimer && <EventTimer currentStep={currentStep} />}
            <StepProgressBar currentStep={currentStep} />
          </div>

          {/* Navigation Button - positioned before content */}
          <PageNavigation
            backTo={backTo}
            backLabel={backLabel}
            nextTo={nextTo}
            nextLabel={nextLabel}
            nextDisabled={nextDisabled}
            onNext={onNext}
            className="mt-6 mb-12"
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
            className="mt-14"
          />
        </div>
      </main>

      {/* Footer */}
      <GenJamFooter />
    </div>
  );
}
