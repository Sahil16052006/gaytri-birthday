import React, { useMemo } from 'react';

interface Particle {
  id: number;
  left: string;
  size: number;
  duration: string;
  delay: string;
  opacity: number;
  type: 'petal' | 'sparkle';
}

export const PetalsBackground: React.FC = () => {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${(i * 5.5 + Math.sin(i) * 3) % 96}%`,
      size: i % 3 === 0 ? 10 : i % 2 === 0 ? 14 : 7,
      duration: `${14 + (i % 7) * 2.5}s`,
      delay: `${(i * 0.8) % 8}s`,
      opacity: 0.25 + ((i % 5) * 0.1),
      type: i % 4 === 0 ? 'sparkle' : 'petal',
    }));
  }, []);

  return (
    <div className="petals-container" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-drift pointer-events-none"
          style={{
            left: p.left,
            top: '-20px',
            animationDuration: p.duration,
            animationDelay: p.delay,
            opacity: p.opacity,
          }}
        >
          {p.type === 'petal' ? (
            <svg
              width={p.size}
              height={p.size * 1.3}
              viewBox="0 0 24 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transform rotate-12 text-dustyRose/60"
            >
              <path
                d="M12 0C18 6 24 14 24 22C24 27.5 18.5 32 12 32C5.5 32 0 27.5 0 22C0 14 6 6 12 0Z"
                fill="currentColor"
              />
            </svg>
          ) : (
            <svg
              width={p.size}
              height={p.size}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-gold/70"
            >
              <path
                d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"
                fill="currentColor"
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};
