/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Poppins': ['Poppins'],
        'Nunito': ['Nunito+Sans'],
        'Public': ['Public+Sans']
      }
    },
  },
  plugins: [],
}