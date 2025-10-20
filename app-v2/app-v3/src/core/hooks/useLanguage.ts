/**
 * useLanguage Hook
 * Access language context with type safety
 */

import { useContext } from 'react';
import { LanguageContext } from '../providers/LanguageProvider';

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  return context;
}
