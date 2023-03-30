/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        primary: {
          50: '#F6F2F8',
          100: '#DDCBE2',
          200: '#c8a9cf',
          300: '#B692C9',
          400: '#9A69B5',
          500: '#7c4a97',
          800: '#432852',
          900: '#2e1745',
        },
      },
      height: {
        '100': '28rem',
        '128': '32rem',
      }
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
