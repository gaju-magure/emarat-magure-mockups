/**
 * LanguageToggle Component
 * Button to toggle between English and Arabic
 */

import { Languages } from 'lucide-react';
import { useLanguage } from '@/core/hooks/useLanguage';

export function LanguageToggle() {
  const { language, toggle, t } = useLanguage();

  return (
    <button
      onClick={toggle}
      className="
        relative inline-flex items-center justify-center gap-1.5
        h-10 px-3 rounded-lg
        glass-light border border-glow
        text-text-primary
        hover:shadow-glow-sm hover:scale-105
        active:scale-95
        transition-all duration-300
        font-medium text-sm
      "
      aria-label={t('language.toggle')}
    >
      <Languages className="h-4 w-4 text-text-primary" />
      <span className="uppercase">{language === 'en' ? 'AR' : 'EN'}</span>
    </button>
  );
}
