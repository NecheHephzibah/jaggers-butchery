/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./backend/market/templates/*.html",
  ],
  theme: {
    extend: {
      scrollBehaviour: {
        smooth: 'smooth',
      },
      fontFamily: {
        lobster: ['Lobster', 'cursive'],
        pacifico: ['Pacifico', 'cursive'],
        raleway: ['Raleway', 'sans-serif'],
        header: ['Montserrat', 'serif'],
        body: ['Montserrat', 'sans-serif'],
        cta: ['Raleway', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in forwards',
      },
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        html: { scrollBehaviour: 'smooth' },
      });
    },
  ],
};
