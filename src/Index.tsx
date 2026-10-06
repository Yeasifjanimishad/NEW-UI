import React, { useEffect, useRef, useState } from 'react';
import { HeroSection } from './components/HeroSection.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { FeaturedVideoSection } from './components/FeaturedVideoSection.tsx';
import { SectionDivider } from './components/SectionDivider.tsx';
import { PhilosophySection } from './components/PhilosophySection.tsx';
import { ServicesSection } from './components/ServicesSection.tsx';
import { Footer } from './components/Footer.tsx';
import { ManifestoModal } from './components/ManifestoModal.tsx';
import { AuthModal } from './components/AuthModal.tsx';
import { NewsletterModal } from './components/NewsletterModal.tsx';

export default function Index() {
  const [isManifestoOpen, setIsManifestoOpen] = useState(false);
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const hasTriggeredNewsletter = useRef(false);

  const [authModal, setAuthModal] = useState<{
    isOpen: boolean;
    mode: 'login' | 'signup';
  }>({
    isOpen: false,
    mode: 'login',
  });

  // Newsletter auto-trigger: 10s inactivity OR scroll to bottom
  useEffect(() => {
    let inactivityTimer: ReturnType<typeof setTimeout> | null = null;

    const triggerNewsletter = () => {
      if (!hasTriggeredNewsletter.current && !isManifestoOpen && !authModal.isOpen) {
        hasTriggeredNewsletter.current = true;
        setIsNewsletterOpen(true);
      }
    };

    const resetInactivity = () => {
      if (hasTriggeredNewsletter.current) return;
      if (inactivityTimer) clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        triggerNewsletter();
      }, 10000);
    };

    const handleScroll = () => {
      resetInactivity();
      if (hasTriggeredNewsletter.current) return;

      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      // User reached near the bottom of the page (within 100px)
      if (windowHeight + scrollTop >= documentHeight - 100) {
        triggerNewsletter();
      }
    };

    const activityEvents = ['mousemove', 'mousedown', 'keydown', 'touchstart'];
    activityEvents.forEach((evt) => {
      window.addEventListener(evt, resetInactivity, { passive: true });
    });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial inactivity countdown
    resetInactivity();

    return () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      activityEvents.forEach((evt) => {
        window.removeEventListener(evt, resetInactivity);
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isManifestoOpen, authModal.isOpen]);

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthModal({ isOpen: true, mode });
  };

  const handleCloseAuth = () => {
    setAuthModal((prev) => ({ ...prev, isOpen: false }));
  };

  const handleSwitchAuthMode = (mode: 'login' | 'signup') => {
    setAuthModal({ isOpen: true, mode });
  };

  const handleExploreMore = () => {
    const philosophyElem = document.getElementById('philosophy');
    if (philosophyElem) {
      philosophyElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-black text-white min-h-screen selection:bg-white/20 selection:text-white">
      {/* SECTION 1 -- HERO */}
      <HeroSection
        onOpenManifesto={() => setIsManifestoOpen(true)}
        onOpenAuth={handleOpenAuth}
      />

      {/* SECTION 2 -- ABOUT */}
      <AboutSection />

      {/* SECTION 3 -- FEATURED VIDEO */}
      <FeaturedVideoSection onExploreMore={handleExploreMore} />

      {/* DIVIDER BETWEEN FEATURED VIDEO & PHILOSOPHY */}
      <SectionDivider />

      {/* SECTION 4 -- PHILOSOPHY / INNOVATION x VISION */}
      <PhilosophySection />

      {/* SECTION 5 -- SERVICES / WHAT WE DO */}
      <ServicesSection />

      {/* FOOTER */}
      <Footer />

      {/* Modals */}
      <ManifestoModal
        isOpen={isManifestoOpen}
        onClose={() => setIsManifestoOpen(false)}
      />

      <AuthModal
        isOpen={authModal.isOpen}
        mode={authModal.mode}
        onClose={handleCloseAuth}
        onSwitchMode={handleSwitchAuthMode}
      />

      <NewsletterModal
        isOpen={isNewsletterOpen}
        onClose={() => setIsNewsletterOpen(false)}
      />
    </div>
  );
}
