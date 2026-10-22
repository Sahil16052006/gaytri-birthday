import React from 'react';
import { birthdayConfig } from '../data/birthdayConfig';
import { Scissors, Feather, Palette, Camera, Sparkles } from 'lucide-react';

export const Section4CreativeSoul: React.FC = () => {
  const { section4 } = birthdayConfig;

  const renderThemeVisual = (themeId: string) => {
    switch (themeId) {
      case 'craft':
        return (
          <div className="relative h-44 bg-blush/20 rounded-xl p-4 flex flex-col items-center justify-center border border-blush/60 overflow-hidden">
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-blush/40 rounded-full" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gold/15 rounded-full" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-cream shadow-sm flex items-center justify-center text-warmBrown mb-2 border border-blush/80">
                <Scissors size={26} />
              </div>
              <span className="text-xs uppercase tracking-widest font-serif text-warmBrown font-bold">
                HANDMADE & CRAFT
              </span>
              <div className="flex gap-1.5 mt-2">
                <span className="w-4 h-1 rounded bg-dustyRose" />
                <span className="w-6 h-1 rounded bg-gold" />
                <span className="w-3 h-1 rounded bg-warmBrown" />
              </div>
            </div>
          </div>
        );
      case 'sketching':
        return (
          <div className="relative h-44 bg-sketchbook rounded-xl p-4 flex flex-col items-center justify-center border border-gold/30 overflow-hidden">
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-cream shadow-sm flex items-center justify-center text-deepBlack mb-2 border border-gold/40">
                <Feather size={26} />
              </div>
              <span className="text-xs uppercase tracking-widest font-serif text-deepBlack font-bold">
                PENCIL & STROKES
              </span>
              <svg className="w-24 h-6 text-warmBrown/60 mt-1" viewBox="0 0 100 20" fill="none">
                <path d="M5 15 Q 25 5, 50 12 T 95 8" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
              </svg>
            </div>
          </div>
        );
      case 'drawing':
        return (
          <div className="relative h-44 bg-cream-light rounded-xl p-4 flex flex-col items-center justify-center border border-dustyRose/40 overflow-hidden">
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-blush/40 shadow-sm flex items-center justify-center text-dustyRose-dark mb-2 border border-dustyRose/40">
                <Palette size={26} />
              </div>
              <span className="text-xs uppercase tracking-widest font-serif text-deepBlack font-bold">
                CREATIVE PALETTE
              </span>
              <div className="flex items-center gap-2 mt-2">
                <span className="w-3.5 h-3.5 rounded-full bg-dustyRose border border-cream" />
                <span className="w-3.5 h-3.5 rounded-full bg-gold border border-cream" />
                <span className="w-3.5 h-3.5 rounded-full bg-blush border border-cream" />
                <span className="w-3.5 h-3.5 rounded-full bg-warmBrown border border-cream" />
              </div>
            </div>
          </div>
        );
      case 'photography':
        return (
          <div className="relative h-44 bg-deepBlack/5 rounded-xl p-4 flex flex-col items-center justify-center border border-gold/40 overflow-hidden">
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-cream shadow-sm flex items-center justify-center text-gold-dark mb-2 border border-gold/50">
                <Camera size={26} />
              </div>
              <span className="text-xs uppercase tracking-widest font-serif text-deepBlack font-bold">
                CAPTURING MOMENTS
              </span>
              <div className="w-16 h-4 border-t border-b border-gold/50 flex items-center justify-center mt-1">
                <span className="text-[10px] text-warmBrown font-serif tracking-widest">FOCUS • 50MM</span>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section
      id="creative-soul"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-cream flex items-center justify-center overflow-hidden border-b border-blush/60"
    >
      <div className="max-w-6xl w-full mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blush/60 text-warmBrown text-xs font-serif uppercase tracking-widest mb-3 border border-dustyRose/30">
            <Sparkles size={12} className="text-gold" />
            <span>HER ARTISTIC ESSENCE</span>
            <Sparkles size={12} className="text-gold" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-deepBlack tracking-tight mb-3">
            {section4.heading}
          </h2>

          <p className="font-serif text-base sm:text-lg text-warmBrown italic marathi-text">
            {section4.supportingLine}
          </p>

          <div className="flex items-center justify-center gap-3 mt-4">
            <span className="w-12 h-px bg-gold/50" />
            <span className="text-sm">🎨</span>
            <span className="w-12 h-px bg-gold/50" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {section4.creativeThemes.map((theme, index) => {
            const rotations = ['-rotate-1', 'rotate-1', '-rotate-1', 'rotate-1'];
            const rot = rotations[index % rotations.length];

            return (
              <div
                key={theme.id}
                className={`polaroid-card ${rot} rounded-2xl flex flex-col justify-between hover:rotate-0 transition-transform duration-300 border border-blush/50`}
              >
                {renderThemeVisual(theme.id)}

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-serif text-lg font-bold text-deepBlack">
                        {theme.titleMarathi}
                      </h3>
                      <span className="text-[11px] font-serif uppercase text-warmBrown tracking-wider">
                        {theme.title}
                      </span>
                    </div>

                    <p className="font-handwritten text-warmBrown text-base mb-3 font-semibold marathi-text">
                      “{theme.caption}”
                    </p>
                  </div>

                  <p className="text-xs text-deepBlack/70 font-sans marathi-text pt-2 border-t border-blush/40">
                    {theme.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="max-w-xl mx-auto text-center bg-cream-paper p-6 sm:p-8 rounded-2xl border border-gold/40 shadow-scrapbook">
          <p className="font-serif text-lg sm:text-xl font-semibold text-deepBlack marathi-text">
            {section4.closingNote}
          </p>
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-warmBrown font-handwritten">
            <span>साहिलकडून बहिणीच्या कलेसाठी एक सदिच्छा ♡</span>
          </div>
        </div>
      </div>
    </section>
  );
};
