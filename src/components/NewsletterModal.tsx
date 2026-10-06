import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Check, Mail } from 'lucide-react';

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewsletterModal: React.FC<NewsletterModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitted'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;

    setStatus('submitted');
    setTimeout(() => {
      onClose();
      setTimeout(() => {
        setStatus('idle');
        setEmail('');
      }, 500);
    }, 2200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', duration: 0.55, bounce: 0.08 }}
            className="liquid-glass rounded-3xl max-w-lg w-full p-8 md:p-10 relative z-10 border border-white/10 shadow-2xl bg-black/90 overflow-hidden"
          >
            {/* Ambient background glow behind modal */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 liquid-glass rounded-full p-2.5 text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Tag / Icon */}
            <div className="flex items-center gap-2 mb-4">
              <div className="liquid-glass rounded-full p-2 text-white/80">
                <Mail className="w-4 h-4" />
              </div>
              <span className="text-white/40 text-xs tracking-widest uppercase font-mono">
                The Asme Journal
              </span>
            </div>

            {/* Heading */}
            <h3 className="font-instrument text-4xl sm:text-5xl text-white tracking-tight leading-[1.05] mb-4">
              Stay ahead of what&apos;s <em className="italic text-white/70">next</em>.
            </h3>

            {/* Subtitle */}
            <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-8">
              Receive curated insights on emerging design, creative strategy, and our latest experimental prototypes. No spam, ever.
            </p>

            {/* Form */}
            {status === 'submitted' ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="liquid-glass rounded-2xl p-6 text-center border border-white/20"
              >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Check className="w-6 h-6 text-black" />
                </div>
                <h4 className="text-white font-medium text-base mb-1">
                  You&apos;re on the list.
                </h4>
                <p className="text-white/60 text-xs">
                  We&apos;ve reserved your edition. Look out for our upcoming dispatch.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center gap-3 border border-white/10 focus-within:border-white/30 transition-all">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full bg-transparent text-white placeholder:text-white/40 text-sm outline-none font-sans"
                  />
                  <button
                    type="submit"
                    className="bg-white rounded-full p-3 text-black hover:bg-white/90 active:scale-95 transition-all flex items-center justify-center shrink-0 cursor-pointer shadow-md"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-5 h-5 text-black" />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2 px-2 text-xs">
                  <span className="text-white/30">
                    Dispatched twice monthly
                  </span>
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-white/40 hover:text-white transition-colors cursor-pointer"
                  >
                    Maybe later
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
