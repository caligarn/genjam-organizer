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
  totalSteps = 10,
  emoji,
  className,
}: GenJamHeaderProps) {
  return (
    <div className={cn('text-center space-y-6 py-8', className)}>
      {/* Emoji Icon */}
      {emoji && (
        <div className="text-6xl sm:text-7xl">{emoji}</div>
      )}

      {/* Step Badge */}
      <div className="inline-flex items-center">
        <span className="badge badge-primary text-sm font-semibold px-5 py-2">
          Step {currentStep} of {totalSteps}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
        {emoji && <span className="mr-3">{emoji}</span>}
        {title}
      </h1>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
