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
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-4px)' },
          '40%, 80%': { transform: 'translateX(4px)' },
        },
      },
      animation: {
        'bounce-y': 'bounceY 1s ease-in-out infinite',
        shake: 'shake 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
}
