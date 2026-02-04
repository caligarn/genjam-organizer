import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PageNavigationProps {
  backTo?: string | null;
  backLabel?: string;
  nextTo?: string | null;
  nextLabel?: string;
  nextDisabled?: boolean;
  onNext?: () => void;
  className?: string;
}

export function PageNavigation({
  backTo,
  backLabel = 'Back',
  nextTo,
  nextLabel = 'Continue',
  nextDisabled = false,
  onNext,
  className,
}: PageNavigationProps) {
  const NextContent = (
    <>
      {nextLabel}
      <ChevronRight className="w-5 h-5" />
    </>
  );

  return (
    <div className={cn('flex items-center justify-between gap-20', className)}>
      {/* Back Button */}
      {backTo ? (
        <Link
          to={backTo}
          className="btn btn-ghost text-gray-600 hover:text-primary-600"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="hidden sm:inline">{backLabel}</span>
        </Link>
      ) : (
        <div /> // Spacer
      )}

      {/* Next Button */}
      {nextTo ? (
        onNext ? (
          <button
            onClick={onNext}
            disabled={nextDisabled}
            className={cn(
              'btn btn-primary',
              nextDisabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {NextContent}
          </button>
        ) : (
          <Link
            to={nextTo}
            className={cn(
              'btn btn-primary',
              nextDisabled && 'pointer-events-none opacity-50'
            )}
          >
            {NextContent}
          </Link>
        )
      ) : onNext ? (
        <button
          onClick={onNext}
          disabled={nextDisabled}
          className={cn(
            'btn btn-primary',
            nextDisabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          {NextContent}
        </button>
      ) : null}
    </div>
  );
}
