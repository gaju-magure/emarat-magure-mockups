/**
 * Badge Component
 *
 * A small status indicator with multiple variants and sizes
 * Used for counts, statuses, and labels
 */

import { type ReactNode } from 'react';
import { cn } from '@/utils/classnames';

export interface BadgeProps {
  /** Badge variant */
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'secondary';
  /** Badge size */
  size?: 'sm' | 'md' | 'lg';
  /** Badge content */
  children: ReactNode;
  /** Show dot indicator */
  dot?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * Badge Component
 *
 * @example
 * ```tsx
 * // Default badge
 * <Badge>New</Badge>
 *
 * // Status badges
 * <Badge variant="success">Active</Badge>
 * <Badge variant="warning">Pending</Badge>
 * <Badge variant="danger">Failed</Badge>
 *
 * // Count badge
 * <Badge variant="primary">3</Badge>
 *
 * // With dot
 * <Badge variant="success" dot>Online</Badge>
 *
 * // Sizes
 * <Badge size="sm">Small</Badge>
 * <Badge size="lg">Large</Badge>
 * ```
 */
export function Badge({
  variant = 'default',
  size = 'md',
  children,
  dot = false,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        // Base styles
        'inline-flex items-center gap-1.5 font-medium rounded-full',
        'transition-colors duration-200',

        // Variant styles
        variant === 'default' && [
          'bg-background-secondary text-text-primary',
          'border border-border-default',
        ],
        variant === 'primary' && [
          'bg-primary/10 text-primary',
          'border border-primary/20',
        ],
        variant === 'secondary' && [
          'bg-secondary/10 text-secondary',
          'border border-secondary/20',
        ],
        variant === 'success' && [
          'bg-success-bg text-success-text',
          'border border-success-border',
        ],
        variant === 'warning' && [
          'bg-warning-bg text-warning-text',
          'border border-warning-border',
        ],
        variant === 'danger' && [
          'bg-danger-bg text-danger-text',
          'border border-danger-border',
        ],
        variant === 'info' && [
          'bg-info-bg text-info-text',
          'border border-info-border',
        ],

        // Size styles
        size === 'sm' && 'px-2 py-0.5 text-xs',
        size === 'md' && 'px-2.5 py-1 text-sm',
        size === 'lg' && 'px-3 py-1.5 text-base',

        // Custom className
        className
      )}
    >
      {/* Dot indicator */}
      {dot && (
        <span
          className={cn(
            'inline-block rounded-full',
            size === 'sm' && 'w-1.5 h-1.5',
            size === 'md' && 'w-2 h-2',
            size === 'lg' && 'w-2.5 h-2.5',

            // Dot colors
            variant === 'default' && 'bg-text-tertiary',
            variant === 'primary' && 'bg-primary',
            variant === 'secondary' && 'bg-secondary',
            variant === 'success' && 'bg-success-border',
            variant === 'warning' && 'bg-warning-border',
            variant === 'danger' && 'bg-danger-border',
            variant === 'info' && 'bg-info-border'
          )}
          aria-hidden="true"
        />
      )}

      {/* Badge content */}
      {children}
    </span>
  );
}

Badge.displayName = 'Badge';
