import React from 'react';
import { birthdayConfig } from '../data/birthdayConfig';
import { RotateCcw, Heart, Flower } from 'lucide-react';

interface Section9ClosingProps {
  onReplay: () => void;
}

export const Section9Closing: React.FC<Section9ClosingProps> = ({ onReplay }) => {
  const { section9 } = birthdayConfig;

  return (
    <footer
      id="closing"
      className="relative min-h-[85vh] py-24 px-4 sm:px-6 lg:px-8 bg-cream flex items-center justify-center overflow-hidden"
    >
      <div className="max-w-2xl w-full mx-auto relative z-10 text-center">
        <div className="flex items-center justify-center gap-3 mb-8 text-dustyRose">
          <span className="w-16 h-px bg-gold/50" />
          <Flower size={20} className="animate-spin-slow" />
          <span className="w-16 h-px bg-gold/50" />
        </div>

        <div className="bg-cream-paper border-2 border-gold/40 rounded-3xl p-8 sm:p-14 shadow-scrapbook">
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-deepBlack tracking-tight mb-4">
            {section9.line1}
          </h2>

          <p className="font-serif text-lg sm:text-xl text-warmBrown italic mb-6 marathi-text">
            {section9.line2}
          </p>

          <div className="flex items-center justify-center gap-2 my-6">
            <Heart size={16} className="text-dustyRose fill-dustyRose" />
            <Heart size={18} className="text-gold fill-gold" />
            <Heart size={16} className="text-dustyRose fill-dustyRose" />
          </div>

          <p className="font-serif text-xl sm:text-3xl font-bold text-deepBlack mb-8 marathi-text">
            {section9.line3}
          </p>

          <div className="pt-6 border-t border-blush/80 mb-10">
            <p className="font-handwritten text-3xl sm:text-4xl text-warmBrown font-bold">
              {section9.signature}
            </p>
            <p className="text-xs uppercase font-serif tracking-widest text-deepBlack/50 mt-2">
              HAPPY 20TH BIRTHDAY • GAYTRI PAWAR • 2026
            </p>
          </div>

          <button
            type="button"
            onClick={onReplay}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-blush/80 hover:bg-blush text-deepBlack font-serif text-sm transition-all hover:scale-105 border border-dustyRose/40 shadow-sm"
          >
            <RotateCcw size={16} />
            <span>{section9.replayButtonText}</span>
          </button>
        </div>

        <div className="mt-12 text-xs text-warmBrown/60 font-serif">
          Made with immense sibling love for Gaytri ♡
        </div>
      </div>
    </footer>
  );
};
