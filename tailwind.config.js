/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: { DEFAULT: '#E5383B', dark: '#C92A2D' },
        surface: '#F5F5F7',
      },
    },
  },
  plugins: [],
};
