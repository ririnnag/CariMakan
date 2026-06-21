/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1565C0', // Denim blue
        secondary: '#FFFFFF', // White
        background: '#F3F4F6', // Light gray
        accent: '#F97316', // Orange
      }
    },
  },
  plugins: [],
}
