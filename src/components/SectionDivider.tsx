import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export const SectionDivider: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div
      ref={ref}
      className="max-w-6xl mx-auto px-6 py-4 overflow-hidden relative"
      aria-hidden="true"
    >
      {/* Base line that smoothly scales in horizontally from center */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent relative origin-center"
      >
        {/* Soft traveling light shimmer for subtle continuous motion */}
        <motion.div
          animate={{
            x: ['-100%', '400%'],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatDelay: 1.5,
          }}
          className="absolute inset-y-0 w-48 bg-gradient-to-r from-transparent via-white/35 to-transparent blur-[1px] pointer-events-none"
        />

        {/* Center ambient glow anchor */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-3 bg-white/5 blur-md pointer-events-none rounded-full" />
      </motion.div>
    </div>
  );
};
