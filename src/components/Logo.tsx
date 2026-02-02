import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dark' | 'light';
  className?: string;
}

export function Logo({ size = 'md', variant = 'dark', className }: LogoProps) {
  const sizes = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
  };

  const logoSrc = variant === 'dark' 
    ? '/blacklogo-transparentbackground.png'
    : '/Logo-Main(Square)-transparent.png';

  return (
    <Link
      to="/"
      className={cn(
        'flex items-center transition-opacity hover:opacity-80',
        className
      )}
    >
      <img
        src={logoSrc}
        alt="Machine Cinema"
        className={cn('w-auto object-contain', sizes[size])}
      />
    </Link>
  );
}
