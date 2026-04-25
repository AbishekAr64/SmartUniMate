/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "30rem",   // 480px
        "2xl": "100rem", // 1600px
        "3xl": "120rem", // 1920px
      },
    },
  },
  plugins: [],
}