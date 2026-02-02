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
    <div className={cn('text-center space-y-4', className)}>
      {/* Step Badge */}
      <div className="inline-flex items-center gap-2">
        {emoji && <span className="text-2xl">{emoji}</span>}
        <span className="badge badge-primary text-sm font-medium px-4 py-1.5">
          Step {currentStep} of {totalSteps}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
        {emoji && <span className="mr-2">{emoji}</span>}
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
