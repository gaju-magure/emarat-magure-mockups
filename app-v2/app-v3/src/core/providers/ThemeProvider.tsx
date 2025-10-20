/**
 * ThemeProvider
 * Manages light/dark theme state with localStorage persistence
 */

import { createContext, useEffect, useState, type ReactNode } from 'react';
import type { ThemeMode, ThemeContextType } from '../types';
import brandConfig from '@/config/brand.config';

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'emarat-theme';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(() => {
    // Check localStorage first, then fall back to brand default
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    return brandConfig.defaults.theme;
  });

  useEffect(() => {
    const root = document.documentElement;

    // Remove both classes first
    root.classList.remove('light', 'dark');

    // Add current mode class
    root.classList.add(mode);

    // Persist to localStorage
    localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const toggle = () => {
    setMode(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const value: ThemeContextType = {
    mode,
    toggle,
    setMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
