/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      maxWidth: {
        '8xl': '96rem',
      },
      colors: {
        orange: {
          50: '#FFF9E6',
          100: '#FFF3CC',
          200: '#FFE699',
          300: '#FFD966',
          400: '#FFB900',
          500: '#FFB900',
          600: '#E6A700',
          700: '#CC9300',
          800: '#B37F00',
          900: '#996B00',
        },
        green: {
          50: '#E8F0E8',
          100: '#C8DCC8',
          200: '#9ABF9A',
          300: '#6CA26C',
          400: '#3E853E',
          500: '#1B5E20',
          600: '#175518',
          700: '#134C14',
          800: '#0F4310',
          900: '#0B3A0C',
        },
      },
    },
  },
  plugins: [],
};
