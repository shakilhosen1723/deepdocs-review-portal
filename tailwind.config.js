/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      colors: {
        navy: {
          950: '#080a14',
          900: '#0b0e1b',
          850: '#0e1222',
          800: '#101426', // Premium dark navy top zone
          750: '#151a30',
          700: '#1c223e',
        },
        brandOrange: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa', // Peach notification button
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316', // Vibrant orange
          600: '#ea580c', // Deep orange button gradient
          700: '#c2410c',
          800: '#9a3412', // Dark orange text
          900: '#7c2d12',
        },
        agency: {
          white: '#FFFFFF',
          section: '#F8F9FA',
          divider: '#F1F3F5',
          border: '#E9ECEF',
          subtle: '#DEE2E6',
          dark: '#0F172A',
        },
        violet: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#7C3AED',
          800: '#6D28D9',
          900: '#5B21B6',
          950: '#2E1065',
        },
        obsidian: {
          950: '#050609',
          900: '#07080d',
          850: '#0b0d14',
          800: '#10121a',
          750: '#161924',
          700: '#1d2130',
        },
        studio: {
          bg: '#101426',
          surface: '#151a30',
          border: 'rgba(255, 255, 255, 0.08)',
          card: 'rgba(16, 20, 38, 0.85)',
        }
      },
      borderRadius: {
        '16': '16px',
        'card': '16px',
      },
      boxShadow: {
        'card-soft': '0 4px 20px -2px rgba(0, 0, 0, 0.04), 0 2px 6px -1px rgba(0, 0, 0, 0.02)',
        'card-hover': '0 16px 36px -8px rgba(234, 88, 12, 0.18), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
        'glow-orange': '0 0 25px -3px rgba(249, 115, 22, 0.45)',
        'glow-orange-lg': '0 0 45px -5px rgba(234, 88, 12, 0.55)',
        'btn-orange': '0 4px 18px -2px rgba(234, 88, 12, 0.45), inset 0 1px 0 0 rgba(255, 255, 255, 0.3)',
        'notify-prominent': '0 4px 16px -2px rgba(249, 115, 22, 0.35)',
      },
      animation: {
        'pulse-slow': 'pulse-slow 7s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { opacity: '0.2', transform: 'scale(1)' },
          '50%': { opacity: '0.45', transform: 'scale(1.08)' },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
