/**
 * Logo Component
 *
 * Displays the client logo based on active client configuration
 * Automatically switches based on theme and client config
 */

import { useClient } from '@/contexts/ClientContext';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/utils/classnames';

export interface LogoProps {
  /** Logo variant */
  variant?: 'default' | 'white';
  /** Logo size */
  size?: 'sm' | 'md' | 'lg';
  /** Additional className */
  className?: string;
  /** Show brand name alongside logo */
  showName?: boolean;
}

/**
 * Logo Component
 *
 * @example
 * ```tsx
 * // Basic logo
 * <Logo />
 *
 * // Different sizes
 * <Logo size="sm" />
 * <Logo size="lg" />
 *
 * // White variant (for dark backgrounds)
 * <Logo variant="white" />
 *
 * // With brand name
 * <Logo showName />
 * ```
 */
export function Logo({
  variant = 'default',
  size = 'md',
  className,
  showName = false,
}: LogoProps) {
  const { client } = useClient();
  const { resolvedTheme } = useTheme();

  // Determine which logo to show
  const logoSrc = (() => {
    // If white variant requested, use white logo if available
    if (variant === 'white' && client.branding.logoDark) {
      return client.branding.logoDark;
    }

    // Auto-switch based on theme if dark logo exists
    if (resolvedTheme === 'dark' && client.branding.logoDark) {
      return client.branding.logoDark;
    }

    // Default logo
    return client.branding.logo;
  })();

  return (
    <div
      className={cn(
        'inline-flex items-center gap-3',
        className
      )}
    >
      {/* Logo image */}
      <img
        src={logoSrc}
        alt={client.branding.name}
        className={cn(
          'object-contain',

          // Size styles
          size === 'sm' && 'h-6',
          size === 'md' && 'h-8',
          size === 'lg' && 'h-10'
        )}
      />

      {/* Brand name */}
      {showName && (
        <span
          className={cn(
            'font-semibold text-text-primary',

            // Size styles
            size === 'sm' && 'text-base',
            size === 'md' && 'text-lg',
            size === 'lg' && 'text-xl'
          )}
        >
          {client.branding.shortName || client.branding.name}
        </span>
      )}
    </div>
  );
}

Logo.displayName = 'Logo';
