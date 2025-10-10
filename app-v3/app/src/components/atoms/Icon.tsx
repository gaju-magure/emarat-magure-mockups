/**
 * Icon Component
 *
 * Wrapper for Heroicons with consistent sizing and theming
 * Makes it easy to use icons throughout the app
 */


import { cn } from '@/utils/classnames';

export interface IconProps {
  /** Heroicon component */
  icon: React.ComponentType<{ className?: string }>;
  /** Icon size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Additional className */
  className?: string;
  /** Aria label for accessibility */
  'aria-label'?: string;
}

/**
 * Icon Component
 *
 * @example
 * ```tsx
 * import { HomeIcon, UserIcon, BellIcon } from '@heroicons/react/24/outline';
 *
 * // Basic usage
 * <Icon icon={HomeIcon} />
 *
 * // Different sizes
 * <Icon icon={UserIcon} size="xs" />
 * <Icon icon={BellIcon} size="xl" />
 *
 * // With custom styling
 * <Icon icon={HomeIcon} className="text-primary" />
 *
 * // With aria-label
 * <Icon icon={BellIcon} aria-label="Notifications" />
 * ```
 */
export function Icon({
  icon: IconComponent,
  size = 'md',
  className,
  'aria-label': ariaLabel,
}: IconProps) {
  return (
    <IconComponent
      className={cn(
        // Size styles
        size === 'xs' && 'w-4 h-4',
        size === 'sm' && 'w-5 h-5',
        size === 'md' && 'w-6 h-6',
        size === 'lg' && 'w-8 h-8',
        size === 'xl' && 'w-10 h-10',

        // Default color (can be overridden)
        'text-current',

        // Custom className
        className
      )}
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel}
    />
  );
}

Icon.displayName = 'Icon';
