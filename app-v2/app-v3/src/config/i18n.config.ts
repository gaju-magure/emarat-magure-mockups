/**
 * i18n Configuration
 * Setup for react-i18next with English and Arabic support
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import brandConfig from './brand.config';

// Import translations
import en from '../locales/en.json';
import ar from '../locales/ar.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    lng: brandConfig.defaults.language,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
