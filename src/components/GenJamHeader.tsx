import { cn } from '@/lib/utils';

interface GenJamHeaderProps {
  title: string;
  subtitle?: string;
  currentStep: number;
  totalSteps?: number;
  emoji?: string;
  className?: string;
}

export function GenJamHeader({
  title,
  subtitle,
  currentStep,
  totalSteps = 11,
  emoji,
  className,
}: GenJamHeaderProps) {
  return (
    <div className={cn('text-center space-y-2 sm:space-y-3', className)}>
      {/* Step Badge */}
      <div className="inline-flex items-center gap-2">
        <span className="badge badge-primary text-xs sm:text-sm">
          Step {currentStep} of {totalSteps}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
        {emoji && <span className="mr-2">{emoji}</span>}
        {title}
      </h1>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}
