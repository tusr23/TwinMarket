/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: 'var(--bg-deep)',
          900: 'var(--bg-base)',
          850: 'var(--bg-card)',
          800: 'var(--border-subtle)',
          750: 'var(--border-hover)',
          700: 'var(--border-card)',
          600: '#334466',
        },
        brand: {
          50: 'rgb(var(--color-brand-50) / <alpha-value>)',
          100: 'rgb(var(--color-brand-100) / <alpha-value>)',
          200: 'rgb(var(--color-brand-200) / <alpha-value>)',
          300: 'rgb(var(--color-brand-300) / <alpha-value>)',
          400: 'rgb(var(--color-brand-400) / <alpha-value>)',
          500: 'rgb(var(--color-brand-500) / <alpha-value>)',
          600: 'rgb(var(--color-brand-600) / <alpha-value>)',
          700: 'rgb(var(--color-brand-700) / <alpha-value>)',
        },
        cyanAccent: {
          400: 'rgb(var(--color-accent-400) / <alpha-value>)',
          500: 'rgb(var(--color-accent-500) / <alpha-value>)',
        },
        emeraldAccent: {
          400: 'rgb(var(--color-emerald-400) / <alpha-value>)',
          500: 'rgb(var(--color-emerald-500) / <alpha-value>)',
        }
      },
      boxShadow: {
        'neu-raised': '7px 7px 16px var(--neu-shadow-dark), -5px -5px 14px var(--neu-shadow-light)',
        'neu-raised-sm': '4px 4px 10px var(--neu-shadow-dark), -3px -3px 8px var(--neu-shadow-light)',
        'neu-raised-lg': '12px 12px 28px var(--neu-shadow-dark), -8px -8px 22px var(--neu-shadow-light)',
        'neu-inset': 'inset 4px 4px 9px var(--neu-shadow-dark), inset -3px -3px 7px var(--neu-shadow-light)',
        'neu-inset-sm': 'inset 2px 2px 6px var(--neu-shadow-dark), inset -2px -2px 5px var(--neu-shadow-light)',
        'neu-button': '5px 5px 12px var(--neu-shadow-dark), -4px -4px 10px var(--neu-shadow-light)',
        'neu-button-pressed': 'inset 3px 3px 6px var(--neu-shadow-dark), inset -3px -3px 6px var(--neu-shadow-light)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(var(--color-brand-500), 0.3)' },
          '100%': { boxShadow: '0 0 25px rgba(var(--color-accent-500), 0.5)' },
        }
      }
    },
  },
  plugins: [],
}
