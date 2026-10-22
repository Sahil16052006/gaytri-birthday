import React from 'react';
import { birthdayConfig } from '../data/birthdayConfig';
import { Sparkles, Heart } from 'lucide-react';
import { triggerGoldenSparkles } from '../utils/confetti';

interface Section1OpeningProps {
  onOpen: () => void;
  isOpened: boolean;
}

export const Section1Opening: React.FC<Section1OpeningProps> = ({ onOpen, isOpened }) => {
  const { section1, recipient } = birthdayConfig;

  const handleOpenClick = () => {
    triggerGoldenSparkles();
    onOpen();
    const heroEl = document.getElementById('birthday-hero');
    if (heroEl) {
      setTimeout(() => {
        heroEl.scrollIntoView({ behavior: 'smooth' });
      }, 350);
    }
  };

  return (
    <section
      id="intro"
      className="relative min-h-screen flex items-center justify-center bg-cream-paper px-4 py-16 overflow-hidden border-b border-blush/60"
    >
      <div className="absolute top-6 left-6 w-24 h-24 border-t-2 border-l-2 border-gold/40 rounded-tl-3xl pointer-events-none" />
      <div className="absolute top-6 right-6 w-24 h-24 border-t-2 border-r-2 border-gold/40 rounded-tr-3xl pointer-events-none" />
      <div className="absolute bottom-6 left-6 w-24 h-24 border-b-2 border-l-2 border-gold/40 rounded-bl-3xl pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-24 h-24 border-b-2 border-r-2 border-gold/40 rounded-br-3xl pointer-events-none" />

      <div className="absolute top-12 left-1/2 -translate-x-1/2 text-dustyRose/60 flex items-center gap-3 pointer-events-none">
        <span className="w-12 h-px bg-gold/40" />
        <span className="text-xl">🌸</span>
        <span className="w-12 h-px bg-gold/40" />
      </div>

      <div className="relative max-w-xl w-full mx-auto text-center z-10">
        <div className="washi-tape washi-tape-gold w-32 -top-3 left-1/2 -translate-x-1/2 -rotate-1 z-20" />

        <div className="bg-cream-light/95 border border-gold/40 rounded-3xl p-8 sm:p-12 shadow-scrapbook relative backdrop-blur-sm">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blush/60 border border-dustyRose/40 text-warmBrown text-xs uppercase tracking-widest font-serif mb-6">
            <Sparkles size={12} className="text-gold" />
            <span>{recipient.editionText}</span>
            <Sparkles size={12} className="text-gold" />
          </div>

          <p className="font-handwritten text-warmBrown text-lg sm:text-xl mb-3 tracking-wide">
            {section1.teaser}
          </p>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-deepBlack tracking-tight mb-2">
            {section1.recipientName}
          </h1>

          <p className="font-serif text-xl sm:text-2xl text-gold font-medium mb-6">
            {recipient.fullNameMarathi}
          </p>

          <div className="flex items-center justify-center gap-3 my-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
            <Heart size={14} className="text-dustyRose fill-dustyRose" />
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
          </div>

          <p className="marathi-text font-sans text-deepBlack/85 text-base sm:text-lg mb-8 max-w-md mx-auto">
            {section1.subtext}
          </p>

          <button
            type="button"
            onClick={handleOpenClick}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-deepBlack text-cream font-serif text-base sm:text-lg tracking-wide hover:bg-warmBrown transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 border border-gold/50"
          >
            <span>{section1.openButtonText}</span>
            <span className="text-gold group-hover:translate-x-1 transition-transform">
              ✨
            </span>
          </button>

          {isOpened && (
            <p className="mt-4 text-xs text-warmBrown/70 font-sans">
              खाली स्क्रोल करून संपूर्ण जग अनुभवा ↓
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
