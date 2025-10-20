/**
 * LanguageProvider
 * Manages language state with localStorage persistence and RTL support
 */

import { createContext, useEffect, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import type { Language, LanguageContextType } from '../types';
import brandConfig from '@/config/brand.config';

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'emarat-language';

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const { i18n, t } = useTranslation();

  const [language, setLanguageState] = useState<Language>(() => {
    // Check localStorage first, then fall back to brand default
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'ar') {
      return stored;
    }
    return brandConfig.defaults.language;
  });

  useEffect(() => {
    const root = document.documentElement;

    // Update i18n language
    i18n.changeLanguage(language);

    // Set HTML lang and dir attributes
    root.setAttribute('lang', language);
    root.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');

    // Persist to localStorage
    localStorage.setItem(STORAGE_KEY, language);
  }, [language, i18n]);

  const toggle = () => {
    setLanguageState(prev => prev === 'en' ? 'ar' : 'en');
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const value: LanguageContextType = {
    language,
    toggle,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
