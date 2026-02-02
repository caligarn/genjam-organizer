import { cn } from '@/lib/utils';

interface GenJamFooterProps {
  className?: string;
}

export function GenJamFooter({ className }: GenJamFooterProps) {
  return (
    <footer
      className={cn(
        'py-8 px-6 mt-auto border-t border-gray-100 bg-white/50',
        className
      )}
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-4">
        {/* Logo */}
        <a
          href="https://machinecinema.com"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-opacity hover:opacity-80"
        >
          <img
            src="/Logo-Main(Square)-transparent.png"
            alt="Machine Cinema"
            className="h-16 w-auto object-contain"
          />
        </a>

        {/* Powered by text */}
        <p className="text-sm text-gray-500 font-medium">
          Powered by{' '}
          <a
            href="https://machinecinema.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-700 transition-colors"
          >
            Machine Cinema
          </a>
        </p>
      </div>
    </footer>
  );
}
