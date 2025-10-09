/**
 * ThemeToggle Component
 *
 * Toggle between light, dark, and system theme modes
 * Shows current theme icon with smooth transitions
 */

import React from 'react';
import { cn } from '@/utils/classnames';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
} from '@heroicons/react/24/outline';
import type { Theme } from '@/contexts/ThemeContext';

export interface ThemeToggleProps {
  /** Show label */
  showLabel?: boolean;
  /** Variant */
  variant?: 'icon' | 'button' | 'dropdown';
  /** Additional className */
  className?: string;
}

/**
 * ThemeToggle Component
 *
 * @example
 * ```tsx
 * // Icon only
 * <ThemeToggle />
 *
 * // With label
 * <ThemeToggle showLabel />
 *
 * // Button style
 * <ThemeToggle variant="button" showLabel />
 * ```
 */
export function ThemeToggle({
  showLabel = false,
  variant = 'icon',
  className,
}: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { t } = useLanguage();

  const themes: { value: Theme; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { value: 'light', label: t('common.lightMode') || 'Light', icon: SunIcon },
    { value: 'dark', label: t('common.darkMode') || 'Dark', icon: MoonIcon },
    { value: 'system', label: t('common.systemMode') || 'System', icon: ComputerDesktopIcon },
  ];

  const currentTheme = themes.find((t) => t.value === theme) || themes[0];
  const CurrentIcon = currentTheme.icon;

  // Cycle through themes
  const handleToggle = () => {
    const currentIndex = themes.findIndex((t) => t.value === theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex].value);
  };

  if (variant === 'dropdown') {
    return (
      <div className={cn('flex flex-col gap-1', className)}>
        <label className="text-xs font-medium text-text-secondary mb-1">
          {t('common.theme') || 'Theme'}
        </label>
        <div className="flex gap-2">
          {themes.map((themeOption) => {
            const Icon = themeOption.icon;
            const isActive = theme === themeOption.value;

            return (
              <button
                key={themeOption.value}
                onClick={() => setTheme(themeOption.value)}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-lg',
                  'border transition-all',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  isActive
                    ? 'bg-primary text-white border-primary'
                    : 'bg-background-secondary text-text-secondary border-border-default hover:bg-background-tertiary hover:border-border-hover'
                )}
                aria-label={themeOption.label}
                aria-pressed={isActive}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{themeOption.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (variant === 'button') {
    return (
      <button
        onClick={handleToggle}
        className={cn(
          'flex items-center gap-2 px-4 h-10 rounded-lg',
          'bg-background-secondary text-text-primary',
          'border border-border-default',
          'hover:bg-background-tertiary hover:border-border-hover',
          'transition-all',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          className
        )}
        aria-label={`${t('common.theme') || 'Theme'}: ${currentTheme.label}`}
      >
        <CurrentIcon className="w-5 h-5" />
        {showLabel && <span className="text-sm font-medium">{currentTheme.label}</span>}
      </button>
    );
  }

  // Icon variant (default)
  return (
    <button
      onClick={handleToggle}
      className={cn(
        'relative p-2 rounded-lg',
        'text-text-secondary hover:text-text-primary',
        'hover:bg-background-secondary',
        'transition-colors',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
      aria-label={`${t('common.theme') || 'Theme'}: ${currentTheme.label}`}
      title={currentTheme.label}
    >
      {/* Icon with smooth transition */}
      <div className="relative w-6 h-6">
        {/* Sun icon (light mode) */}
        <SunIcon
          className={cn(
            'absolute inset-0 w-6 h-6 transition-all duration-300',
            resolvedTheme === 'light'
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 rotate-90 scale-50'
          )}
        />

        {/* Moon icon (dark mode) */}
        <MoonIcon
          className={cn(
            'absolute inset-0 w-6 h-6 transition-all duration-300',
            resolvedTheme === 'dark'
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 -rotate-90 scale-50'
          )}
        />
      </div>

      {showLabel && (
        <span className="ms-2 text-sm font-medium">{currentTheme.label}</span>
      )}
    </button>
  );
}

ThemeToggle.displayName = 'ThemeToggle';
