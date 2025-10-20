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
      className="btn-icon"
      aria-label={t('theme.toggle')}
      title={mode === 'dark' ? t('theme.light') : t('theme.dark')}
    >
      {mode === 'dark' ? (
        <Sun className="h-5 w-5 text-text-primary" />
      ) : (
        <Moon className="h-5 w-5 text-text-primary" />
      )}
    </button>
  );
}
