import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { PhotoItem } from '../data/birthdayConfig';

interface LightboxProps {
  photo: PhotoItem | null;
  photos: PhotoItem[];
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  photo,
  photos,
  onClose,
  onNavigate,
}) => {
  if (!photo) return null;

  const currentIndex = photos.findIndex((p) => p.id === photo.id);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    } else {
      onNavigate(photos.length - 1);
    }
  }, [currentIndex, photos.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex < photos.length - 1) {
      onNavigate(currentIndex + 1);
    } else {
      onNavigate(0);
    }
  }, [currentIndex, photos.length, onNavigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, handlePrev, handleNext]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="फोटो गॅलरी व्ह्यू"
      className="fixed inset-0 z-50 flex items-center justify-center bg-deepBlack/90 backdrop-blur-md p-4 sm:p-6"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-5 right-5 z-10 w-11 h-11 rounded-full bg-cream/20 hover:bg-cream/40 text-white flex items-center justify-center transition-colors"
        aria-label="गॅलरी बंद करा"
      >
        <X size={24} />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        className="absolute left-3 sm:left-6 z-10 w-12 h-12 rounded-full bg-cream/20 hover:bg-cream/40 text-white flex items-center justify-center transition-colors"
        aria-label="मागील फोटो"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        className="absolute right-3 sm:right-6 z-10 w-12 h-12 rounded-full bg-cream/20 hover:bg-cream/40 text-white flex items-center justify-center transition-colors"
        aria-label="पुढील फोटो"
      >
        <ChevronRight size={28} />
      </button>

      <div
        className="relative max-w-4xl max-h-[85vh] flex flex-col items-center justify-center bg-cream rounded-2xl p-3 sm:p-4 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative max-h-[70vh] overflow-hidden rounded-xl border border-gold/30">
          <img
            src={photo.url}
            alt={photo.alt}
            className="w-full h-full object-contain max-h-[68vh] rounded-lg"
          />
        </div>

        <div className="mt-3 text-center px-4 max-w-xl">
          {photo.tag && (
            <span className="inline-block px-2.5 py-0.5 mb-1.5 rounded-full bg-blush text-warmBrown text-[11px] font-sans font-medium">
              {photo.tag}
            </span>
          )}
          <p className="text-deepBlack font-serif text-sm sm:text-base marathi-text">
            {photo.caption}
          </p>
          <p className="text-warmBrown/70 text-xs mt-1 font-sans">
            {currentIndex + 1} / {photos.length}
          </p>
        </div>
      </div>
    </div>
  );
};
