/**
 * Button Component
 *
 * A themeable button component with multiple variants, sizes, and states
 * Fully accessible with ARIA labels and keyboard navigation
 */

import React, { type ReactNode, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/utils/classnames';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** Button visual variant */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Disabled state */
  disabled?: boolean;
  /** Loading state (shows spinner) */
  loading?: boolean;
  /** Full width button */
  fullWidth?: boolean;
  /** Button content */
  children: ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Button type */
  type?: 'button' | 'submit' | 'reset';
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** Optional icon before text */
  icon?: ReactNode;
  /** Optional icon after text */
  iconRight?: ReactNode;
}

/**
 * Button Component
 *
 * @example
 * ```tsx
 * // Primary button
 * <Button variant="primary" onClick={() => {}}>
 *   Save Changes
 * </Button>
 *
 * // Loading state
 * <Button variant="primary" loading>
 *   Saving...
 * </Button>
 *
 * // With icon
 * <Button variant="secondary" icon={<PlusIcon />}>
 *   Add New
 * </Button>
 *
 * // Full width
 * <Button variant="primary" fullWidth>
 *   Continue
 * </Button>
 * ```
 */
export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  children,
  onClick,
  type = 'button',
  className,
  icon,
  iconRight,
  ...props
}: ButtonProps) {
  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      onClick();
    }
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={handleClick}
      className={cn(
        // Base styles
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-border-focus',
        'disabled:opacity-50 disabled:cursor-not-allowed',

        // Variant styles
        variant === 'primary' && [
          'bg-primary text-white',
          'hover:bg-primary-hover',
          'active:scale-95',
          'shadow-sm hover:shadow-md',
        ],
        variant === 'secondary' && [
          'bg-secondary text-white',
          'hover:bg-secondary-hover',
          'active:scale-95',
          'shadow-sm hover:shadow-md',
        ],
        variant === 'ghost' && [
          'bg-transparent border border-border-default text-text-primary',
          'hover:bg-background-secondary hover:border-border-dark',
          'active:scale-95',
        ],
        variant === 'danger' && [
          'bg-danger text-white',
          'hover:opacity-90',
          'active:scale-95',
          'shadow-sm hover:shadow-md',
        ],

        // Size styles
        size === 'sm' && 'px-3 py-1.5 text-sm h-9',
        size === 'md' && 'px-4 py-2 text-base h-11',
        size === 'lg' && 'px-6 py-3 text-lg h-12',

        // Full width
        fullWidth && 'w-full',

        // Loading state
        loading && 'cursor-wait',

        // Custom className
        className
      )}
      {...props}
    >
      {/* Loading spinner */}
      {loading && (
        <svg
          className="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}

      {/* Icon (left) */}
      {!loading && icon && (
        <span className={cn('inline-flex', size === 'sm' && 'w-4 h-4', size === 'md' && 'w-5 h-5', size === 'lg' && 'w-6 h-6')}>
          {icon}
        </span>
      )}

      {/* Button text */}
      {children}

      {/* Icon (right) */}
      {!loading && iconRight && (
        <span className={cn('inline-flex', size === 'sm' && 'w-4 h-4', size === 'md' && 'w-5 h-5', size === 'lg' && 'w-6 h-6')}>
          {iconRight}
        </span>
      )}
    </button>
  );
}

Button.displayName = 'Button';
