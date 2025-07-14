/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    'text-menh-thuy', 'bg-menh-thuy',
    'text-menh-moc', 'bg-menh-moc',
    'text-menh-tho', 'bg-menh-tho',
    'text-menh-hoa', 'bg-menh-hoa',
    'text-menh-kim', 'bg-menh-kim',
  ],

  theme: {
    extend: {
      fontFamily: {
        bebas: ['"Bebas Neue"', 'sans-serif'],
        roboto: ['"Roboto"', 'sans-serif'],
        AlegreySC: ['"Alegreya SC"', 'sans-serif'],
        inria: ['"Inria Serif"', 'serif'],
      },
      colors: {
        'menh-thuy': '#020d7d',
        'menh-moc': '#0d4f00',
        'menh-tho': '#824903',
        'menh-hoa': '#5d0000',
        'menh-kim': '#c0c0c0',
        'shockingly-green': '#00ff90',
        'surface-white': '#ffffff',
        pink: '#ff69b4',
        'shockingly-pink': '#ff00aa',
        orangey: '#ffaa00',
        lilac: '#c8a2c8',
        'lt-green': '#a8e6cf',
        blue: '#0077ff',
        'grey-dark': '#333',
        light: '#fefefe',
        green: '#4caf50',
        'green-dark': '#2e7d32',
        'green-light': '#81c784',
        red: '#f44336',
        orange: '#ff9800',
        purple: '#9c27b0',
      },
      backgroundImage: {
        'gradient-macha': 'linear-gradient(135deg, #a8e6cf, #dcedc1)',
        'gradient-orange-crush': 'linear-gradient(135deg, #ff9966, #ff5e62)',
        'gradient-lipstick': 'linear-gradient(135deg, #b92b27, #1565c0)',
        'gradient-purple-haze': 'linear-gradient(135deg, #8e2de2, #4a00e0)',
        'gradient-skyfall': 'linear-gradient(135deg, #43cea2, #185a9d)',
        'gradient-emerald-city': 'linear-gradient(135deg, #348f50, #56b4d3)',
        'gradient-summer-fair': 'linear-gradient(135deg, #f6d365, #fda085)',
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
};
