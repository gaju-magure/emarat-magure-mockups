/**
 * Core Type Definitions
 */

export type ThemeMode = 'light' | 'dark';

export type Language = 'en' | 'ar';

export interface ThemeContextType {
  mode: ThemeMode;
  toggle: () => void;
  setMode: (mode: ThemeMode) => void;
}

export interface LanguageContextType {
  language: Language;
  toggle: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}
