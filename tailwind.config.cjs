/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  purge: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.jsx',
  ],
  theme: {
    fontFamily: {
      sans: ['Lexend Deca', 'sans-serif']
    },
    extend: {},
  },
  plugins: [],
}
