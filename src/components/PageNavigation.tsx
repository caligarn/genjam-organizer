import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';

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
      <ArrowRight className="w-4 h-4" />
    </>
  );

  return (
    <div className={cn('flex items-center justify-between gap-4', className)}>
      {/* Back Button */}
      {backTo ? (
        <Link
          to={backTo}
          className="btn btn-ghost text-gray-600 hover:text-primary-600"
        >
          <ArrowLeft className="w-4 h-4" />
          {backLabel}
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
