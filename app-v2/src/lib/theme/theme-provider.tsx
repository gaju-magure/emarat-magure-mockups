/**
 * Theme Provider
 * React context provider for theme management
 */

import React, { createContext, useEffect, useState, useCallback } from 'react';
import type { Theme, ThemeMode, ThemeContextValue, EmaratAIAPI } from './types';
import { ThemeLoader } from './theme-loader';
import { ThemeValidator, ThemeValidationError } from './theme-validator';

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY_THEME = 'emarat-theme';
const STORAGE_KEY_MODE = 'emarat-theme-mode';
const DEFAULT_THEME_URL = '/themes/emarat/theme.json';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultThemeUrl?: string;
  defaultMode?: ThemeMode;
}

export function ThemeProvider({
  children,
  defaultThemeUrl = DEFAULT_THEME_URL,
  defaultMode = 'light',
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme | null>(null);
  const [mode, setModeState] = useState<ThemeMode>(defaultMode);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Theme change callbacks for window API
  const themeChangeCallbacks = React.useRef<Set<(theme: Theme) => void>>(new Set());

  /**
   * Load theme from URL
   */
  const loadTheme = useCallback(async (themeUrl: string) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('Loading theme from:', themeUrl);
      const loadedTheme = await ThemeLoader.loadThemeFromUrl(themeUrl);

      setTheme(loadedTheme);

      // Apply theme to document
      ThemeLoader.applyTheme(loadedTheme, mode);

      // Cache theme in localStorage
      try {
        localStorage.setItem(STORAGE_KEY_THEME, JSON.stringify(loadedTheme));
      } catch (e) {
        console.warn('Failed to cache theme in localStorage:', e);
      }

      // Notify callbacks
      themeChangeCallbacks.current.forEach((callback) => {
        try {
          callback(loadedTheme);
        } catch (e) {
          console.error('Error in theme change callback:', e);
        }
      });

      console.log('Theme loaded successfully:', loadedTheme.name);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load theme';
      console.error('Error loading theme:', err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [mode]);

  /**
   * Set theme data directly (for window API)
   */
  const setThemeData = useCallback(
    (newTheme: Theme) => {
      try {
        // Validate theme
        ThemeValidator.validateAndSanitize(newTheme);

        setTheme(newTheme);
        setError(null);

        // Apply theme to document
        ThemeLoader.applyTheme(newTheme, mode);

        // Cache theme in localStorage
        try {
          localStorage.setItem(STORAGE_KEY_THEME, JSON.stringify(newTheme));
        } catch (e) {
          console.warn('Failed to cache theme in localStorage:', e);
        }

        // Notify callbacks
        themeChangeCallbacks.current.forEach((callback) => {
          try {
            callback(newTheme);
          } catch (e) {
            console.error('Error in theme change callback:', e);
          }
        });

        console.log('Theme set successfully:', newTheme.name);
      } catch (err) {
        const errorMessage = err instanceof ThemeValidationError
          ? err.message
          : 'Invalid theme data';
        console.error('Error setting theme:', err);
        setError(errorMessage);
      }
    },
    [mode]
  );

  /**
   * Set theme mode (light/dark)
   */
  const setMode = useCallback(
    (newMode: ThemeMode) => {
      setModeState(newMode);

      // Apply new mode if theme is loaded
      if (theme) {
        ThemeLoader.applyTheme(theme, newMode);
      }

      // Cache mode preference
      try {
        localStorage.setItem(STORAGE_KEY_MODE, newMode);
      } catch (e) {
        console.warn('Failed to cache mode in localStorage:', e);
      }

      console.log('Theme mode changed to:', newMode);
    },
    [theme]
  );

  /**
   * Initialize theme on mount
   */
  useEffect(() => {
    const initializeTheme = async () => {
      // 1. Check for theme URL in query params
      const urlParams = new URLSearchParams(window.location.search);
      const themeUrlParam = urlParams.get('themeUrl');

      // 2. Try to restore mode from localStorage
      try {
        const savedMode = localStorage.getItem(STORAGE_KEY_MODE) as ThemeMode | null;
        if (savedMode && (savedMode === 'light' || savedMode === 'dark')) {
          setModeState(savedMode);
        }
      } catch (e) {
        console.warn('Failed to restore mode from localStorage:', e);
      }

      // 3. Try to restore cached theme from localStorage
      let cachedTheme: Theme | null = null;
      try {
        const savedTheme = localStorage.getItem(STORAGE_KEY_THEME);
        if (savedTheme) {
          const parsedTheme = JSON.parse(savedTheme);
          if (ThemeValidator.validate(parsedTheme)) {
            cachedTheme = parsedTheme;
          }
        }
      } catch (e) {
        console.warn('Failed to restore theme from localStorage:', e);
      }

      // 4. Load theme
      if (themeUrlParam) {
        // Load from URL parameter
        await loadTheme(themeUrlParam);
      } else if (cachedTheme) {
        // Use cached theme
        console.log('Using cached theme:', cachedTheme.name);
        setTheme(cachedTheme);
        ThemeLoader.applyTheme(cachedTheme, mode);
        setIsLoading(false);
      } else {
        // Load default theme
        await loadTheme(defaultThemeUrl);
      }
    };

    initializeTheme();
  }, []); // Empty deps - only run once on mount

  // Re-apply theme when mode changes
  useEffect(() => {
    if (theme && !isLoading) {
      ThemeLoader.applyTheme(theme, mode);
    }
  }, [mode, theme, isLoading]);

  /**
   * Expose window API for platform integration
   */
  useEffect(() => {
    const api: EmaratAIAPI = {
      setThemeFromUrl: loadTheme,
      setTheme: setThemeData,
      setMode,
      getTheme: () => theme,
      getMode: () => mode,
      onThemeChange: (callback) => {
        themeChangeCallbacks.current.add(callback);
        return () => {
          themeChangeCallbacks.current.delete(callback);
        };
      },
    };

    window.EmaratAI = api;

    console.log('EmaratAI window API initialized');

    // Cleanup
    return () => {
      delete window.EmaratAI;
    };
  }, [theme, mode, loadTheme, setThemeData, setMode]);

  const value: ThemeContextValue = {
    theme,
    mode,
    setMode,
    loadTheme,
    setThemeData,
    isLoading,
    error,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * Hook to use theme context
 */
export function useTheme(): ThemeContextValue {
  const context = React.useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}

export { ThemeContext };
