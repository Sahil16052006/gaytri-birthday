import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Music } from 'lucide-react';
import { melodyPlayer } from '../utils/audioPlayer';
import { birthdayConfig } from '../data/birthdayConfig';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.5);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    const checkState = () => {
      setIsPlaying(melodyPlayer.getIsPlaying());
      setIsMuted(melodyPlayer.getIsMuted());
    };
    const interval = setInterval(checkState, 800);
    return () => clearInterval(interval);
  }, []);

  const handleTogglePlay = () => {
    const newState = melodyPlayer.toggle();
    setIsPlaying(newState);
  };

  const handleToggleMute = () => {
    const muted = melodyPlayer.toggleMute();
    setIsMuted(muted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    melodyPlayer.setVolume(val);
    if (isMuted && val > 0) {
      melodyPlayer.toggleMute();
      setIsMuted(false);
    }
  };

  return (
    <aside
      aria-label="संगीत नियंत्रण"
      className="fixed bottom-5 right-5 z-40 transition-all duration-300"
    >
      <div className="flex items-center gap-2">
        {isExpanded && (
          <div className="glass-panel px-4 py-2.5 rounded-2xl shadow-scrapbook flex items-center gap-3 border border-blush/60 animate-unfold text-deepBlack">
            <div className="text-left max-w-[160px] sm:max-w-[200px]">
              <p className="text-xs font-serif font-semibold text-deepBlack truncate">
                {birthdayConfig.music.trackName}
              </p>
              <p className="text-[10px] text-warmBrown truncate font-sans">
                {birthdayConfig.music.description}
              </p>
            </div>

            <div className="flex items-center gap-1.5 pl-2 border-l border-dustyRose/30">
              <button
                type="button"
                onClick={handleToggleMute}
                className="p-1 rounded-full text-warmBrown hover:text-deepBlack transition-colors"
                aria-label={isMuted ? "अनम्यूट करा" : "म्यूट करा"}
              >
                {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 bg-dustyRose/40 rounded-lg appearance-none cursor-pointer accent-champagneGold"
                aria-label="आवाज पातळी"
              />
            </div>
          </div>
        )}

        <div className="flex items-center gap-1.5 glass-panel p-1.5 rounded-full shadow-scrapbook border border-blush/60">
          <button
            type="button"
            onClick={handleTogglePlay}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-transform transform active:scale-95 ${
              isPlaying
                ? 'bg-dustyRose text-white shadow-soft-rose animate-pulse'
                : 'bg-blush/80 hover:bg-blush text-deepBlack'
            }`}
            aria-label={isPlaying ? "संगीत थांबवा" : "संगीत सुरू करा"}
            title={isPlaying ? "संगीत थांबवा (Pause)" : "संगीत सुरू करा (Play)"}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
          </button>

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-warmBrown hover:text-deepBlack hover:bg-blush/40 transition-colors"
            aria-label={isExpanded ? "संगीत तपशील लपवा" : "संगीत तपशील उघडा"}
            title="संगीत माहिती"
          >
            <Music size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
};
