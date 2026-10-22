import React, { useState } from 'react';
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
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpened(true);
  };

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-cream text-deepBlack font-sans relative selection:bg-blush selection:text-deepBlack">
      <PetalsBackground />
      <Navigation />
      <AudioPlayer />

      <main>
        <Section1Opening onOpen={handleOpen} isOpened={isOpened} />
        <Section2Hero />
        <Section3SisterBond />
        <Section4CreativeSoul />
        <Section5Gallery />
        <Section6Letter />
        <Section7Countdown />
        <Section8Surprise />
        <Section9Closing onReplay={handleReplay} />
      </main>
    </div>
  );
};

export default App;
