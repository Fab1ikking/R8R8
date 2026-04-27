/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./lib/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#1A3DFF',
          'blue-dark': '#1230CC',
          'blue-light': '#4D6FFF',
          teal: '#00D1C7',
          'teal-dark': '#00A89F',
          'teal-light': '#33DADA',
        },
      },
      keyframes: {
        'letter-float': {
          '0%, 100%': { transform: 'translateY(0)', opacity: '1' },
          '50%': { transform: 'translateY(-8px)', opacity: '0.8' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulse2: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(0,209,199,0.4)' },
          '50%': { boxShadow: '0 0 0 16px rgba(0,209,199,0)' },
        },
      },
      animation: {
        'letter-float': 'letter-float 2s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 5s ease infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'scale-in': 'scale-in 0.5s ease-out forwards',
        float: 'float 3s ease-in-out infinite',
        pulse2: 'pulse2 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
