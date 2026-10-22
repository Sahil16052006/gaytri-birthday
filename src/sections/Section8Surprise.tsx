import React, { useState } from 'react';
import { birthdayConfig } from '../data/birthdayConfig';
import { Gift, Sparkles, Heart } from 'lucide-react';
import { triggerRosePetalsShower, triggerGoldenSparkles } from '../utils/confetti';

export const Section8Surprise: React.FC = () => {
  const { section8 } = birthdayConfig;
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  const handleReveal = () => {
    triggerRosePetalsShower();
    triggerGoldenSparkles();
    setIsRevealed(true);
  };

  const handleClose = () => {
    setIsRevealed(false);
  };

  return (
    <section
      id="surprise"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-cream-paper flex items-center justify-center overflow-hidden border-b border-blush/60"
    >
      <div className="max-w-2xl w-full mx-auto relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blush/60 text-warmBrown text-xs font-serif uppercase tracking-widest mb-4 border border-dustyRose/30">
          <Gift size={12} className="text-gold" />
          <span>A SECRET SURPRISE</span>
          <Sparkles size={12} className="text-gold" />
        </div>

        {!isRevealed ? (
          <div className="bg-cream-light border-2 border-gold/40 rounded-3xl p-8 sm:p-14 shadow-scrapbook hover:shadow-2xl transition-all">
            <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-blush/60 border border-dustyRose/40 flex items-center justify-center text-warmBrown shadow-inner group-hover:scale-105 transition-transform">
              <Gift size={46} className="text-deepBlack" />
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-deepBlack tracking-tight mb-4">
              {section8.teaser}
            </h2>

            <p className="font-serif text-base sm:text-lg text-warmBrown italic mb-8 marathi-text">
              हे सरप्राइज फक्त एका क्लिकच्या अंतरावर आहे…
            </p>

            <button
              type="button"
              onClick={handleReveal}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-deepBlack text-cream font-serif text-base sm:text-lg shadow-lg hover:bg-warmBrown transition-all duration-300 hover:scale-105 border border-gold/40 active:scale-95"
            >
              <Heart size={18} className="text-dustyRose fill-dustyRose" />
              <span>{section8.buttonText}</span>
              <Sparkles size={16} className="text-gold" />
            </button>
          </div>
        ) : (
          <div className="bg-cream-light border-2 border-gold/50 rounded-3xl p-8 sm:p-14 shadow-scrapbook text-left animate-unfold relative">
            <div className="washi-tape washi-tape-gold w-32 -top-3 left-1/2 -translate-x-1/2 -rotate-1 z-20" />

            <div className="text-center mb-6 border-b border-blush/80 pb-4">
              <span className="text-xs uppercase tracking-widest font-serif text-gold-dark font-bold">
                {section8.boxTitle}
              </span>
              <h3 className="font-handwritten text-3xl sm:text-4xl text-warmBrown font-bold mt-2">
                {section8.message.salutation}
              </h3>
            </div>

            <div className="space-y-4 text-deepBlack/95 text-base sm:text-lg marathi-text leading-loose">
              {section8.message.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-blush/80 text-center">
              <p className="font-serif text-xl sm:text-2xl font-bold text-deepBlack mb-2">
                {section8.message.wish}
              </p>
              <p className="font-handwritten text-2xl text-gold-dark font-bold">
                {section8.message.signoff}
              </p>
            </div>

            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={handleClose}
                className="text-xs font-serif text-warmBrown hover:text-deepBlack underline underline-offset-4 transition-colors"
              >
                सरप्राइज पुन्हा लपवा
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
