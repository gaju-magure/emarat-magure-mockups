/**
 * LanguageToggle Component
 *
 * Toggle between English and Arabic languages
 * Automatically switches text direction (LTR/RTL)
 */

import { cn } from '@/utils/classnames';
import { useLanguage, type Language } from '@/contexts/LanguageContext';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

export interface LanguageToggleProps {
  /** Show label */
  showLabel?: boolean;
  /** Variant */
  variant?: 'icon' | 'button' | 'dropdown';
  /** Additional className */
  className?: string;
}

/**
 * LanguageToggle Component
 *
 * @example
 * ```tsx
 * // Icon only
 * <LanguageToggle />
 *
 * // With label
 * <LanguageToggle showLabel />
 *
 * // Button style
 * <LanguageToggle variant="button" showLabel />
 *
 * // Dropdown style (for settings)
 * <LanguageToggle variant="dropdown" />
 * ```
 */
export function LanguageToggle({
  showLabel = false,
  variant = 'icon',
  className,
}: LanguageToggleProps) {
  const { language, setLanguage, t } = useLanguage();

  const languages: { value: Language; label: string; flag: string }[] = [
    { value: 'en', label: 'English', flag: '🇬🇧' },
    { value: 'ar', label: 'العربية', flag: '🇦🇪' },
  ];

  const currentLanguage = languages.find((l) => l.value === language) || languages[0];
  const otherLanguage = languages.find((l) => l.value !== language) || languages[1];

  const handleToggle = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  if (variant === 'dropdown') {
    return (
      <div className={cn('flex flex-col gap-1', className)}>
        <label className="text-xs font-medium text-text-secondary mb-1">
          {t('common.language') || 'Language'}
        </label>
        <div className="flex gap-2">
          {languages.map((lang) => {
            const isActive = language === lang.value;

            return (
              <button
                key={lang.value}
                onClick={() => setLanguage(lang.value)}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-lg',
                  'border transition-all',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  isActive
                    ? 'bg-primary text-white border-primary'
                    : 'bg-background-secondary text-text-secondary border-border-default hover:bg-background-tertiary hover:border-border-hover'
                )}
                aria-label={lang.label}
                aria-pressed={isActive}
              >
                <span className="text-xl" role="img" aria-hidden="true">
                  {lang.flag}
                </span>
                <span className="text-sm font-medium">{lang.label}</span>
              </button>
            );
          })}
        </div>
        <p className="text-xs text-text-tertiary mt-1">
          {language === 'ar'
            ? 'سيتم تبديل اتجاه التخطيط تلقائيًا'
            : 'Layout direction will switch automatically'}
        </p>
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
        aria-label={`${t('common.language') || 'Language'}: ${currentLanguage.label}`}
      >
        <span className="text-lg" role="img" aria-hidden="true">
          {currentLanguage.flag}
        </span>
        {showLabel && (
          <span className="text-sm font-medium">{currentLanguage.label}</span>
        )}
      </button>
    );
  }

  // Icon variant (default)
  return (
    <button
      onClick={handleToggle}
      className={cn(
        'group relative p-2 rounded-lg',
        'text-text-secondary hover:text-text-primary',
        'hover:bg-background-secondary',
        'transition-colors',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
      aria-label={`${t('common.language') || 'Language'}: ${currentLanguage.label}. Click to switch to ${otherLanguage.label}`}
      title={`Switch to ${otherLanguage.label}`}
    >
      {/* Globe icon with language indicator */}
      <div className="relative">
        <GlobeAltIcon className="w-6 h-6" />

        {/* Language badge */}
        <span
          className={cn(
            'absolute -bottom-0.5 -end-0.5',
            'flex items-center justify-center',
            'w-3.5 h-3.5',
            'bg-primary text-white',
            'text-[9px] font-bold uppercase',
            'rounded-full',
            'ring-2 ring-background-primary',
            'transition-transform group-hover:scale-110'
          )}
        >
          {language}
        </span>
      </div>

      {showLabel && (
        <span className="ms-2 text-sm font-medium">{currentLanguage.label}</span>
      )}
    </button>
  );
}

LanguageToggle.displayName = 'LanguageToggle';
