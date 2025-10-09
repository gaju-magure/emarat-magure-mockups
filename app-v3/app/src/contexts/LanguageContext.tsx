/**
 * LanguageContext
 *
 * Manages language switching (English/Arabic)
 * Handles RTL/LTR layout direction
 * Provides translation function
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, type Language } from '@/locales';
import type { TranslationKeys } from '@/locales/en';

interface LanguageContextType {
  /** Current language */
  language: Language;
  /** Change language */
  setLanguage: (lang: Language) => void;
  /** Translation function */
  t: (key: string) => string;
  /** Current text direction */
  direction: 'ltr' | 'rtl';
  /** Is current language RTL */
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'emarat-language';

interface LanguageProviderProps {
  children: ReactNode;
  /** Default language if not in localStorage */
  defaultLanguage?: Language;
}

/**
 * Get stored language from localStorage
 */
function getStoredLanguage(): Language | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored === 'en' || stored === 'ar') {
      return stored;
    }
  } catch (error) {
    console.warn('Failed to read language from localStorage:', error);
  }
  return null;
}

/**
 * Store language to localStorage
 */
function storeLanguage(language: Language): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch (error) {
    console.warn('Failed to save language to localStorage:', error);
  }
}

/**
 * Get text direction for language
 */
function getDirection(language: Language): 'ltr' | 'rtl' {
  return language === 'ar' ? 'rtl' : 'ltr';
}

/**
 * Apply direction to document
 */
function applyDirection(language: Language): void {
  if (typeof document === 'undefined') return;

  const direction = getDirection(language);
  const root = document.documentElement;

  // Set dir attribute
  root.setAttribute('dir', direction);

  // Set lang attribute
  root.setAttribute('lang', language);

  // Update font family for Arabic
  if (language === 'ar') {
    root.style.fontFamily = 'var(--font-family-arabic, TheSansArabic, sans-serif)';
  } else {
    root.style.fontFamily = 'var(--font-family, Karbon, sans-serif)';
  }
}

/**
 * Get nested translation value
 * Supports dot notation: "common.welcome", "jarvis.greeting.morning"
 */
function getNestedValue(obj: any, path: string): string {
  const keys = path.split('.');
  let current = obj;

  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return path; // Return key as fallback if path not found
    }
  }

  return typeof current === 'string' ? current : path;
}

/**
 * LanguageProvider Component
 *
 * Wraps the app to provide language management
 * Automatically syncs with localStorage and applies RTL/LTR
 */
export function LanguageProvider({ children, defaultLanguage = 'en' }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => {
    return getStoredLanguage() || defaultLanguage;
  });

  // Apply direction when language changes
  useEffect(() => {
    applyDirection(language);
  }, [language]);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    storeLanguage(newLanguage);
  };

  const t = (key: string, replacements?: Record<string, string | number>): string => {
    let translation = getNestedValue(translations[language], key);

    // Handle replacements (e.g., "{{count}} minutes ago")
    if (replacements) {
      Object.entries(replacements).forEach(([placeholder, value]) => {
        translation = translation.replace(`{{${placeholder}}}`, String(value));
      });
    }

    return translation;
  };

  const direction = getDirection(language);
  const isRTL = direction === 'rtl';

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    direction,
    isRTL,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

/**
 * useLanguage Hook
 *
 * Access language state and translation function in any component
 *
 * @example
 * ```tsx
 * const { language, setLanguage, t, direction, isRTL } = useLanguage();
 *
 * // Translate text
 * <h1>{t('common.welcome')}</h1>
 * <p>{t('jarvis.greeting.morning')}</p>
 *
 * // With replacements
 * <p>{t('time.minutesAgo', { count: 5 })}</p>
 *
 * // Switch language
 * <button onClick={() => setLanguage('ar')}>العربية</button>
 * <button onClick={() => setLanguage('en')}>English</button>
 *
 * // RTL-aware styling
 * <div className={isRTL ? 'text-right' : 'text-left'}>
 *   {t('common.welcome')}
 * </div>
 * ```
 */
export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Named exports for convenience
LanguageProvider.displayName = 'LanguageProvider';
