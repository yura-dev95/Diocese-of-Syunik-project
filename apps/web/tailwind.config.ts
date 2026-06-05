import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        royal: '#a83638',
        gold: '#bd9754',
        forest: '#256343',
        parchment: '#f5ecd7',
        episcopal: '#561731',
        ink: '#261b1d',
      },
      fontFamily: {
        display: ['Georgia', '"Noto Serif Armenian"', 'serif'],
        sans: ['Inter', '"Noto Sans Armenian"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        sacred: '0 24px 70px rgba(86, 23, 49, 0.14)',
      },
      backgroundImage: {
        parchment:
          'radial-gradient(circle at 20% 10%, rgba(189,151,84,.13), transparent 34%), radial-gradient(circle at 90% 70%, rgba(168,54,56,.08), transparent 28%)',
      },
    },
  },
  plugins: [],
} satisfies Config;
