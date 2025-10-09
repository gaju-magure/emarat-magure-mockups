/**
 * Localization Index
 * Exports all translations
 */

import { en } from './en';
import { ar } from './ar';

export type Language = 'en' | 'ar';

export const translations = {
  en,
  ar,
} as const;

export { en, ar };
