/**
 * PriorityAlerts Component
 *
 * Displays top 3 AI-powered priority alerts
 * Color-coded borders, action buttons, swipeable on mobile
 */


import { cn } from '@/utils/classnames';
import { useAlerts } from '@/hooks/useAlerts';
import { Card } from '@/components/molecules/Card';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { formatRelativeTime } from '@/utils/date';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
  SparklesIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import type { Alert } from '@/types/alert.types';

export interface PriorityAlertsProps {
  /** Maximum number of alerts to show */
  limit?: number;
  /** Additional className */
  className?: string;
}

/**
 * PriorityAlerts Component
 *
 * @example
 * ```tsx
 * <PriorityAlerts limit={3} />
 * ```
 */
export function PriorityAlerts({
  limit = 3,
  className,
}: PriorityAlertsProps) {
  const { alerts, dismissAlert } = useAlerts(limit);
  const { language } = useLanguage();

  if (alerts.length === 0) {
    return (
      <div className={cn('text-center py-12', className)}>
        <SparklesIcon className="w-16 h-16 mx-auto mb-4 text-success-text opacity-50" />
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          All Clear!
        </h3>
        <p className="text-sm text-text-secondary">
          No urgent alerts at the moment. Great job!
        </p>
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-text-primary">
            Priority Alerts
          </h2>
          <p className="text-sm text-text-secondary mt-1">
            AI-powered insights requiring your attention
          </p>
        </div>
        <Badge variant="danger" size="sm">
          {alerts.filter((a) => !a.seen).length} New
        </Badge>
      </div>

      {/* Alerts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {alerts.map((alert, index) => (
          <AlertCard
            key={alert.id}
            alert={alert}
            index={index}
            onDismiss={() => dismissAlert(alert.id)}
            language={language}
          />
        ))}
      </div>
    </div>
  );
}

PriorityAlerts.displayName = 'PriorityAlerts';

/**
 * Individual Alert Card
 */
interface AlertCardProps {
  alert: Alert;
  index: number;
  onDismiss: () => void;
  language: 'en' | 'ar';
}

function AlertCard({ alert, index, onDismiss, language }: AlertCardProps) {
  // Type-based styling
  const typeStyles = {
    urgent: {
      border: 'border-l-4 border-l-danger-border',
      bg: 'bg-danger-background/30',
      icon: ExclamationTriangleIcon,
      iconColor: 'text-danger-text',
      badge: 'danger' as const,
    },
    warning: {
      border: 'border-l-4 border-l-warning-border',
      bg: 'bg-warning-background/30',
      icon: ExclamationTriangleIcon,
      iconColor: 'text-warning-text',
      badge: 'warning' as const,
    },
    info: {
      border: 'border-l-4 border-l-info-border',
      bg: 'bg-info-background/30',
      icon: InformationCircleIcon,
      iconColor: 'text-info-text',
      badge: 'info' as const,
    },
  };

  const style = typeStyles[alert.type];
  const Icon = style.icon;

  return (
    <Card
      className={cn(
        'relative overflow-hidden transition-all duration-200',
        style.border,
        style.bg,
        !alert.seen && 'ring-2 ring-primary/20',
        'hover:shadow-lg'
      )}
      bodyClassName="p-5"
    >
      {/* Dismiss button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDismiss();
        }}
        className={cn(
          'absolute top-3 end-3 p-1 rounded',
          'text-text-tertiary hover:text-text-primary hover:bg-background-secondary',
          'transition-colors',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary'
        )}
        aria-label="Dismiss alert"
      >
        <XMarkIcon className="w-4 h-4" />
      </button>

      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className={cn('p-2 rounded-lg bg-background-elevated', style.iconColor)}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0 pr-6">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant={style.badge} size="sm">
              {alert.type.toUpperCase()}
            </Badge>
            {!alert.seen && (
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            )}
          </div>
          <h3 className="text-sm font-semibold text-text-primary line-clamp-2">
            {alert.title}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-text-secondary line-clamp-3 mb-4">
        {alert.description}
      </p>

      {/* Metadata */}
      {alert.metadata && (
        <div className="flex items-center gap-3 mb-4 text-xs text-text-tertiary">
          {alert.metadata.confidence && (
            <div className="flex items-center gap-1">
              <SparklesIcon className="w-3.5 h-3.5" />
              <span>{Math.round(alert.metadata.confidence * 100)}% confident</span>
            </div>
          )}
          <span>•</span>
          <span>{formatRelativeTime(alert.timestamp, language)}</span>
        </div>
      )}

      {/* Action Button */}
      <a href={alert.action.href}>
        <Button
          variant={alert.type === 'urgent' ? 'danger' : 'primary'}
          size="sm"
          fullWidth
        >
          {alert.action.label}
        </Button>
      </a>

      {/* Index number (subtle) */}
      <div className="absolute bottom-2 end-2 text-4xl font-bold text-text-primary/5">
        {index + 1}
      </div>
    </Card>
  );
}
