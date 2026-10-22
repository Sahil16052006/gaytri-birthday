import confetti from 'canvas-confetti';

// Customized colors matching our luxury palette:
// Cream, Blush Pink, Dusty Rose, Champagne Gold, Warm Brown
const ELEGANT_COLORS = ['#F1D5D8', '#D5A0A8', '#C8A46B', '#FFF8F0', '#E4BDC1', '#DFBF87'];
const GOLD_COLORS = ['#C8A46B', '#DFBF87', '#F4E5CA', '#A68249'];
const ROSE_COLORS = ['#F1D5D8', '#D5A0A8', '#E4BDC1', '#B87B85'];

export function triggerBirthdayConfetti() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // Left burst
  confetti({
    particleCount: 50,
    angle: 60,
    spread: 55,
    origin: { x: 0, y: 0.7 },
    colors: ELEGANT_COLORS,
    ticks: 200,
    gravity: 0.8,
    scalar: 1.1,
  });

  // Right burst
  confetti({
    particleCount: 50,
    angle: 120,
    spread: 55,
    origin: { x: 1, y: 0.7 },
    colors: ELEGANT_COLORS,
    ticks: 200,
    gravity: 0.8,
    scalar: 1.1,
  });
}

export function triggerGoldenSparkles() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  confetti({
    particleCount: 70,
    spread: 100,
    origin: { y: 0.5 },
    colors: GOLD_COLORS,
    ticks: 220,
    gravity: 0.7,
    shapes: ['circle'],
    scalar: 0.9,
  });
}

export function triggerRosePetalsShower() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const duration = 2.5 * 1000;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 60,
      origin: { x: Math.random(), y: -0.1 },
      colors: ROSE_COLORS,
      ticks: 300,
      gravity: 0.5,
      scalar: 1.2,
      shapes: ['circle'],
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();
}
