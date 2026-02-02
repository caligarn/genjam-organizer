import { cn } from '@/lib/utils';
import { Film } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export function Logo({ size = 'md', showText = true, className }: LogoProps) {
  const sizes = {
    sm: { icon: 'w-8 h-8', iconInner: 'w-4 h-4', text: 'text-lg' },
    md: { icon: 'w-10 h-10', iconInner: 'w-5 h-5', text: 'text-xl' },
    lg: { icon: 'w-12 h-12', iconInner: 'w-6 h-6', text: 'text-2xl' },
  };

  return (
    <Link
      to="/"
      className={cn('flex items-center gap-3 group', className)}
    >
      <div
        className={cn(
          'rounded-xl bg-gradient-primary flex items-center justify-center shadow-md group-hover:shadow-glow transition-shadow',
          sizes[size].icon
        )}
      >
        <Film className={cn('text-white', sizes[size].iconInner)} />
      </div>
      {showText && (
        <div className="flex flex-col leading-tight">
          <span
            className={cn(
              'font-display font-bold text-gray-900 group-hover:text-primary-600 transition-colors',
              sizes[size].text
            )}
          >
            Machine Cinema
          </span>
          <span className="text-xs text-gray-500 font-medium">
            GenJam 2025
          </span>
        </div>
      )}
    </Link>
  );
}
