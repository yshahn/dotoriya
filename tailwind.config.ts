import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brown: {
          50:  '#FAF5EC',
          100: '#F5ECD7',
          200: '#E8D5B0',
          400: '#D4A96A',
          600: '#A05C2C',
          800: '#6B3F1F',
          900: '#4A2910',
        },
        cream: '#FAF0D0',
      },
      fontFamily: {
        sans:    ['Noto Sans KR', 'sans-serif'],
        display: ['Gowun Dodum', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;
