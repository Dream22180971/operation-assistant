/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#e8e8f0',
          100: '#c0c0d0',
          200: '#8888a0',
          300: '#555566',
          400: '#2a2a3a',
          500: '#22222e',
          600: '#1a1a26',
          700: '#12121a',
          800: '#0a0a0f',
          900: '#060609',
        },
        accent: {
          DEFAULT: '#6366f1',
          light: '#818cf8',
          dark: '#4f46e5',
          glow: 'rgba(99, 102, 241, 0.15)',
        },
      },
    },
  },
  plugins: [],
}
