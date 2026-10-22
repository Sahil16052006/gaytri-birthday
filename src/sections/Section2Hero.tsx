import React from 'react';
import { birthdayConfig } from '../data/birthdayConfig';
import { triggerBirthdayConfetti } from '../utils/confetti';
import { Sparkles, Calendar, Award } from 'lucide-react';

export const Section2Hero: React.FC = () => {
  const { section2, recipient } = birthdayConfig;

  return (
    <section
      id="birthday-hero"
      className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-cream flex items-center justify-center overflow-hidden border-b border-blush/60"
    >
      <div className="absolute top-1/4 -left-16 w-64 h-64 bg-blush/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-16 w-72 h-72 bg-gold/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto relative z-10">
        <div className="flex flex-wrap items-center justify-between border-b border-gold/40 pb-4 mb-10 text-xs text-warmBrown tracking-widest font-serif uppercase">
          <div className="flex items-center gap-2">
            <Award size={14} className="text-gold" />
            <span>SPECIAL SISTER EDITION</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-gold" />
            <span>{section2.dateFormatted}</span>
          </div>
          <div className="text-right">
            <span>VOLUME 20 • NO. 01</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm">
              <div className="washi-tape washi-tape-gold w-28 -top-3 left-10 rotate-2 z-20" />
              <div className="washi-tape washi-tape-blush w-24 -bottom-3 right-8 -rotate-3 z-20" />

              <div className="polaroid-card -rotate-1 rounded-sm border border-blush/50">
                <div className="relative aspect-[3/4] overflow-hidden rounded bg-blush/20">
                  <img
                    src={section2.heroPhoto}
                    alt={recipient.fullNameMarathi}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deepBlack/40 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-3 left-3 right-3 text-cream text-xs font-serif italic text-center">
                    {recipient.fullNameMarathi} • {recipient.age} Years
                  </div>
                </div>

                <div className="pt-3 text-center">
                  <p className="font-handwritten text-warmBrown text-base font-semibold">
                    {section2.heroPhotoCaption}
                  </p>
                </div>
              </div>

              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={triggerBirthdayConfetti}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blush/80 hover:bg-blush text-deepBlack font-serif text-sm transition-all hover:scale-105 border border-dustyRose/40 shadow-sm"
                >
                  <Sparkles size={15} className="text-gold" />
                  <span>आनंदाचे क्षण साजरे करा 🌸</span>
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold-dark text-xs font-serif font-bold tracking-wider uppercase mb-4 self-start">
              <span>{section2.editionBadge}</span>
              <span>•</span>
              <span>{recipient.birthdayDateStr}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-deepBlack mb-3 leading-tight tracking-tight">
              {section2.mainHeading}
            </h2>

            <p className="font-serif text-lg sm:text-xl text-warmBrown mb-6 italic">
              {section2.secondaryHeading}
            </p>

            <div className="space-y-4 text-deepBlack/90 text-base sm:text-lg marathi-text bg-cream-light/70 p-6 sm:p-8 rounded-2xl border border-blush/50 shadow-sm">
              {section2.greetingParagraphs.map((para, idx) => (
                <p
                  key={idx}
                  className={
                    idx === 0
                      ? 'font-serif font-semibold text-warmBrown text-xl'
                      : idx === section2.greetingParagraphs.length - 1
                      ? 'font-serif font-bold text-gold-dark pt-2 text-lg'
                      : ''
                  }
                >
                  {para}
                </p>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-blush/70">
              <span className="text-xs text-warmBrown uppercase font-serif tracking-widest">
                FROM SAHIL TO GAYTRI
              </span>
              <span className="font-handwritten text-lg text-dustyRose font-bold">
                भावाचे मनापासून प्रेम ♡
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
