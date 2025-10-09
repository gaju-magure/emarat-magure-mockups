/**
 * QuickActions Component
 *
 * Role-based quick action grid for Jarvis home
 * Shows frequently used actions with badge counts
 */

import React from 'react';
import { cn } from '@/utils/classnames';
import { useQuickActions } from '@/hooks/useQuickActions';
import { Badge } from '@/components/atoms/Badge';
import { CogIcon } from '@heroicons/react/24/outline';
import type { QuickAction } from '@/hooks/useQuickActions';

export interface QuickActionsProps {
  /** Maximum actions to show */
  limit?: number;
  /** Show customize button */
  showCustomize?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * QuickActions Component
 *
 * @example
 * ```tsx
 * <QuickActions limit={8} showCustomize />
 * ```
 */
export function QuickActions({
  limit,
  showCustomize = true,
  className,
}: QuickActionsProps) {
  const { actions, totalCount } = useQuickActions();

  const displayActions = limit ? actions.slice(0, limit) : actions;
  const hasMore = limit && totalCount > limit;

  return (
    <div className={cn('space-y-4', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-text-primary">
            Quick Actions
          </h2>
          <p className="text-sm text-text-secondary mt-1">
            Your most used actions
          </p>
        </div>
        {showCustomize && (
          <button
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-lg',
              'text-sm text-text-secondary hover:text-text-primary',
              'hover:bg-background-secondary',
              'transition-colors',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary'
            )}
          >
            <CogIcon className="w-4 h-4" />
            <span>Customize</span>
          </button>
        )}
      </div>

      {/* Actions Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {displayActions.map((action) => (
          <ActionCard key={action.id} action={action} />
        ))}

        {/* Show more button */}
        {hasMore && (
          <button
            className={cn(
              'flex flex-col items-center justify-center gap-2',
              'p-4 rounded-xl border-2 border-dashed border-border-default',
              'bg-background-secondary/50',
              'hover:bg-background-secondary hover:border-primary',
              'transition-all duration-200',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary'
            )}
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <span className="text-xl text-primary">+</span>
            </div>
            <span className="text-sm font-medium text-text-secondary">
              {totalCount - limit!} More
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

QuickActions.displayName = 'QuickActions';

/**
 * Individual Action Card
 */
interface ActionCardProps {
  action: QuickAction;
}

function ActionCard({ action }: ActionCardProps) {
  const Icon = action.icon;

  return (
    <a
      href={action.href}
      className={cn(
        'group relative flex flex-col items-center gap-3 p-4 rounded-xl',
        'border border-border-default',
        'bg-background-elevated',
        'hover:bg-background-secondary hover:border-primary hover:shadow-md',
        'transition-all duration-200',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        action.primary && 'ring-2 ring-primary/20'
      )}
    >
      {/* Badge */}
      {action.badge !== undefined && action.badge > 0 && (
        <div className="absolute top-2 end-2">
          <Badge variant="danger" size="sm">
            {action.badge > 99 ? '99+' : action.badge}
          </Badge>
        </div>
      )}

      {/* Icon */}
      <div
        className={cn(
          'w-12 h-12 rounded-xl flex items-center justify-center',
          'transition-all duration-200',
          action.primary
            ? 'bg-primary text-white group-hover:scale-110'
            : 'bg-background-secondary text-text-secondary group-hover:bg-primary/10 group-hover:text-primary group-hover:scale-110'
        )}
      >
        <Icon className="w-6 h-6" />
      </div>

      {/* Label */}
      <div className="text-center">
        <p
          className={cn(
            'text-sm font-semibold mb-0.5',
            action.primary ? 'text-primary' : 'text-text-primary'
          )}
        >
          {action.label}
        </p>
        {action.description && (
          <p className="text-xs text-text-tertiary line-clamp-1">
            {action.description}
          </p>
        )}
      </div>

      {/* Primary indicator */}
      {action.primary && (
        <div className="absolute -top-1 -end-1">
          <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      )}
    </a>
  );
}
