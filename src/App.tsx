import React, { useState, useEffect } from 'react';
import { birthdayConfig } from './data/birthdayConfig';
import { PetalsBackground } from './components/PetalsBackground';
import { Navigation } from './components/Navigation';
import { AudioPlayer } from './components/AudioPlayer';
import { Section1Opening } from './sections/Section1Opening';
import { Section2Hero } from './sections/Section2Hero';
import { Section3SisterBond } from './sections/Section3SisterBond';
import { Section4CreativeSoul } from './sections/Section4CreativeSoul';
import { Section5Gallery } from './sections/Section5Gallery';
import { Section6Letter } from './sections/Section6Letter';
import { Section7Countdown } from './sections/Section7Countdown';
import { Section8Surprise } from './sections/Section8Surprise';
import { Section9Closing } from './sections/Section9Closing';

export const App: React.FC = () => {
  const { recipient } = birthdayConfig;
  const birthdayStartMs = new Date(`${recipient.birthdayDateStr}T00:00:00+05:30`).getTime();

  // Check if birthday has arrived (or if preview mode is active in URL or state)
  const [isBirthdayReached, setIsBirthdayReached] = useState<boolean>(() => {
    return Date.now() >= birthdayStartMs;
  });

  const [previewBypass, setPreviewBypass] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('preview') === 'true';
    }
    return false;
  });

  const [isOpened, setIsOpened] = useState<boolean>(false);

  const isUnlocked = isBirthdayReached || previewBypass;

  useEffect(() => {
    const checkBirthday = () => {
      const arrived = Date.now() >= birthdayStartMs;
      setIsBirthdayReached(arrived);
    };

    checkBirthday();
    const interval = setInterval(checkBirthday, 1000);
    return () => clearInterval(interval);
  }, [birthdayStartMs]);

  const handleOpen = () => {
    setIsOpened(true);
  };

  const handleBypassLock = () => {
    setPreviewBypass(true);
  };

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-cream text-deepBlack font-sans relative selection:bg-blush selection:text-deepBlack">
      {/* Floating Rose Petals & Golden Sparkles Background */}
      <PetalsBackground />

      {/* Floating Navigation Menu & Progress (Active once unlocked) */}
      {isUnlocked && <Navigation />}

      {/* Floating Ambient Music Audio Player */}
      <AudioPlayer />

      <main>
        {/* Section 1: The Opening Gift + LIVE COUNTDOWN TIMER & LOCK */}
        <Section1Opening
          onOpen={handleOpen}
          isOpened={isOpened}
          isUnlocked={isUnlocked}
          onBypassLock={handleBypassLock}
        />

        {/* Further sections: STRICTLY LOCKED until birthday arrives or preview bypass is used */}
        {isUnlocked && (
          <div className="animate-unfold">
            {/* Section 2: Happy 20th Birthday, Gaytri */}
            <Section2Hero />

            {/* Section 3: “तू आहेस, म्हणून एकटं वाटत नाही” */}
            <Section3SisterBond />

            {/* Section 4: “तुझ्या कल्पनांचं सुंदर जग” (Creative Soul) */}
            <Section4CreativeSoul />

            {/* Section 5: The Photo Gallery */}
            <Section5Gallery />

            {/* Section 6: “एक पत्र, फक्त तुझ्यासाठी” (Interactive Handwritten Letter) */}
            <Section6Letter />

            {/* Section 7: The Birthday Countdown */}
            <Section7Countdown />

            {/* Section 8: The Secret Surprise */}
            <Section8Surprise />

            {/* Section 9: The Final Page */}
            <Section9Closing onReplay={handleReplay} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
