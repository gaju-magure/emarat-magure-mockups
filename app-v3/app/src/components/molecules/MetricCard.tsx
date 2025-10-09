/**
 * MetricCard Component
 *
 * Display key metrics with trend indicators and comparisons
 * Used in dashboards and analytics views
 */

import React, { type ReactNode } from 'react';
import { cn } from '@/utils/classnames';
import { formatNumber, formatPercent } from '@/utils/numbers';
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  MinusIcon,
} from '@heroicons/react/24/outline';

export interface MetricCardProps {
  /** Metric label */
  label: string;
  /** Metric value */
  value: number | string;
  /** Unit (e.g., 'AED', 'users', '%') */
  unit?: string;
  /** Trend direction */
  trend?: 'up' | 'down' | 'neutral';
  /** Trend percentage change */
  trendValue?: number;
  /** Trend label (e.g., 'vs last month') */
  trendLabel?: string;
  /** Icon */
  icon?: React.ComponentType<{ className?: string }>;
  /** Card variant */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  /** Size */
  size?: 'sm' | 'md' | 'lg';
  /** Loading state */
  loading?: boolean;
  /** Additional footer content */
  footer?: ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Additional className */
  className?: string;
}

/**
 * MetricCard Component
 *
 * @example
 * ```tsx
 * // Basic metric
 * <MetricCard
 *   label="Total Revenue"
 *   value={125000}
 *   unit="AED"
 *   trend="up"
 *   trendValue={12.5}
 *   trendLabel="vs last month"
 * />
 *
 * // With icon
 * <MetricCard
 *   label="Active Users"
 *   value={1234}
 *   icon={UsersIcon}
 *   trend="up"
 *   trendValue={8.2}
 * />
 *
 * // Clickable
 * <MetricCard
 *   label="Pending Tasks"
 *   value={42}
 *   variant="warning"
 *   onClick={() => navigate('/tasks')}
 * />
 * ```
 */
export function MetricCard({
  label,
  value,
  unit,
  trend,
  trendValue,
  trendLabel = 'vs last period',
  icon: Icon,
  variant = 'default',
  size = 'md',
  loading = false,
  footer,
  onClick,
  className,
}: MetricCardProps) {
  // Size classes
  const sizeClasses = {
    sm: {
      container: 'p-4',
      value: 'text-2xl',
      label: 'text-xs',
      trend: 'text-xs',
      icon: 'w-8 h-8',
    },
    md: {
      container: 'p-6',
      value: 'text-3xl',
      label: 'text-sm',
      trend: 'text-sm',
      icon: 'w-10 h-10',
    },
    lg: {
      container: 'p-8',
      value: 'text-4xl',
      label: 'text-base',
      trend: 'text-base',
      icon: 'w-12 h-12',
    },
  };

  // Variant styles
  const variantStyles = {
    default: {
      container: 'bg-background-elevated border-border-default',
      icon: 'text-text-secondary bg-background-secondary',
      value: 'text-text-primary',
      label: 'text-text-secondary',
    },
    primary: {
      container: 'bg-primary/5 border-primary/20',
      icon: 'text-primary bg-primary/10',
      value: 'text-primary',
      label: 'text-text-secondary',
    },
    success: {
      container: 'bg-success-background border-success-border',
      icon: 'text-success-text bg-success-background',
      value: 'text-success-text',
      label: 'text-text-secondary',
    },
    warning: {
      container: 'bg-warning-background border-warning-border',
      icon: 'text-warning-text bg-warning-background',
      value: 'text-warning-text',
      label: 'text-text-secondary',
    },
    danger: {
      container: 'bg-danger-background border-danger-border',
      icon: 'text-danger-text bg-danger-background',
      value: 'text-danger-text',
      label: 'text-text-secondary',
    },
  };

  // Trend styles
  const trendStyles = {
    up: {
      icon: ArrowTrendingUpIcon,
      color: 'text-success-text',
      bg: 'bg-success-background',
    },
    down: {
      icon: ArrowTrendingDownIcon,
      color: 'text-danger-text',
      bg: 'bg-danger-background',
    },
    neutral: {
      icon: MinusIcon,
      color: 'text-text-tertiary',
      bg: 'bg-background-secondary',
    },
  };

  const currentSize = sizeClasses[size];
  const currentVariant = variantStyles[variant];
  const TrendIcon = trend ? trendStyles[trend].icon : null;

  // Format value
  const formattedValue =
    typeof value === 'number' ? formatNumber(value) : value;

  return (
    <div
      onClick={onClick}
      className={cn(
        currentSize.container,
        'rounded-lg border shadow-sm',
        'transition-all duration-200',
        currentVariant.container,
        onClick && [
          'cursor-pointer hover:shadow-md',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        ],
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
      {/* Header with icon and label */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          <p className={cn('font-medium', currentSize.label, currentVariant.label)}>
            {label}
          </p>
        </div>
        {Icon && (
          <div
            className={cn(
              'flex items-center justify-center rounded-lg p-2',
              currentSize.icon,
              currentVariant.icon
            )}
          >
            <Icon className="w-full h-full" />
          </div>
        )}
      </div>

      {/* Value */}
      {loading ? (
        <div className="space-y-2 mb-3">
          <div className="h-8 bg-background-secondary rounded animate-pulse" />
          <div className="h-4 w-24 bg-background-secondary rounded animate-pulse" />
        </div>
      ) : (
        <div className="mb-3">
          <div className="flex items-baseline gap-2">
            <span className={cn('font-bold', currentSize.value, currentVariant.value)}>
              {formattedValue}
            </span>
            {unit && (
              <span
                className={cn(
                  'font-medium',
                  currentSize.label,
                  currentVariant.label
                )}
              >
                {unit}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Trend indicator */}
      {trend && !loading && (
        <div className="flex items-center gap-2">
          <div
            className={cn(
              'flex items-center gap-1 px-2 py-1 rounded',
              trendStyles[trend].bg
            )}
          >
            {TrendIcon && (
              <TrendIcon className={cn('w-4 h-4', trendStyles[trend].color)} />
            )}
            {trendValue !== undefined && (
              <span
                className={cn(
                  'font-semibold',
                  currentSize.trend,
                  trendStyles[trend].color
                )}
              >
                {formatPercent(Math.abs(trendValue) / 100)}
              </span>
            )}
          </div>
          <span className={cn('text-text-tertiary', currentSize.trend)}>
            {trendLabel}
          </span>
        </div>
      )}

      {/* Footer */}
      {footer && (
        <div className="mt-4 pt-4 border-t border-border-default">{footer}</div>
      )}
    </div>
  );
}

MetricCard.displayName = 'MetricCard';
