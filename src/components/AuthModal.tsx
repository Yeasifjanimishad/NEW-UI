import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Check } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  mode: 'login' | 'signup';
  onClose: () => void;
  onSwitchMode: (mode: 'login' | 'signup') => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  mode,
  onClose,
  onSwitchMode,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
      setPassword('');
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5, bounce: 0.1 }}
            className="liquid-glass rounded-3xl max-w-md w-full p-8 relative z-10 border border-white/10 shadow-2xl bg-black/90"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 liquid-glass rounded-full p-2 text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-instrument text-3xl sm:text-4xl text-white tracking-tight mb-2">
              {mode === 'login' ? 'Welcome Back' : 'Join Asme'}
            </h3>
            <p className="text-white/60 text-xs sm:text-sm mb-6">
              {mode === 'login'
                ? 'Access your saved explorations and projects.'
                : 'Enter your credentials to begin creating.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white/40 text-xs uppercase tracking-wider mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  required
                  className="w-full liquid-glass rounded-xl px-4 py-3 text-white text-sm outline-none placeholder:text-white/30 border border-white/10 focus:border-white/30"
                />
              </div>

              <div>
                <label className="block text-white/40 text-xs uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full liquid-glass rounded-xl px-4 py-3 text-white text-sm outline-none placeholder:text-white/30 border border-white/10 focus:border-white/30"
                />
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="w-full bg-white text-black font-medium text-sm py-3.5 rounded-full hover:bg-white/90 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer mt-6 shadow-lg"
              >
                {submitted ? (
                  <>
                    <Check className="w-4 h-4 text-black" />
                    <span>Success</span>
                  </>
                ) : (
                  <>
                    <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
                    <ArrowRight className="w-4 h-4 text-black" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-white/10 text-center">
              {mode === 'login' ? (
                <p className="text-white/50 text-xs">
                  Don&apos;t have an account?{' '}
                  <button
                    type="button"
                    onClick={() => onSwitchMode('signup')}
                    className="text-white font-medium hover:underline cursor-pointer ml-1"
                  >
                    Sign up
                  </button>
                </p>
              ) : (
                <p className="text-white/50 text-xs">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => onSwitchMode('login')}
                    className="text-white font-medium hover:underline cursor-pointer ml-1"
                  >
                    Login
                  </button>
                </p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
