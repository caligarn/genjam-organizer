import { cn } from '@/lib/utils';
import { Film, Instagram, Twitter, Youtube, MessageCircle } from 'lucide-react';

interface GenJamFooterProps {
  className?: string;
}

export function GenJamFooter({ className }: GenJamFooterProps) {
  return (
    <footer
      className={cn(
        'bg-primary-950 text-white py-10 px-6 sm:px-8 lg:px-10 mt-auto',
        className
      )}
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Film className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-xl font-bold">
                Machine Cinema
              </span>
            </div>
            <p className="text-primary-300 text-sm">
              AI Creativity for Everyone. Empowering filmmakers and creators with cutting-edge AI tools.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2 text-primary-300">
              <li>
                <a
                  href="https://machinecinema.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="https://lu.ma/machinecinema"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Upcoming Events
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  Community
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  Resources
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Connect With Us</h3>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/machinecinema"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-primary-900 flex items-center justify-center hover:bg-primary-800 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/machinecinema"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-primary-900 flex items-center justify-center hover:bg-primary-800 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://discord.gg/machinecinema"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-primary-900 flex items-center justify-center hover:bg-primary-800 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com/@machinecinema"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-primary-900 flex items-center justify-center hover:bg-primary-800 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-primary-800 text-center text-primary-400 text-sm">
          © {new Date().getFullYear()} Machine Cinema. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
