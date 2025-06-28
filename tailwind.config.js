/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bebas: ['"Bebas Neue"', 'sans-serif'],
        roboto: ['"Roboto"', 'sans-serif'],
        AlegreySC: ['"Alegreya SC"', 'sans-serif'],
        inria: ['"Inria Serif"', 'serif'],
      },
      keyframes: {
        bounceY: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15%)' },
        },
      },
      animation: {
        'bounce-y': 'bounceY 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}