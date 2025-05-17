const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./src/**/*.{html,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'main-green': '#004746',
      },
      boxShadow: {
        custom: '0px 4px 8px rgba(0,0,0,0.5)',
      },
      fontFamily: {
        'dm-sans': ['DM Sans', ...defaultTheme.fontFamily.sans],
        'inter': ['Inter', ...defaultTheme.fontFamily.sans],
        'dancing': ['Dancing Script', 'cursive'],
        'instrument': ['Instrument Serif', 'serif'],
      },
      keyframes: {
        'slide-in-x': {
          '0%': { transform: 'translateX(-50px)' },
          '100%': { transform: 'translateX(0px)' },
        },
      },
      animation: {
        'slide-in-x': 'slide-in-x 0.5s ease-out forwards',
      },
    },
    screens: {
      'xs': '480px',      // Extra small devices
      'sm': '640px',      // Small devices
      'md': '768px',      // Medium devices
      'lg': '1024px',     // Large devices
      'xl': '1280px',     // Extra large devices
    },
  },
  plugins: [],
};