import React, { useState } from 'react';
import { birthdayConfig } from '../data/birthdayConfig';
import { Mail, MailOpen, Heart, Sparkles } from 'lucide-react';
import { triggerGoldenSparkles } from '../utils/confetti';

export const Section6Letter: React.FC = () => {
  const { section6 } = birthdayConfig;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggle = () => {
    if (!isOpen) {
      triggerGoldenSparkles();
    }
    setIsOpen(!isOpen);
  };

  return (
    <section
      id="letter"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-cream flex items-center justify-center overflow-hidden border-b border-blush/60"
    >
      <div className="max-w-3xl w-full mx-auto relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blush/60 text-warmBrown text-xs font-serif uppercase tracking-widest mb-3 border border-dustyRose/30">
            <Mail size={12} className="text-gold" />
            <span>A HANDWRITTEN LETTER</span>
            <Heart size={12} className="text-dustyRose fill-dustyRose" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-deepBlack tracking-tight mb-3">
            एक पत्र, फक्त तुझ्यासाठी
          </h2>

          <p className="font-serif text-base sm:text-lg text-warmBrown italic marathi-text max-w-xl mx-auto">
            {section6.teaserText}
          </p>
        </div>

        <div className="relative">
          {!isOpen && (
            <div className="relative bg-cream-light border-2 border-gold/40 rounded-3xl p-8 sm:p-14 shadow-envelope-deep text-center transition-all duration-500 hover:shadow-2xl">
              <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-blush/40 to-transparent rounded-t-3xl border-b border-gold/20 pointer-events-none" />

              <div className="w-16 h-px bg-gold/60 mx-auto mb-6" />

              <div className="mb-6">
                <span className="font-serif text-xs uppercase tracking-widest text-warmBrown">
                  FOR MY DEAREST SISTER
                </span>
                <h3 className="font-handwritten text-3xl sm:text-4xl text-deepBlack font-bold mt-1">
                  {section6.envelopeLabel}
                </h3>
              </div>

              <div className="my-8 flex justify-center">
                <button
                  type="button"
                  onClick={handleToggle}
                  className="wax-seal w-20 h-20 rounded-full flex flex-col items-center justify-center text-cream shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-gold/50 cursor-pointer group"
                  aria-label={section6.openLetterBtn}
                >
                  <span className="text-2xl group-hover:rotate-12 transition-transform">
                    {section6.waxSealSymbol}
                  </span>
                  <span className="text-[10px] tracking-wider font-serif uppercase mt-0.5 opacity-90">
                    OPEN
                  </span>
                </button>
              </div>

              <p className="text-xs text-warmBrown font-serif mb-6">
                (पत्रावर किंवा खालील बटनावर क्लिक करा)
              </p>

              <button
                type="button"
                onClick={handleToggle}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-deepBlack text-cream font-serif text-base hover:bg-warmBrown transition-all duration-300 shadow-md border border-gold/40"
              >
                <MailOpen size={18} className="text-gold" />
                <span>{section6.openLetterBtn}</span>
              </button>
            </div>
          )}

          {isOpen && (
            <div className="relative bg-journal-lined border border-gold/40 rounded-3xl p-6 sm:p-14 shadow-scrapbook animate-unfold">
              <div className="washi-tape washi-tape-gold w-32 -top-3 left-1/2 -translate-x-1/2 -rotate-1 z-20" />

              <div className="flex flex-wrap items-center justify-between border-b border-dustyRose/40 pb-4 mb-8">
                <div className="flex items-center gap-2 text-xs font-serif text-warmBrown uppercase tracking-wider">
                  <Sparkles size={13} className="text-gold" />
                  <span>SPECIAL BIRTHDAY LETTER</span>
                </div>
                <div className="text-xs font-serif text-warmBrown">
                  {section6.letterDate}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-handwritten text-3xl sm:text-4xl text-warmBrown font-bold">
                  {section6.salutation}
                </h3>
                <p className="font-serif text-xl sm:text-2xl text-deepBlack font-bold mt-2">
                  {section6.openingWish}
                </p>
              </div>

              <div className="space-y-6 text-deepBlack/95 text-base sm:text-lg marathi-text leading-loose font-sans">
                {section6.paragraphs.map((para, index) => (
                  <p key={index} className="text-justify sm:text-left">
                    {para}
                  </p>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-dustyRose/40 flex flex-col items-end">
                <div className="text-right space-y-1 font-handwritten">
                  {section6.closingLines.map((line, idx) => (
                    <p
                      key={idx}
                      className={
                        idx === section6.closingLines.length - 1
                          ? 'text-3xl text-deepBlack font-bold pt-1'
                          : 'text-xl text-warmBrown'
                      }
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-10 text-center border-t border-blush/60 pt-6">
                <button
                  type="button"
                  onClick={handleToggle}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-blush/60 hover:bg-blush text-deepBlack font-serif text-sm transition-all border border-dustyRose/30"
                >
                  <Mail size={15} />
                  <span>पत्र पुन्हा बंद करा (Fold Letter)</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
