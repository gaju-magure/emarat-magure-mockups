/**
 * StatusBadge Component
 * Displays app status with consistent styling (Live, In Development, Planned)
 * Single Responsibility: Render status badge with appropriate colors
 */

import { StatusBadgeProps, StatusConfig } from '@/shared/types/app-details';

const STATUS_CONFIGS: Record<string, StatusConfig> = {
  Live: {
    bgClass: 'bg-success-bg',
    textClass: 'text-success-text',
    borderClass: 'border-success-border',
  },
  'In Development': {
    bgClass: 'bg-warning-bg',
    textClass: 'text-warning-text',
    borderClass: 'border-warning-border',
  },
  Planned: {
    bgClass: 'bg-info-bg',
    textClass: 'text-info-text',
    borderClass: 'border-info-border',
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = STATUS_CONFIGS[status];

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium border ${config.bgClass} ${config.textClass} ${config.borderClass}`}
    >
      {status}
    </span>
  );
}
