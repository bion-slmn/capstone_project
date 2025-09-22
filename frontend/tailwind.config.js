/** @type {import('tailwindcss').Config} */
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-green': '#22c55e',
        'brand-blue': '#0ea5e9',
        'brand-teal': '#14b8a6',
        'brand-gray': '#f3f4f6',
        'brand-dark': '#1f2937',
      },
    },
  },
  plugins: [],
};
