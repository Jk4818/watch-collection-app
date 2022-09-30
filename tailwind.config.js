const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#F9F7F3",
      },
      fontFamily: {
        Actor: ['Actor', ...defaultTheme.fontFamily.sans],
        Alegreya: ['Alegreya Sans SC', ...defaultTheme.fontFamily.sans],
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        'auto': 'repeat(auto-fill, minmax(20rem, max-content))',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}