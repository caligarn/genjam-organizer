import { cn } from '@/lib/utils';

interface GenJamFooterProps {
  className?: string;
}

export function GenJamFooter({ className }: GenJamFooterProps) {
  return (
    <footer
      className={cn(
        'py-[13rem] px-6 mt-auto',
        className
      )}
      style={{ 
        backgroundColor: '#1a1a1a',
        borderTop: '4px solid #FFD700'
      }}
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-[6rem]">
        {/* Logo */}
        <a
          href="https://machinecinema.com"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform hover:scale-105"
        >
          <img
            src="/Logo-Main(Square)-transparent.png"
            alt="Machine Cinema"
            className="h-16 w-auto object-contain"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </a>

        {/* Powered by text */}
        <p className="text-sm font-bold uppercase tracking-wider" style={{ color: '#FFD700' }}>
          Powered by{' '}
          <a
            href="https://machinecinema.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
            style={{ color: '#FFD700' }}
          >
            Machine Cinema
          </a>
        </p>
      </div>
    </footer>
  );
}
