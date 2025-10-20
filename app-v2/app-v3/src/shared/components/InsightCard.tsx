/**
 * InsightCard Component
 * Displays AI-generated insights with color-coded styling
 * Single Responsibility: Render insight cards with proper semantic colors
 *
 * TAILWIND FIX: Uses explicit class mapping instead of dynamic string interpolation
 * This ensures Tailwind's purge/tree-shaking includes all classes in production build
 */

import { InsightCardProps, InsightColorClasses } from '@/shared/types/app-details';

const INSIGHT_COLOR_CLASSES: Record<string, InsightColorClasses> = {
  success: {
    container: 'bg-success-bg border-success-border',
    icon: 'text-success',
    title: 'text-success-text',
  },
  warning: {
    container: 'bg-warning-bg border-warning-border',
    icon: 'text-warning',
    title: 'text-warning-text',
  },
  danger: {
    container: 'bg-danger-bg border-danger-border',
    icon: 'text-danger',
    title: 'text-danger-text',
  },
  info: {
    container: 'bg-info-bg border-info-border',
    icon: 'text-info',
    title: 'text-info-text',
  },
};

export function InsightCard({ insight }: InsightCardProps) {
  const Icon = insight.icon;
  const colors = INSIGHT_COLOR_CLASSES[insight.type];

  return (
    <div className={`p-4 rounded-lg border ${colors.container}`}>
      <div className="flex items-start gap-3">
        <Icon className={`h-5 w-5 mt-0.5 ${colors.icon}`} />
        <div>
          <div className={`font-medium mb-1 ${colors.title}`}>
            {insight.title}
          </div>
          <div className="text-sm text-text-secondary">
            {insight.message}
          </div>
        </div>
      </div>
    </div>
  );
}
