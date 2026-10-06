import React from 'react';
import { Globe, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-white/5 py-16 px-6 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-3">
          <Globe className="w-5 h-5 text-white/80" />
          <span className="text-white font-semibold tracking-tight text-lg">Asme</span>
          <span className="text-white/30 text-xs ml-2 tracking-wide font-mono">
            © {new Date().getFullYear()} All rights reserved.
          </span>
        </div>

        <div className="flex items-center gap-8 text-sm text-white/60">
          <a href="#about" className="hover:text-white transition-colors">
            About
          </a>
          <a href="#philosophy" className="hover:text-white transition-colors">
            Philosophy
          </a>
          <a href="#services" className="hover:text-white transition-colors">
            Services
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Twitter
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Instagram
          </a>
        </div>

        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="liquid-glass rounded-full p-3 text-white/60 hover:text-white hover:bg-white/10 transition-all cursor-pointer flex items-center justify-center"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
};
