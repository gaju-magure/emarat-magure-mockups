/**
 * AppCard Component
 *
 * Displays an application card with icon, name, description, and features
 * Supports different sizes (large, medium, small) and hover effects
 */


import { cn } from '@/utils/classnames';
import { Card } from '@/components/molecules/Card';
import { Badge } from '@/components/atoms/Badge';
import type { App } from '@/config/apps.config';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export interface AppCardProps {
  app: App;
  /** Additional className */
  className?: string;
}

/**
 * AppCard Component
 *
 * @example
 * ```tsx
 * <AppCard app={rfpApp} />
 * ```
 */
export function AppCard({ app, className }: AppCardProps) {
  const Icon = app.icon;

  // Size-based styling
  const sizeClasses = {
    large: 'col-span-1 md:col-span-2 row-span-2',
    medium: 'col-span-1',
    small: 'col-span-1',
  };

  // Color-based styling for icon background
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success-background text-success-text',
    warning: 'bg-warning-background text-warning-text',
    info: 'bg-info-background text-info-text',
    secondary: 'bg-background-tertiary text-text-secondary',
  };

  return (
    <a href={app.href} className={cn(sizeClasses[app.size], className)}>
      <Card
        variant="elevated"
        hoverable
        className={cn(
          'h-full transition-all duration-200',
          'hover:shadow-lg hover:scale-[1.02]',
          'group'
        )}
        bodyClassName={cn(
          'p-6',
          app.size === 'large' && 'p-8'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div
              className={cn(
                'flex items-center justify-center rounded-xl transition-transform',
                'group-hover:scale-110',
                app.size === 'large' ? 'w-16 h-16' : 'w-12 h-12',
                colorClasses[app.color]
              )}
            >
              <Icon className={cn(app.size === 'large' ? 'w-8 h-8' : 'w-6 h-6')} />
            </div>

            {app.badge !== undefined && app.badge > 0 && (
              <Badge variant={app.color === 'primary' ? 'primary' : 'warning'} size="sm">
                {app.badge}
              </Badge>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 space-y-3">
            <div>
              <h3
                className={cn(
                  'font-semibold text-text-primary mb-2',
                  app.size === 'large' ? 'text-xl' : 'text-lg'
                )}
              >
                {app.name}
              </h3>
              <p
                className={cn(
                  'text-text-secondary line-clamp-2',
                  app.size === 'large' ? 'text-base' : 'text-sm'
                )}
              >
                {app.description}
              </p>
            </div>

            {/* Features (only for large cards) */}
            {app.size === 'large' && (
              <div className="space-y-1.5 pt-2">
                {app.features.slice(0, 3).map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-text-tertiary">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>{feature}</span>
                  </div>
                ))}
                {app.features.length > 3 && (
                  <p className="text-xs text-text-tertiary italic">
                    +{app.features.length - 3} more features
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border-primary text-primary group-hover:gap-3 transition-all">
            <span className="text-sm font-medium">Open App</span>
            <ArrowRightIcon className="w-4 h-4" />
          </div>
        </div>
      </Card>
    </a>
  );
}

AppCard.displayName = 'AppCard';
