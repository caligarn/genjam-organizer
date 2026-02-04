import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Logo } from './Logo';
import { GenJamFooter } from './GenJamFooter';

interface AdminLayoutProps {
  children: ReactNode;
  className?: string;
}

export function AdminLayout({ children, className }: AdminLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex justify-center">
        <div className={cn('w-full max-w-6xl px-6 sm:px-8 lg:px-12 py-8 sm:py-10', className)}>
          {/* Header: Logo + Organizer badge */}
          <div className="flex flex-col items-center gap-3 mb-8 sm:mb-10">
            <Logo size="lg" />
            <span
              className="text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider"
              style={{
                backgroundColor: '#9966FF',
                color: 'white',
                border: '2px solid #1a1a1a',
              }}
            >
              Organizer Panel
            </span>
          </div>

          {/* Content */}
          <div className="animate-fade-in">{children}</div>
        </div>
      </main>

      <GenJamFooter />
    </div>
  );
}
