/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './hooks/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      backgroundColor: {
        '30-opacity-white': 'rgba(255, 255, 255, 0.3)',
      },
      borderWidth: {
        '1': '1px',
      },
    },
  },
  plugins: [
    ({ addBase }) => addBase({ ':root': { '--color-primaryi': '255 209 8' } }),
  ],
}