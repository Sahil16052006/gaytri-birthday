import React, { useState, useEffect } from 'react';
import { birthdayConfig } from '../data/birthdayConfig';
import { Clock, Calendar, Sparkles } from 'lucide-react';
import { triggerBirthdayConfetti } from '../utils/confetti';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Section7Countdown: React.FC = () => {
  const { section7, recipient } = birthdayConfig;

  // Exact Indian Standard Time timestamps (UTC+05:30)
  const birthdayStartMs = new Date(`${recipient.birthdayDateStr}T00:00:00+05:30`).getTime();
  const birthdayEndMs = new Date(`${recipient.birthdayDateStr}T23:59:59+05:30`).getTime();

  const [state, setState] = useState<'before' | 'during' | 'after'>('before');
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now();

      if (now < birthdayStartMs) {
        setState('before');
        const diff = birthdayStartMs - now;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else if (now >= birthdayStartMs && now <= birthdayEndMs) {
        setState('during');
      } else {
        setState('after');
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [birthdayStartMs, birthdayEndMs]);

  return (
    <section
      id="countdown"
      className="relative min-h-[70vh] py-24 px-4 sm:px-6 lg:px-8 bg-cream flex items-center justify-center overflow-hidden border-b border-blush/60"
    >
      <div className="max-w-4xl w-full mx-auto relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blush/60 text-warmBrown text-xs font-serif uppercase tracking-widest mb-4 border border-dustyRose/30">
          <Clock size={12} className="text-gold" />
          <span>COUNTDOWN TO 23 OCTOBER 2026</span>
          <Calendar size={12} className="text-gold" />
        </div>

        {state === 'before' && (
          <div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-deepBlack tracking-tight mb-3">
              {section7.titleBefore}
            </h2>
            <p className="font-serif text-base sm:text-lg text-warmBrown italic mb-10 max-w-xl mx-auto marathi-text">
              {section7.subtitleBefore}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto mb-8">
              {[
                { label: section7.labels.days, value: timeLeft.days },
                { label: section7.labels.hours, value: timeLeft.hours },
                { label: section7.labels.minutes, value: timeLeft.minutes },
                { label: section7.labels.seconds, value: timeLeft.seconds },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-blush/40 border-2 border-gold/40 rounded-2xl p-5 sm:p-6 shadow-sm hover:scale-105 transition-transform"
                >
                  <div className="font-serif text-4xl sm:text-5xl font-bold text-deepBlack tracking-tight">
                    {String(item.value).padStart(2, '0')}
                  </div>
                  <div className="text-xs uppercase font-serif text-warmBrown tracking-widest mt-2 font-semibold">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-warmBrown font-sans">
              * भारतीय प्रमाणवेळ (Asia/Kolkata IST) नुसार
            </p>
          </div>
        )}

        {state === 'during' && (
          <div className="bg-blush/50 border-2 border-gold rounded-3xl p-8 sm:p-14 shadow-scrapbook animate-unfold max-w-2xl mx-auto">
            <span className="text-4xl mb-3 block">🎂✨🌸</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-deepBlack tracking-tight mb-4">
              {section7.titleDuring}
            </h2>
            <p className="font-serif text-lg sm:text-xl text-warmBrown italic mb-8 marathi-text">
              {section7.subtitleDuring}
            </p>
            <button
              type="button"
              onClick={triggerBirthdayConfetti}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-deepBlack text-cream font-serif text-base shadow-lg hover:bg-warmBrown transition-all"
            >
              <Sparkles size={16} className="text-gold" />
              <span>वाढदिवस साजरा करा! 🌸</span>
            </button>
          </div>
        )}

        {state === 'after' && (
          <div className="bg-cream-paper border-2 border-gold/40 rounded-3xl p-8 sm:p-14 shadow-scrapbook max-w-2xl mx-auto">
            <span className="text-4xl mb-3 block">💖🌟</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-deepBlack tracking-tight mb-4">
              {section7.titleAfter}
            </h2>
            <p className="font-serif text-base sm:text-lg text-warmBrown italic marathi-text">
              {section7.subtitleAfter}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
