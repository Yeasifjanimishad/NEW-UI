import React, { useState } from 'react';
import { HeroSection } from './components/HeroSection.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { FeaturedVideoSection } from './components/FeaturedVideoSection.tsx';
import { PhilosophySection } from './components/PhilosophySection.tsx';
import { ServicesSection } from './components/ServicesSection.tsx';
import { Footer } from './components/Footer.tsx';
import { ManifestoModal } from './components/ManifestoModal.tsx';
import { AuthModal } from './components/AuthModal.tsx';

export default function Index() {
  const [isManifestoOpen, setIsManifestoOpen] = useState(false);
  const [authModal, setAuthModal] = useState<{
    isOpen: boolean;
    mode: 'login' | 'signup';
  }>({
    isOpen: false,
    mode: 'login',
  });

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
    </div>
  );
}
