# B2E Platform - Theme System & Customization

**Project:** Emarat AI Solution - B2E Platform
**Features:** Dark/Light Mode Toggle, Full Theme Customization, RTL Support
**Last Updated:** October 2025

---

## Table of Contents

1. [Overview](#overview)
2. [Theme Architecture](#theme-architecture)
3. [Color System (Light & Dark)](#color-system-light--dark)
4. [Tailwind Configuration](#tailwind-configuration)
5. [Theme Context Implementation](#theme-context-implementation)
6. [Theme Toggle Component](#theme-toggle-component)
7. [RTL Support](#rtl-support)
8. [Usage Examples](#usage-examples)
9. [Best Practices](#best-practices)

---

## Overview

### Theme Features
- ✅ **Light Mode** (Default)
- ✅ **Dark Mode** (Toggle)
- ✅ **System Preference Detection** (Auto-detect OS theme)
- ✅ **Persistent Preferences** (LocalStorage)
- ✅ **Smooth Transitions** (No flash of unstyled content)
- ✅ **RTL Support** (Arabic language)
- ✅ **Full Customization** (Theme tokens)

### Tech Stack
- **Tailwind CSS** - `dark:` variant for dark mode
- **React Context API** - Theme state management
- **LocalStorage** - Persist user preference
- **CSS Variables** - Dynamic theme tokens

---

## Theme Architecture

### Theme Layers

```
┌─────────────────────────────────────────┐
│   User Preference (Light/Dark/System)   │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│        Theme Context (React)            │
│  - Current theme state                  │
│  - Toggle function                      │
│  - System preference detection          │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│      Tailwind CSS (dark: variant)       │
│  - Light mode: default classes          │
│  - Dark mode: dark:bg-gray-900          │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│         CSS Variables (Tokens)          │
│  --color-primary: light/dark values     │
└─────────────────────────────────────────┘
```

---

## Color System (Light & Dark)

### Primary Colors (Both Modes)

#### Light Mode (Default)
```js
colors: {
  primary: {
    50: '#e3f2fd',   // Lightest
    100: '#bbdefb',
    200: '#90caf9',
    300: '#64b5f6',
    400: '#42a5f5',
    500: '#1e87f0',  // DEFAULT (Emarat Primary Blue)
    600: '#1976d2',
    700: '#1565c0',
    800: '#004290',  // Emarat Dark Blue
    900: '#0d47a1',  // Darkest
  },

  brand: {
    green: '#47a01a',  // Emarat Logo Green
    blue: '#003a85',   // Emarat Logo Blue
  }
}
```

#### Dark Mode (Inverted/Adjusted)
```js
// Dark mode uses same hues but adjusted for dark backgrounds
colors: {
  primary: {
    // In dark mode, lighter shades become dominant
    DEFAULT: '#42a5f5',  // Lighter blue (more visible on dark)
    dark: '#1e87f0',     // Still accessible
    light: '#90caf9',    // Even lighter for emphasis
  },

  brand: {
    green: '#5bc226',    // Slightly brighter green for dark
    blue: '#1e5ba8',     // Lighter blue for visibility
  }
}
```

---

### Background Colors

#### Light Mode
```js
background: {
  primary: '#ffffff',      // Main background (white)
  secondary: '#f8f8f8',    // Secondary sections (light gray)
  tertiary: '#e5e5e5',     // Cards, panels
  elevated: '#ffffff',     // Elevated cards (white with shadow)
}
```

#### Dark Mode
```js
background: {
  primary: '#0a0a0a',      // Main background (near black)
  secondary: '#1a1a1a',    // Secondary sections (dark gray)
  tertiary: '#2a2a2a',     // Cards, panels
  elevated: '#1f1f1f',     // Elevated cards (slightly lighter)
}
```

---

### Text Colors

#### Light Mode
```js
text: {
  primary: '#333333',      // Headings, important text
  secondary: '#464e4c',    // Body text
  tertiary: '#999999',     // Muted text, captions
  disabled: '#cccccc',     // Disabled state
  inverse: '#ffffff',      // Text on dark backgrounds
}
```

#### Dark Mode
```js
text: {
  primary: '#f5f5f5',      // Headings (light gray, not pure white)
  secondary: '#e0e0e0',    // Body text
  tertiary: '#a0a0a0',     // Muted text
  disabled: '#666666',     // Disabled state
  inverse: '#1a1a1a',      // Text on light backgrounds
}
```

---

### Border Colors

#### Light Mode
```js
border: {
  DEFAULT: '#e5e5e5',      // Default borders
  light: '#f0f0f0',        // Subtle borders
  dark: '#cccccc',         // Emphasized borders
  focus: '#1e87f0',        // Focus state (primary blue)
}
```

#### Dark Mode
```js
border: {
  DEFAULT: '#333333',      // Default borders
  light: '#2a2a2a',        // Subtle borders
  dark: '#444444',         // Emphasized borders
  focus: '#42a5f5',        // Focus state (lighter blue)
}
```

---

### Semantic Colors (Adjusted for Dark)

#### Light Mode
```js
semantic: {
  success: {
    DEFAULT: '#32d296',
    bg: '#e8f9f3',         // Light background
    border: '#32d296',
    text: '#0d7a4f',
  },
  warning: {
    DEFAULT: '#faa05a',
    bg: '#fff4ec',
    border: '#faa05a',
    text: '#b86e2d',
  },
  danger: {
    DEFAULT: '#f0506e',
    bg: '#ffebef',
    border: '#f0506e',
    text: '#c42648',
  },
  info: {
    DEFAULT: '#1e87f0',
    bg: '#e3f2fd',
    border: '#1e87f0',
    text: '#004290',
  }
}
```

#### Dark Mode
```js
semantic: {
  success: {
    DEFAULT: '#4ade80',    // Lighter green
    bg: '#1a3327',         // Dark green background
    border: '#4ade80',
    text: '#86efac',       // Light green text
  },
  warning: {
    DEFAULT: '#fbbf24',    // Lighter orange
    bg: '#332610',         // Dark orange background
    border: '#fbbf24',
    text: '#fcd34d',       // Light orange text
  },
  danger: {
    DEFAULT: '#f87171',    // Lighter red
    bg: '#331a1a',         // Dark red background
    border: '#f87171',
    text: '#fca5a5',       // Light red text
  },
  info: {
    DEFAULT: '#60a5fa',    // Lighter blue
    bg: '#1a2844',         // Dark blue background
    border: '#60a5fa',
    text: '#93c5fd',       // Light blue text
  }
}
```

---

## Tailwind Configuration

### `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // Enable dark mode with 'class' strategy
  darkMode: 'class', // Uses .dark class on <html> element

  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      colors: {
        // Primary Colors (Emarat Brand)
        primary: {
          50: '#e3f2fd',
          100: '#bbdefb',
          200: '#90caf9',
          300: '#64b5f6',
          400: '#42a5f5',
          500: '#1e87f0',  // DEFAULT
          600: '#1976d2',
          700: '#1565c0',
          800: '#004290',  // Emarat Dark Blue
          900: '#0d47a1',
        },

        // Brand Colors
        brand: {
          green: {
            DEFAULT: '#47a01a',
            dark: '#5bc226',  // For dark mode
          },
          blue: {
            DEFAULT: '#003a85',
            dark: '#1e5ba8',  // For dark mode
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

        // Semantic Colors
        success: {
          DEFAULT: '#32d296',
          bg: 'var(--color-success-bg)',
          border: 'var(--color-success-border)',
          text: 'var(--color-success-text)',
          dark: '#4ade80',  // Dark mode variant
        },
        warning: {
          DEFAULT: '#faa05a',
          bg: 'var(--color-warning-bg)',
          border: 'var(--color-warning-border)',
          text: 'var(--color-warning-text)',
          dark: '#fbbf24',
        },
        danger: {
          DEFAULT: '#f0506e',
          bg: 'var(--color-danger-bg)',
          border: 'var(--color-danger-border)',
          text: 'var(--color-danger-text)',
          dark: '#f87171',
        },
        info: {
          DEFAULT: '#1e87f0',
          bg: 'var(--color-info-bg)',
          border: 'var(--color-info-border)',
          text: 'var(--color-info-text)',
          dark: '#60a5fa',
        },
      },

      fontFamily: {
        sans: ['Inter', 'Karbon', 'Arial', 'sans-serif'],
        arabic: ['TheSansArabic', 'Arial', 'sans-serif'],
        mono: ['Consolas', 'monaco', 'monospace'],
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
```

---

### CSS Variables (Global Styles)

**`src/styles/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* CSS Variables for Theme Switching */
:root {
  /* Light Mode (Default) */
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #f8f8f8;
  --color-bg-tertiary: #e5e5e5;
  --color-bg-elevated: #ffffff;

  --color-text-primary: #333333;
  --color-text-secondary: #464e4c;
  --color-text-tertiary: #999999;
  --color-text-disabled: #cccccc;
  --color-text-inverse: #ffffff;

  --color-border-default: #e5e5e5;
  --color-border-light: #f0f0f0;
  --color-border-dark: #cccccc;
  --color-border-focus: #1e87f0;

  --color-success-bg: #e8f9f3;
  --color-success-border: #32d296;
  --color-success-text: #0d7a4f;

  --color-warning-bg: #fff4ec;
  --color-warning-border: #faa05a;
  --color-warning-text: #b86e2d;

  --color-danger-bg: #ffebef;
  --color-danger-border: #f0506e;
  --color-danger-text: #c42648;

  --color-info-bg: #e3f2fd;
  --color-info-border: #1e87f0;
  --color-info-text: #004290;
}

/* Dark Mode */
.dark {
  --color-bg-primary: #0a0a0a;
  --color-bg-secondary: #1a1a1a;
  --color-bg-tertiary: #2a2a2a;
  --color-bg-elevated: #1f1f1f;

  --color-text-primary: #f5f5f5;
  --color-text-secondary: #e0e0e0;
  --color-text-tertiary: #a0a0a0;
  --color-text-disabled: #666666;
  --color-text-inverse: #1a1a1a;

  --color-border-default: #333333;
  --color-border-light: #2a2a2a;
  --color-border-dark: #444444;
  --color-border-focus: #42a5f5;

  --color-success-bg: #1a3327;
  --color-success-border: #4ade80;
  --color-success-text: #86efac;

  --color-warning-bg: #332610;
  --color-warning-border: #fbbf24;
  --color-warning-text: #fcd34d;

  --color-danger-bg: #331a1a;
  --color-danger-border: #f87171;
  --color-danger-text: #fca5a5;

  --color-info-bg: #1a2844;
  --color-info-border: #60a5fa;
  --color-info-text: #93c5fd;
}

/* Smooth theme transitions */
* {
  @apply transition-theme duration-theme;
}

/* Prevent transition on page load */
.preload * {
  transition: none !important;
}

/* Scrollbar styles (dark mode) */
.dark::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.dark::-webkit-scrollbar-track {
  background: #1a1a1a;
}

.dark::-webkit-scrollbar-thumb {
  background: #333333;
  border-radius: 4px;
}

.dark::-webkit-scrollbar-thumb:hover {
  background: #444444;
}
```

---

## Theme Context Implementation

### `src/contexts/ThemeContext.tsx`

```tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Get saved theme from localStorage or default to 'system'
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('emarat-theme') as Theme;
      return savedTheme || 'system';
    }
    return 'system';
  });

  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light');

  // Detect system preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        setResolvedTheme(e.matches ? 'dark' : 'light');
      }
    };

    // Set initial resolved theme
    if (theme === 'system') {
      setResolvedTheme(mediaQuery.matches ? 'dark' : 'light');
    } else {
      setResolvedTheme(theme);
    }

    // Listen for system theme changes
    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [theme]);

  // Apply theme to document
  useEffect(() => {
    const root = window.document.documentElement;

    // Remove preload class to enable transitions
    root.classList.remove('preload');

    // Remove both classes first
    root.classList.remove('light', 'dark');

    // Add the resolved theme class
    root.classList.add(resolvedTheme);

    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        resolvedTheme === 'dark' ? '#0a0a0a' : '#ffffff'
      );
    }
  }, [resolvedTheme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('emarat-theme', newTheme);

    if (newTheme !== 'system') {
      setResolvedTheme(newTheme);
    }
  };

  const toggleTheme = () => {
    if (theme === 'system') {
      // If on system, toggle to opposite of current resolved theme
      setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    } else {
      // If on manual theme, toggle to opposite
      setTheme(theme === 'dark' ? 'light' : 'dark');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

---

### `src/App.tsx` (Setup)

```tsx
import { ThemeProvider } from './contexts/ThemeContext';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background-primary text-text-primary">
        <Dashboard />
      </div>
    </ThemeProvider>
  );
}

export default App;
```

---

## Theme Toggle Component

### `src/components/molecules/ThemeToggle.tsx`

```tsx
import { useTheme } from '@/contexts/ThemeContext';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2 p-1 bg-background-secondary rounded-lg">
      <button
        onClick={() => setTheme('light')}
        className={`
          p-2 rounded-md transition-colors
          ${theme === 'light'
            ? 'bg-primary text-white'
            : 'text-text-tertiary hover:text-text-primary hover:bg-background-tertiary'
          }
        `}
        aria-label="Light mode"
      >
        <SunIcon className="w-5 h-5" />
      </button>

      <button
        onClick={() => setTheme('dark')}
        className={`
          p-2 rounded-md transition-colors
          ${theme === 'dark'
            ? 'bg-primary text-white'
            : 'text-text-tertiary hover:text-text-primary hover:bg-background-tertiary'
          }
        `}
        aria-label="Dark mode"
      >
        <MoonIcon className="w-5 h-5" />
      </button>

      <button
        onClick={() => setTheme('system')}
        className={`
          p-2 rounded-md transition-colors
          ${theme === 'system'
            ? 'bg-primary text-white'
            : 'text-text-tertiary hover:text-text-primary hover:bg-background-tertiary'
          }
        `}
        aria-label="System preference"
      >
        <ComputerDesktopIcon className="w-5 h-5" />
      </button>
    </div>
  );
}
```

---

### Simple Toggle (Mobile-Friendly)

```tsx
import { useTheme } from '@/contexts/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

export function SimpleThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="
        p-2.5 rounded-lg
        bg-background-secondary
        hover:bg-background-tertiary
        transition-colors
      "
      aria-label="Toggle theme"
    >
      {resolvedTheme === 'dark' ? (
        <SunIcon className="w-6 h-6 text-warning" />
      ) : (
        <MoonIcon className="w-6 h-6 text-primary" />
      )}
    </button>
  );
}
```

---

## RTL Support

### Language Context

**`src/contexts/LanguageContext.tsx`**

```tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

type Language = 'en' | 'ar';
type Direction = 'ltr' | 'rtl';

interface LanguageContextType {
  language: Language;
  direction: Direction;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string; // Translation function
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('emarat-language') as Language;
    return saved || 'en';
  });

  const direction: Direction = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    // Apply direction to document
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [direction, language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('emarat-language', lang);
  };

  // Simple translation function (replace with i18n library in production)
  const t = (key: string) => {
    // TODO: Implement proper translation
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
```

---

### RTL-Aware Styles

```css
/* RTL-specific utilities */
@layer utilities {
  /* Margins */
  .ms-4 {
    margin-inline-start: 1rem;
  }

  .me-4 {
    margin-inline-end: 1rem;
  }

  /* Padding */
  .ps-4 {
    padding-inline-start: 1rem;
  }

  .pe-4 {
    padding-inline-end: 1rem;
  }

  /* Text alignment */
  .text-start {
    text-align: start;
  }

  .text-end {
    text-align: end;
  }
}
```

---

## Usage Examples

### Example 1: Dashboard Card (Light/Dark)

```tsx
function DashboardCard({ title, value, icon: Icon }) {
  return (
    <div className="
      bg-background-elevated
      dark:bg-background-secondary
      border border-border-default
      rounded-lg p-6
      shadow-sm dark:shadow-lg
      hover:shadow-md dark:hover:shadow-xl
      transition-all
    ">
      <div className="flex items-center gap-4">
        <div className="
          p-3 rounded-lg
          bg-primary/10 dark:bg-primary/20
        ">
          <Icon className="w-6 h-6 text-primary dark:text-primary-400" />
        </div>

        <div>
          <h3 className="text-sm text-text-tertiary dark:text-text-secondary">
            {title}
          </h3>
          <p className="text-2xl font-bold text-text-primary mt-1">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
```

---

### Example 2: Button (Themed)

```tsx
function PrimaryButton({ children, ...props }) {
  return (
    <button
      className="
        px-6 h-11
        bg-primary hover:bg-primary-600
        dark:bg-primary-400 dark:hover:bg-primary-500
        text-white
        rounded-lg font-medium
        transition-colors
        active:scale-95
      "
      {...props}
    >
      {children}
    </button>
  );
}
```

---

### Example 3: Alert (Semantic Colors)

```tsx
function Alert({ type, message }) {
  const styles = {
    success: 'bg-success-bg border-success-border text-success-text',
    warning: 'bg-warning-bg border-warning-border text-warning-text',
    danger: 'bg-danger-bg border-danger-border text-danger-text',
    info: 'bg-info-bg border-info-border text-info-text',
  };

  return (
    <div className={`
      p-4 rounded-lg border-l-4
      ${styles[type]}
    `}>
      {message}
    </div>
  );
}
```

---

## Best Practices

### 1. Always Use Theme-Aware Classes
```tsx
// ✅ GOOD - Theme-aware
<div className="bg-background-primary text-text-primary">

// ❌ BAD - Hardcoded colors
<div className="bg-white text-black">
```

---

### 2. Use `dark:` Variant for Exceptions
```tsx
// When CSS variables aren't enough, use dark: variant
<div className="
  bg-white dark:bg-gray-900
  shadow-md dark:shadow-2xl
">
```

---

### 3. Test in Both Modes
- Always preview components in both light and dark mode
- Check contrast ratios (WCAG AA: 4.5:1 for text)
- Verify interactive states (hover, focus, active)

---

### 4. Avoid Pure Black/White in Dark Mode
```tsx
// ✅ GOOD - Softer dark background
dark:bg-gray-900  // #0a0a0a

// ❌ BAD - Pure black (harsh on eyes)
dark:bg-black     // #000000
```

---

### 5. Persist User Preference
```tsx
// Always save theme choice
localStorage.setItem('emarat-theme', theme);

// Load on mount
const savedTheme = localStorage.getItem('emarat-theme');
```

---

### 6. Smooth Transitions
```css
/* Add to all elements */
* {
  @apply transition-theme duration-theme;
}
```

---

### 7. Accessibility
- Ensure sufficient contrast in both modes
- Provide theme toggle in accessible location
- Support system preference (`prefers-color-scheme`)
- Use semantic HTML

---

## Implementation Checklist

### Setup
- [ ] Install Tailwind CSS + plugins
- [ ] Configure `tailwind.config.js` with dark mode
- [ ] Create CSS variables in `globals.css`
- [ ] Implement `ThemeContext.tsx`
- [ ] Implement `LanguageContext.tsx` (RTL)
- [ ] Wrap App in providers

### Components
- [ ] Create `ThemeToggle` component
- [ ] Create `LanguageToggle` component
- [ ] Test theme switching
- [ ] Test RTL layout

### Testing
- [ ] Test all components in light mode
- [ ] Test all components in dark mode
- [ ] Test system preference detection
- [ ] Test theme persistence (reload page)
- [ ] Test RTL layout for Arabic
- [ ] Test on mobile devices
- [ ] Verify WCAG contrast ratios

---

*Theme System Documentation - Emarat B2E Platform*
*Last Updated: October 2025*
