/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'dark': 'rgb(15,23,42)',
      "textPrimary": "#f3f4f6",
      'textSecondary': "#d1d5db",
      'textInput': "rgb(31,41,55)",
      'transparent': "#ffffff00",
      'hover': "#2563eb"
    },
    extend: {},
  },
  plugins: [],
}
