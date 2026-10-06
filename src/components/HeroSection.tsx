import React, { useEffect, useRef, useState } from 'react';
import { Globe, ArrowRight, Instagram, Twitter, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroProps {
  onOpenManifesto?: () => void;
  onOpenAuth?: (mode: 'login' | 'signup') => void;
}

export const HeroSection: React.FC<HeroProps> = ({ onOpenManifesto, onOpenAuth }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fadeAnimRef = useRef<number | null>(null);
  const isFadingOutRef = useRef<boolean>(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Fade animation helper
  const fadeOpacity = (
    video: HTMLVideoElement,
    from: number,
    to: number,
    duration: number,
    onComplete?: () => void
  ) => {
    if (fadeAnimRef.current) {
      cancelAnimationFrame(fadeAnimRef.current);
      fadeAnimRef.current = null;
    }
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentOpacity = from + (to - from) * progress;
      video.style.opacity = currentOpacity.toFixed(4);

      if (progress < 1) {
        fadeAnimRef.current = requestAnimationFrame(step);
      } else {
        fadeAnimRef.current = null;
        if (onComplete) onComplete();
      }
    };

    fadeAnimRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Start opacity at 0
    video.style.opacity = '0';

    const handleCanPlay = () => {
      video.play().catch(() => {});
      const currentOp = parseFloat(video.style.opacity || '0');
      fadeOpacity(video, currentOp, 1, 500);
    };

    const handleTimeUpdate = () => {
      if (!video.duration || isNaN(video.duration)) return;
      const remaining = video.duration - video.currentTime;
      if (!isFadingOutRef.current && remaining <= 0.55 && remaining > 0) {
        isFadingOutRef.current = true;
        const currentOp = parseFloat(video.style.opacity || '1');
        fadeOpacity(video, currentOp, 0, 500);
      }
    };

    const handleEnded = () => {
      video.style.opacity = '0';
      isFadingOutRef.current = false;
      setTimeout(() => {
        if (!video) return;
        video.currentTime = 0;
        video.play().catch(() => {});
        fadeOpacity(video, 0, 1, 500);
      }, 100);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    // Initial play attempt if already loaded/cached
    if (video.readyState >= 3) {
      handleCanPlay();
    }

    return () => {
      if (fadeAnimRef.current) {
        cancelAnimationFrame(fadeAnimRef.current);
      }
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 3500);
  };

  return (
    <section className="min-h-screen overflow-hidden relative flex flex-col justify-between bg-black">
      {/* Background Video */}
      <video
        ref={videoRef}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4"
        muted
        autoPlay
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none select-none"
        style={{ opacity: 0 }}
      />

      {/* Subtle overlay for optimal text contrast */}
      <div className="absolute inset-0 bg-black/25 pointer-events-none z-[1]" />

      {/* NAVBAR (relative z-20, px-6 py-6) */}
      <header className="relative z-20 px-6 py-6">
        <nav className="liquid-glass rounded-full max-w-5xl mx-auto px-6 py-3 flex items-center justify-between transition-all">
          {/* Left: Globe icon (24px, white) + "Asme" text (white, font-semibold, text-lg) + Nav links */}
          <div className="flex items-center">
            <a href="#" className="flex items-center gap-2 group cursor-pointer" aria-label="Asme home">
              <Globe className="w-6 h-6 text-white transition-transform duration-300 group-hover:rotate-12" />
              <span className="text-white font-semibold text-lg tracking-tight">Asme</span>
            </a>

            <div className="hidden md:flex items-center gap-8 ml-8">
              <a
                href="#about"
                className="text-white/80 hover:text-white text-sm font-medium transition-colors"
              >
                About
              </a>
              <a
                href="#philosophy"
                className="text-white/80 hover:text-white text-sm font-medium transition-colors"
              >
                Philosophy
              </a>
              <a
                href="#services"
                className="text-white/80 hover:text-white text-sm font-medium transition-colors"
              >
                Features
              </a>
              <a
                href="#services"
                className="text-white/80 hover:text-white text-sm font-medium transition-colors"
              >
                Pricing
              </a>
            </div>
          </div>

          {/* Right: "Sign Up" text button + "Login" button */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => onOpenAuth?.('signup')}
              className="text-white text-sm font-medium hover:text-white/80 transition-colors px-2 py-1 cursor-pointer"
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={() => onOpenAuth?.('login')}
              className="liquid-glass rounded-full px-6 py-2 text-white text-sm font-medium hover:bg-white/10 transition-all cursor-pointer"
            >
              Login
            </button>
          </div>
        </nav>
      </header>

      {/* HERO CONTENT (relative z-10, flex-1 flex flex-col items-center justify-center, px-6 py-12 text-center, -translate-y-[20%]) */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[10%] md:-translate-y-[16%] lg:-translate-y-[20%]">
        {/* Heading: text-7xl md:text-8xl lg:text-9xl, white, tracking-tight whitespace-nowrap, font-family 'Instrument Serif', serif */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-tight whitespace-nowrap font-instrument select-none drop-shadow-sm">
          Know it then <em className="italic font-normal">all</em>.
        </h1>

        {/* Email input: max-w-xl w-full. A liquid-glass rounded-full pill with pl-6 pr-2 py-2 flex items-center gap-3 */}
        <form
          onSubmit={handleSubscribe}
          className="max-w-xl w-full liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center gap-3 mt-8 shadow-2xl transition-all focus-within:ring-1 focus-within:ring-white/30"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full bg-transparent text-white placeholder:text-white/40 text-sm sm:text-base outline-none font-sans"
          />
          <button
            type="submit"
            aria-label="Submit email"
            className="bg-white rounded-full p-3 text-black hover:bg-white/90 active:scale-95 transition-all flex items-center justify-center shrink-0 cursor-pointer shadow-md"
          >
            {subscribed ? (
              <Check className="w-5 h-5 text-black" />
            ) : (
              <ArrowRight className="w-5 h-5 text-black" />
            )}
          </button>
        </form>

        <AnimatePresence>
          {subscribed && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-xs text-white/90 font-medium mt-2 bg-white/10 px-4 py-1 rounded-full backdrop-blur-md"
            >
              Thank you for subscribing to our updates.
            </motion.p>
          )}
        </AnimatePresence>

        {/* Subtitle: text-white text-sm leading-relaxed px-4 */}
        <p className="text-white/90 text-sm leading-relaxed px-4 max-w-lg mt-6">
          Stay updated with the latest news and insights. Subscribe to our newsletter today and never miss out on exciting updates.
        </p>

        {/* Manifesto button: liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors */}
        <button
          type="button"
          onClick={onOpenManifesto}
          className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors mt-6 cursor-pointer"
        >
          Manifesto
        </button>
      </div>

      {/* SOCIAL ICONS FOOTER (relative z-10, flex justify-center gap-4 pb-12) */}
      <footer className="relative z-10 flex justify-center gap-4 pb-12">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
        >
          <Instagram className="w-5 h-5" />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter / X"
          className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
        >
          <Twitter className="w-5 h-5" />
        </a>
        <a
          href="#about"
          aria-label="Explore Global Network"
          className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
        >
          <Globe className="w-5 h-5" />
        </a>
      </footer>
    </section>
  );
};
