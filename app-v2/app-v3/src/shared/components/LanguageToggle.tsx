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
        h-10 px-3 rounded-md
        bg-background-secondary hover:bg-background-tertiary
        border border-border
        text-text-primary
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-border-focus focus:ring-offset-2
        active:scale-95
        font-medium text-sm
      "
      aria-label={t('language.toggle')}
    >
      <Languages className="h-4 w-4" />
      <span className="uppercase">{language === 'en' ? 'AR' : 'EN'}</span>
    </button>
  );
}
