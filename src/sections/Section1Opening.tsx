import React, { useState, useEffect } from 'react';
import { birthdayConfig } from '../data/birthdayConfig';
import { Sparkles, Heart, Lock, Unlock, Clock, AlertCircle, X, KeyRound } from 'lucide-react';
import { triggerGoldenSparkles, triggerBirthdayConfetti } from '../utils/confetti';

interface Section1OpeningProps {
  onOpen: () => void;
  isOpened: boolean;
  isUnlocked: boolean;
  onBypassLock: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Section1Opening: React.FC<Section1OpeningProps> = ({
  onOpen,
  isOpened,
  isUnlocked,
  onBypassLock,
}) => {
  const { section1, recipient } = birthdayConfig;

  // Exact Indian Standard Time timestamps (UTC+05:30)
  const birthdayStartMs = new Date(`${recipient.birthdayDateStr}T00:00:00+05:30`).getTime();

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showLockedModal, setShowLockedModal] = useState<boolean>(false);
  const [showPassModal, setShowPassModal] = useState<boolean>(false);
  const [passInput, setPassInput] = useState<string>('');
  const [passError, setPassError] = useState<string>('');

  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now();
      const diff = birthdayStartMs - now;

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [birthdayStartMs]);

  const handleOpenClick = () => {
    if (!isUnlocked) {
      setShowLockedModal(true);
      return;
    }

    triggerBirthdayConfetti();
    triggerGoldenSparkles();
    onOpen();

    const heroEl = document.getElementById('birthday-hero');
    if (heroEl) {
      setTimeout(() => {
        heroEl.scrollIntoView({ behavior: 'smooth' });
      }, 350);
    }
  };

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Sahil can type 'sahil', '2026', or 'gaytri' to preview before midnight
    const clean = passInput.trim().toLowerCase();
    if (clean === 'sahil' || clean === '2026' || clean === 'gaytri' || clean === 'open') {
      setShowPassModal(false);
      onBypassLock();
      triggerGoldenSparkles();
    } else {
      setPassError('पासकोड चुकीचा आहे. (टीप: sahil किंवा 2026 वापरा)');
    }
  };

  return (
    <section
      id="intro"
      className="relative min-h-screen flex items-center justify-center bg-cream-paper px-4 py-16 overflow-hidden border-b border-blush/60"
    >
      {/* Decorative Gold & Blush Corner Motifs */}
      <div className="absolute top-6 left-6 w-24 h-24 border-t-2 border-l-2 border-gold/40 rounded-tl-3xl pointer-events-none" />
      <div className="absolute top-6 right-6 w-24 h-24 border-t-2 border-r-2 border-gold/40 rounded-tr-3xl pointer-events-none" />
      <div className="absolute bottom-6 left-6 w-24 h-24 border-b-2 border-l-2 border-gold/40 rounded-bl-3xl pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-24 h-24 border-b-2 border-r-2 border-gold/40 rounded-br-3xl pointer-events-none" />

      {/* Floating Floral Accent Top */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 text-dustyRose/60 flex items-center gap-3 pointer-events-none">
        <span className="w-12 h-px bg-gold/40" />
        <span className="text-xl">🌸</span>
        <span className="w-12 h-px bg-gold/40" />
      </div>

      {/* Central Magazine Cover Card */}
      <div className="relative max-w-xl w-full mx-auto text-center z-10">
        <div className="washi-tape washi-tape-gold w-32 -top-3 left-1/2 -translate-x-1/2 -rotate-1 z-20" />

        <div className="bg-cream-light/95 border border-gold/40 rounded-3xl p-6 sm:p-12 shadow-scrapbook relative backdrop-blur-sm">
          {/* Magazine Header Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blush/60 border border-dustyRose/40 text-warmBrown text-xs uppercase tracking-widest font-serif mb-5">
            <Sparkles size={12} className="text-gold" />
            <span>{recipient.editionText}</span>
            <Sparkles size={12} className="text-gold" />
          </div>

          {/* Teaser Question */}
          <p className="font-handwritten text-warmBrown text-lg sm:text-xl mb-2 tracking-wide">
            {section1.teaser}
          </p>

          {/* Recipient Spotlight */}
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-deepBlack tracking-tight mb-1">
            {section1.recipientName}
          </h1>

          <p className="font-serif text-xl sm:text-2xl text-gold font-medium mb-4">
            {recipient.fullNameMarathi}
          </p>

          <div className="flex items-center justify-center gap-3 my-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
            <Heart size={14} className="text-dustyRose fill-dustyRose" />
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
          </div>

          <p className="marathi-text font-sans text-deepBlack/85 text-base sm:text-lg mb-6 max-w-md mx-auto">
            {section1.subtext}
          </p>

          {/* ========================================================== */}
          {/* 🌟 COUNTDOWN TIMER DISPLAY ON THE FIRST PAGE (LIVE IST) 🌟 */}
          {/* ========================================================== */}
          <div className="my-6 p-4 sm:p-5 rounded-2xl bg-blush/30 border border-gold/40 shadow-inner">
            <div className="flex items-center justify-center gap-2 text-xs font-serif text-warmBrown uppercase tracking-wider mb-3">
              <Clock size={13} className="text-gold" />
              <span>
                {isUnlocked
                  ? '🎉 आज गायत्रीचा वाढदिवस आहे! (IT’S HER BIRTHDAY!)'
                  : '⏳ वाढदिवस सुरू होण्यासाठी शिल्लक वेळ'}
              </span>
            </div>

            {!isUnlocked ? (
              <>
                <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-md mx-auto">
                  <div className="bg-cream/90 border border-gold/40 rounded-xl p-2 sm:p-3 shadow-sm">
                    <div className="font-serif text-2xl sm:text-3xl font-bold text-deepBlack">
                      {String(timeLeft.days).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] sm:text-xs font-serif text-warmBrown mt-0.5">दिवस</div>
                  </div>
                  <div className="bg-cream/90 border border-gold/40 rounded-xl p-2 sm:p-3 shadow-sm">
                    <div className="font-serif text-2xl sm:text-3xl font-bold text-deepBlack">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] sm:text-xs font-serif text-warmBrown mt-0.5">तास</div>
                  </div>
                  <div className="bg-cream/90 border border-gold/40 rounded-xl p-2 sm:p-3 shadow-sm">
                    <div className="font-serif text-2xl sm:text-3xl font-bold text-deepBlack">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] sm:text-xs font-serif text-warmBrown mt-0.5">मिनिटे</div>
                  </div>
                  <div className="bg-cream/90 border border-gold/40 rounded-xl p-2 sm:p-3 shadow-sm">
                    <div className="font-serif text-2xl sm:text-3xl font-bold text-gold-dark">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] sm:text-xs font-serif text-warmBrown mt-0.5">सेकंद</div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-warmBrown font-sans">
                  <Lock size={12} className="text-gold" />
                  <span>23 ऑक्टोबर 2026, रात्री 12:00 वाजता सर्व पाने अनलॉक होतील</span>
                </div>
              </>
            ) : (
              <div className="text-center py-2">
                <span className="text-2xl block mb-1">🎂✨🌸</span>
                <p className="font-serif text-lg font-bold text-deepBlack">
                  आजचा दिवस तुझा आहे, गायत्री! सर्व सरप्राइज अनलॉक झाले आहेत.
                </p>
              </div>
            )}
          </div>

          {/* Primary Action Button (Locked / Unlocked state) */}
          <div className="mt-6">
            <button
              type="button"
              onClick={handleOpenClick}
              className={`group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-serif text-base sm:text-lg tracking-wide transition-all duration-300 shadow-md active:translate-y-0 border ${
                isUnlocked
                  ? 'bg-deepBlack text-cream hover:bg-warmBrown hover:shadow-xl hover:-translate-y-0.5 border-gold/50 cursor-pointer'
                  : 'bg-warmBrown/90 text-cream/90 hover:bg-warmBrown border-gold/30 cursor-pointer'
              }`}
            >
              {isUnlocked ? (
                <>
                  <Unlock size={18} className="text-gold" />
                  <span>{section1.openButtonText}</span>
                  <span className="text-gold group-hover:translate-x-1 transition-transform">✨</span>
                </>
              ) : (
                <>
                  <Lock size={18} className="text-gold" />
                  <span>{section1.openButtonText} (लॉक्ड)</span>
                </>
              )}
            </button>
          </div>

          {/* Sahil Preview Bypass Trigger (subtle link at bottom) */}
          <div className="mt-6 pt-4 border-t border-blush/60 flex items-center justify-between text-[11px] text-warmBrown/70">
            <span>23 ऑक्टोबर 2026 • 20th Birthday</span>
            {!isUnlocked && (
              <button
                type="button"
                onClick={() => setShowPassModal(true)}
                className="flex items-center gap-1 hover:text-deepBlack transition-colors underline underline-offset-2"
                title="भावासाठी प्रिव्ह्यू अनलॉक"
              >
                <KeyRound size={11} />
                <span>भावाचा प्रिव्ह्यू</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Locked Notification Modal */}
      {showLockedModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-deepBlack/60 backdrop-blur-sm p-4 animate-fadeIn"
          onClick={() => setShowLockedModal(false)}
        >
          <div
            className="bg-cream border-2 border-gold rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowLockedModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-blush text-warmBrown transition-colors"
              aria-label="बंद करा"
            >
              <X size={20} />
            </button>

            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blush/60 border border-gold/50 flex items-center justify-center text-warmBrown">
              <Lock size={28} className="text-deepBlack" />
            </div>

            <h3 className="font-serif text-2xl font-bold text-deepBlack mb-2">
              थांब ना थोडं! 🌸
            </h3>

            <p className="font-serif text-base text-warmBrown italic mb-4">
              गायत्री, हे सरप्राइज अजून कुलूपबंद आहे.
            </p>

            <div className="bg-blush/30 p-4 rounded-xl text-deepBlack/90 text-sm marathi-text leading-relaxed mb-6 border border-dustyRose/30">
              हा वाढदिवस खास आहे! 23 ऑक्टोबर रोजी ठीक रात्री 12:00 AM (मध्यरात्री) वाजता ही वेबसाईट आपोआप अनलॉक होईल. तोपर्यंत प्रत्येक सेकंदाची वाट पाहूया! ♡
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => setShowLockedModal(false)}
                className="w-full py-3 rounded-full bg-deepBlack text-cream font-serif text-sm hover:bg-warmBrown transition-colors"
              >
                समजलं, मी वाट पाहीन ♡
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowLockedModal(false);
                  setShowPassModal(true);
                }}
                className="text-xs text-warmBrown underline mt-2"
              >
                साहिल (भाऊ) आहात का? प्रिव्ह्यू कोड टाका
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Passcode Modal for Sahil Preview */}
      {showPassModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-deepBlack/60 backdrop-blur-sm p-4 animate-fadeIn"
          onClick={() => setShowPassModal(false)}
        >
          <div
            className="bg-cream border-2 border-gold rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl relative text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowPassModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-blush text-warmBrown transition-colors"
              aria-label="बंद करा"
            >
              <X size={20} />
            </button>

            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gold/20 flex items-center justify-center text-gold-dark">
              <KeyRound size={22} />
            </div>

            <h3 className="font-serif text-xl font-bold text-deepBlack mb-1">
              भावाचा प्रिव्ह्यू कोड
            </h3>
            <p className="text-xs text-warmBrown mb-4">
              वेबसाईट आधीच तपासून पाहण्यासाठी कोड टाका (उदा. sahil किंवा 2026)
            </p>

            <form onSubmit={handlePasscodeSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="पासकोड प्रविष्ट करा..."
                value={passInput}
                onChange={(e) => {
                  setPassInput(e.target.value);
                  setPassError('');
                }}
                className="w-full px-4 py-2.5 rounded-xl border border-dustyRose/60 bg-cream-light text-deepBlack text-center font-serif focus:outline-none focus:ring-2 focus:ring-gold"
                autoFocus
              />

              {passError && (
                <p className="text-xs text-red-600 font-sans">{passError}</p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-full bg-deepBlack text-cream font-serif text-sm hover:bg-warmBrown transition-colors shadow-sm"
              >
                प्रिव्ह्यू अनलॉक करा ✨
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
