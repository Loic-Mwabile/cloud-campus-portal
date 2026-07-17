/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Primary brand palette (indigo).
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
        },
        // AWS accent colours, used on the Infrastructure page.
        aws: {
          navy: '#232f3e',
          orange: '#ff9900',
        },
      },
    },
  },
  plugins: [],
};
