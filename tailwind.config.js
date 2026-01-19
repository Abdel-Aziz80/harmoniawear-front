/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'harmonia-black': '#2a2a2c',
        'harmonia-red': '#d05b64', 
        'harmonia-cream': '#f1f4f4',
        'harmonia-mauve': '#7a5968',
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'opensans': ['Open Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}