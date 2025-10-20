/**
 * ThemeToggle Component
 * Button to toggle between light and dark modes
 */

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/core/hooks/useTheme';
import { useTranslation } from 'react-i18next';

export function ThemeToggle() {
  const { mode, toggle } = useTheme();
  const { t } = useTranslation();

  return (
    <button
      onClick={toggle}
      className="
        relative inline-flex items-center justify-center
        h-10 w-10 rounded-md
        bg-background-secondary hover:bg-background-tertiary
        border border-border
        text-text-primary
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-border-focus focus:ring-offset-2
        active:scale-95
      "
      aria-label={t('theme.toggle')}
      title={mode === 'dark' ? t('theme.light') : t('theme.dark')}
    >
      {mode === 'dark' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}
