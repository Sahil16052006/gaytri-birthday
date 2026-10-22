import React, { useState } from 'react';
import { birthdayConfig, PhotoItem } from '../data/birthdayConfig';
import { Lightbox } from '../components/Lightbox';
import { Camera, Sparkles, ZoomIn } from 'lucide-react';

export const Section5Gallery: React.FC = () => {
  const { section5 } = birthdayConfig;
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  const handlePhotoClick = (photo: PhotoItem) => {
    setSelectedPhoto(photo);
  };

  const handleNavigate = (index: number) => {
    if (index >= 0 && index < section5.photos.length) {
      setSelectedPhoto(section5.photos[index]);
    }
  };

  return (
    <section
      id="gallery"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-cream-paper overflow-hidden border-b border-blush/60"
    >
      <div className="max-w-6xl w-full mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blush/60 text-warmBrown text-xs font-serif uppercase tracking-widest mb-3 border border-dustyRose/30">
            <Camera size={13} className="text-gold" />
            <span>MOMENTS & MEMORIES</span>
            <Sparkles size={13} className="text-gold" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-deepBlack tracking-tight mb-3">
            {section5.heading}
          </h2>

          <p className="font-serif text-base sm:text-lg text-warmBrown italic marathi-text">
            {section5.supportingLine}
          </p>

          <div className="flex items-center justify-center gap-3 mt-4">
            <span className="w-12 h-px bg-gold/50" />
            <span className="text-sm">📷</span>
            <span className="w-12 h-px bg-gold/50" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 items-start">
          {section5.photos.map((photo, index) => {
            const rotations = ['-rotate-2', 'rotate-2', '-rotate-1', 'rotate-1', '-rotate-2', 'rotate-2', '-rotate-1'];
            const rot = photo.rotation || rotations[index % rotations.length];

            return (
              <div
                key={photo.id}
                className={`group cursor-pointer polaroid-card ${rot} hover:rotate-0 transition-all duration-300 rounded-sm relative`}
                onClick={() => handlePhotoClick(photo)}
              >
                {index % 2 === 0 && (
                  <div className="washi-tape washi-tape-gold w-24 -top-3 left-6 -rotate-3 z-10" />
                )}
                {index % 3 === 0 && (
                  <div className="washi-tape washi-tape-blush w-20 -bottom-2 right-6 rotate-2 z-10" />
                )}

                <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden rounded bg-blush/20">
                  <img
                    src={photo.url}
                    alt={photo.alt}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-deepBlack/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3 py-1.5 rounded-full bg-cream/90 text-deepBlack font-serif text-xs flex items-center gap-1.5 shadow-md">
                      <ZoomIn size={13} />
                      <span>फोटो मोठा करा</span>
                    </span>
                  </div>

                  {photo.tag && (
                    <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-cream/85 backdrop-blur-sm text-warmBrown text-[10px] font-sans font-medium border border-blush/80">
                      {photo.tag}
                    </span>
                  )}
                </div>

                <div className="pt-3 pb-1 text-center">
                  <p className="font-handwritten text-deepBlack text-base font-semibold leading-relaxed marathi-text">
                    {photo.caption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-xs text-warmBrown font-serif italic">
            * फोटोंवर क्लिक करून तुम्ही ते पूर्ण आकारात पाहू शकता.
          </p>
        </div>
      </div>

      <Lightbox
        photo={selectedPhoto}
        photos={section5.photos}
        onClose={() => setSelectedPhoto(null)}
        onNavigate={handleNavigate}
      />
    </section>
  );
};
