/**
 * Card Component
 *
 * Versatile container component with variants and sections
 * Used throughout the app for content grouping
 */

import React, { type ReactNode } from 'react';
import { cn } from '@/utils/classnames';

export interface CardProps {
  /** Card variant */
  variant?: 'flat' | 'elevated' | 'bordered';
  /** Card size padding */
  size?: 'sm' | 'md' | 'lg';
  /** Header content */
  header?: ReactNode;
  /** Footer content */
  footer?: ReactNode;
  /** Main content */
  children: ReactNode;
  /** Click handler (makes card interactive) */
  onClick?: () => void;
  /** Hover effect */
  hoverable?: boolean;
  /** Additional className */
  className?: string;
  /** Additional header className */
  headerClassName?: string;
  /** Additional body className */
  bodyClassName?: string;
  /** Additional footer className */
  footerClassName?: string;
}

/**
 * Card Component
 *
 * @example
 * ```tsx
 * // Basic card
 * <Card>
 *   <p>Card content</p>
 * </Card>
 *
 * // With header and footer
 * <Card
 *   header={<h3>Card Title</h3>}
 *   footer={<Button>Action</Button>}
 * >
 *   <p>Card content</p>
 * </Card>
 *
 * // Elevated variant
 * <Card variant="elevated" hoverable onClick={() => navigate('/details')}>
 *   <p>Clickable card</p>
 * </Card>
 * ```
 */
export function Card({
  variant = 'elevated',
  size = 'md',
  header,
  footer,
  children,
  onClick,
  hoverable = false,
  className,
  headerClassName,
  bodyClassName,
  footerClassName,
}: CardProps) {
  const isInteractive = onClick || hoverable;

  // Size padding
  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const headerSizeClasses = {
    sm: 'px-4 py-3',
    md: 'px-6 py-4',
    lg: 'px-8 py-5',
  };

  const footerSizeClasses = {
    sm: 'px-4 py-3',
    md: 'px-6 py-4',
    lg: 'px-8 py-5',
  };

  // Variant styles
  const variantClasses = {
    flat: 'bg-background-secondary',
    elevated: 'bg-background-elevated shadow-sm',
    bordered: 'bg-background-primary border border-border-default',
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-lg overflow-hidden',
        'transition-all duration-200',
        variantClasses[variant],

        // Interactive states
        isInteractive && [
          'cursor-pointer',
          variant === 'elevated' && 'hover:shadow-md',
          variant === 'bordered' && 'hover:border-border-hover',
          variant === 'flat' && 'hover:bg-background-tertiary',
        ],

        // Focus state (when clickable)
        onClick && 'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',

        className
      )}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {/* Header */}
      {header && (
        <div
          className={cn(
            headerSizeClasses[size],
            'border-b border-border-default',
            'bg-background-primary/50',
            headerClassName
          )}
        >
          {header}
        </div>
      )}

      {/* Body */}
      <div
        className={cn(
          header || footer ? sizeClasses[size] : '',
          !header && !footer && sizeClasses[size],
          bodyClassName
        )}
      >
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div
          className={cn(
            footerSizeClasses[size],
            'border-t border-border-default',
            'bg-background-primary/50',
            footerClassName
          )}
        >
          {footer}
        </div>
      )}
    </div>
  );
}

Card.displayName = 'Card';
