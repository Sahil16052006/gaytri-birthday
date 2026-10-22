import React from 'react';
import { birthdayConfig } from '../data/birthdayConfig';
import { Heart, Feather } from 'lucide-react';

export const Section3SisterBond: React.FC = () => {
  const { section3 } = birthdayConfig;

  return (
    <section
      id="sister-bond"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-cream-paper flex items-center justify-center overflow-hidden border-b border-blush/60"
    >
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-blush/35 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl w-full mx-auto relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blush/50 text-warmBrown text-xs font-serif uppercase tracking-widest mb-3 border border-dustyRose/30">
            <Heart size={12} className="text-dustyRose fill-dustyRose" />
            <span>THE HEART OF OUR BOND</span>
            <Heart size={12} className="text-dustyRose fill-dustyRose" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-deepBlack tracking-tight mb-3">
            {section3.heading}
          </h2>

          <p className="font-serif text-base sm:text-lg text-warmBrown italic">
            {section3.subheading}
          </p>

          <div className="flex items-center justify-center gap-3 mt-4">
            <span className="w-12 h-px bg-gold/50" />
            <Feather size={16} className="text-gold" />
            <span className="w-12 h-px bg-gold/50" />
          </div>
        </div>

        <div className="relative bg-cream-light/95 rounded-3xl p-8 sm:p-14 shadow-scrapbook border border-gold/30">
          <div className="washi-tape washi-tape-gold w-28 -top-3 left-12 -rotate-2 z-20" />
          <div className="washi-tape washi-tape-blush w-24 -top-3 right-12 rotate-2 z-20" />

          <div className="mb-6 border-b border-blush/70 pb-3">
            <span className="font-handwritten text-3xl sm:text-4xl text-warmBrown font-bold">
              {section3.paragraphs[0]}
            </span>
          </div>

          <div className="space-y-6 text-deepBlack/90 text-base sm:text-lg marathi-text leading-loose">
            {section3.paragraphs.slice(1).map((paragraph, index) => {
              const isHighlight =
                paragraph.includes('धन्यवाद, गायत्री') ||
                paragraph.includes('तू आहेस, हीच एक सुंदर जाणीव आहे');

              return (
                <p
                  key={index}
                  className={
                    isHighlight
                      ? 'font-serif text-lg sm:text-xl font-bold text-gold-dark bg-blush/30 p-4 rounded-xl border-l-4 border-gold shadow-sm'
                      : ''
                  }
                >
                  {paragraph}
                </p>
              );
            })}
          </div>

          <div className="mt-10 pt-6 border-t border-blush/70 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-serif text-warmBrown uppercase tracking-wider">
              <span>FOR GAYTRI PAWAR</span>
              <span>•</span>
              <span>FOREVER GRATEFUL</span>
            </div>
            <div className="text-right">
              <span className="font-handwritten text-2xl text-deepBlack font-bold">
                तुझा भाऊ, साहिल ♡
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
