import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';

interface ManifestoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ManifestoModal: React.FC<ManifestoModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5, bounce: 0.1 }}
            className="liquid-glass rounded-3xl max-w-2xl w-full p-8 md:p-12 relative z-10 border border-white/10 shadow-2xl bg-black/90"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 liquid-glass rounded-full p-2.5 text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-white/60" />
              <span className="text-white/40 text-xs tracking-widest uppercase font-mono">
                The Asme Manifesto
              </span>
            </div>

            <h3 className="font-instrument text-4xl sm:text-5xl text-white tracking-tight leading-none mb-6">
              Know it then <em className="italic text-white/70">all</em>.
            </h3>

            <div className="space-y-4 text-white/80 text-sm sm:text-base leading-relaxed">
              <p>
                We stand at the inflection point between imagination and craft. Knowledge without intuition is inert; ambition without precision is noise.
              </p>
              <p>
                Our mission is to construct spaces, digital artifacts, and enduring systems that elevate everyday human potential. We refuse compromise on elegance, speed, or depth.
              </p>
              <p className="font-instrument italic text-white/90 text-lg sm:text-xl pt-2">
                &ldquo;Every project starts with a question, and every answer opens a new door to innovation.&rdquo;
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-white/40 text-xs tracking-wider uppercase font-mono">
                Edition 2026 / Global
              </span>
              <button
                type="button"
                onClick={onClose}
                className="liquid-glass rounded-full px-6 py-2 text-white text-xs tracking-wide uppercase hover:bg-white/10 transition-colors cursor-pointer"
              >
                Acknowledge
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
