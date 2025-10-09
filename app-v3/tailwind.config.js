/** @type {import('tailwindcss').Config} */
export default {
  // Enable dark mode with 'class' strategy
  darkMode: 'class',

  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      colors: {
        // Primary Colors (Emarat Brand - exact from logo)
        primary: {
          50: '#e6eef7',
          100: '#ccddef',
          200: '#99bbe0',
          300: '#6699d0',
          400: '#3377c1',
          500: '#003a85',  // DEFAULT - Emarat Blue
          600: '#002e6a',
          700: '#00234f',
          800: '#001735',
          900: '#000c1a',
          DEFAULT: '#003a85',
        },

        // Brand Colors (exact from logo)
        brand: {
          green: {
            DEFAULT: '#47a01a',
            light: '#5bb823',
            dark: '#3a8015',
          },
          blue: {
            DEFAULT: '#003a85',
            light: '#004a9f',
            dark: '#002a6b',
          },
        },

        // Background (uses CSS variables for theme switching)
        background: {
          primary: 'var(--color-bg-primary)',
          secondary: 'var(--color-bg-secondary)',
          tertiary: 'var(--color-bg-tertiary)',
          elevated: 'var(--color-bg-elevated)',
        },

        // Text
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary: 'var(--color-text-tertiary)',
          disabled: 'var(--color-text-disabled)',
          inverse: 'var(--color-text-inverse)',
        },

        // Borders
        border: {
          DEFAULT: 'var(--color-border-default)',
          light: 'var(--color-border-light)',
          dark: 'var(--color-border-dark)',
          focus: 'var(--color-border-focus)',
        },

        // Semantic Colors (exact from Emarat site)
        success: {
          DEFAULT: '#50aa1b',  // Exact Emarat success green
          bg: 'var(--color-success-bg)',
          border: 'var(--color-success-border)',
          text: 'var(--color-success-text)',
          dark: '#5bb823',
        },
        warning: {
          DEFAULT: '#d97706',  // Darker orange
          bg: 'var(--color-warning-bg)',
          border: 'var(--color-warning-border)',
          text: 'var(--color-warning-text)',
          dark: '#f59e0b',
        },
        danger: {
          DEFAULT: '#dc2626',  // Darker red
          bg: 'var(--color-danger-bg)',
          border: 'var(--color-danger-border)',
          text: 'var(--color-danger-text)',
          dark: '#ef4444',
        },
        info: {
          DEFAULT: '#0369a1',  // Darker blue
          bg: 'var(--color-info-bg)',
          border: 'var(--color-info-border)',
          text: 'var(--color-info-text)',
          dark: '#3b82f6',
        },
      },

      fontFamily: {
        sans: ['Karbon', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
        arabic: ['TheSansArabic', 'Arial', 'sans-serif'],
        mono: ['Consolas', 'Monaco', 'Courier New', 'monospace'],
      },

      // Custom border radius (sharper, more minimal like Emarat site)
      borderRadius: {
        'none': '0',
        'sm': '2px',
        DEFAULT: '4px',
        'md': '6px',
        'lg': '8px',
        'xl': '12px',
        '2xl': '16px',
        'full': '9999px',
      },

      // Mobile-first breakpoints
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },

      // Smooth transitions for theme switching
      transitionProperty: {
        'theme': 'background-color, border-color, color, fill, stroke',
      },

      transitionDuration: {
        'theme': '200ms',
      },
    },
  },

  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
