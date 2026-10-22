/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          light: '#FFFDF9',
          DEFAULT: '#FFF8F0',
          dark: '#F5ECE1',
        },
        blush: {
          light: '#FDF3F4',
          DEFAULT: '#F1D5D8',
          dark: '#E4BDC1',
        },
        dustyRose: {
          light: '#E6BAC0',
          DEFAULT: '#D5A0A8',
          dark: '#B87B85',
        },
        deepBlack: {
          light: '#3A3335',
          DEFAULT: '#211D1E',
          dark: '#141112',
        },
        gold: {
          light: '#DFBF87',
          DEFAULT: '#C8A46B',
          dark: '#A68249',
          shimmer: '#F4E5CA',
        },
        warmBrown: {
          light: '#8A625B',
          DEFAULT: '#6D4C46',
          dark: '#4F3530',
        },
      },
      fontFamily: {
        serif: ['"Noto Serif Devanagari"', '"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', '"Noto Serif Devanagari"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Noto Sans Devanagari"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        handwritten: ['Kalam', 'Caveat', 'cursive'],
        marathiScript: ['Kalam', 'cursive'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(2deg)' },
        },
        gentleDrift: {
          '0%': { transform: 'translateY(-5%) translateX(0) rotate(0deg)', opacity: '0' },
          '15%': { opacity: '0.85' },
          '85%': { opacity: '0.85' },
          '100%': { transform: 'translateY(105vh) translateX(30px) rotate(360deg)', opacity: '0' },
        },
        softPulse: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        unfold: {
          '0%': { transform: 'scale(0.96) rotateX(20deg)', opacity: '0' },
          '100%': { transform: 'scale(1) rotateX(0deg)', opacity: '1' },
        },
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        drift: 'gentleDrift 14s linear infinite',
        pulseGlow: 'softPulse 4s ease-in-out infinite',
        shimmer: 'shimmer 3s ease-in-out infinite',
        unfold: 'unfold 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      boxShadow: {
        'scrapbook': '0 12px 35px -8px rgba(33, 29, 30, 0.12), 0 4px 14px -3px rgba(200, 164, 107, 0.18)',
        'polaroid': '0 8px 25px -4px rgba(33, 29, 30, 0.15), 0 2px 6px -1px rgba(33, 29, 30, 0.08)',
        'gold-subtle': '0 0 20px rgba(200, 164, 107, 0.28)',
        'envelope-deep': '0 25px 50px -12px rgba(33, 29, 30, 0.22)',
      },
    },
  },
  plugins: [],
}
