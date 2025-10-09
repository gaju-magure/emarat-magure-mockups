/**
 * InsightsFeed Component
 *
 * Scrollable feed of AI-powered insights
 * Shows metrics, alerts, achievements, and suggestions
 */

import React, { useState } from 'react';
import { cn } from '@/utils/classnames';
import { getRecentInsights } from '@/services/mock/insights.mock';
import { Card } from '@/components/molecules/Card';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { formatRelativeTime } from '@/utils/date';
import { formatNumber, formatCurrency } from '@/utils/numbers';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  ChartBarIcon,
  ExclamationTriangleIcon,
  TrophyIcon,
  LightBulbIcon,
  SparklesIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from '@heroicons/react/24/outline';
import type { Insight } from '@/types/insight.types';

export interface InsightsFeedProps {
  /** Initial number of insights to show */
  initialLimit?: number;
  /** Show load more button */
  showLoadMore?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * InsightsFeed Component
 *
 * @example
 * ```tsx
 * <InsightsFeed initialLimit={5} showLoadMore />
 * ```
 */
export function InsightsFeed({
  initialLimit = 6,
  showLoadMore = true,
  className,
}: InsightsFeedProps) {
  const { language } = useLanguage();
  const [limit, setLimit] = useState(initialLimit);
  const [insights] = useState(() => getRecentInsights());

  const displayInsights = insights.slice(0, limit);
  const hasMore = insights.length > limit;

  const handleLoadMore = () => {
    setLimit((prev) => prev + 4);
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-text-primary">
            AI Insights
          </h2>
          <p className="text-sm text-text-secondary mt-1">
            Personalized recommendations from Jarvis
          </p>
        </div>
        <Badge variant="info" size="sm">
          {insights.filter((i) => !i.seen).length} New
        </Badge>
      </div>

      {/* Insights Feed */}
      <div className="space-y-3">
        {displayInsights.map((insight) => (
          <InsightCard key={insight.id} insight={insight} language={language} />
        ))}
      </div>

      {/* Load More */}
      {showLoadMore && hasMore && (
        <div className="flex justify-center pt-2">
          <Button variant="ghost" onClick={handleLoadMore}>
            Load More Insights ({insights.length - limit} remaining)
          </Button>
        </div>
      )}
    </div>
  );
}

InsightsFeed.displayName = 'InsightsFeed';

/**
 * Individual Insight Card
 */
interface InsightCardProps {
  insight: Insight;
  language: 'en' | 'ar';
}

function InsightCard({ insight, language }: InsightCardProps) {
  // Type-based styling
  const typeConfig = {
    metric: {
      icon: ChartBarIcon,
      badge: 'Metric',
      badgeVariant: 'primary' as const,
      borderColor: 'border-l-primary',
    },
    alert: {
      icon: ExclamationTriangleIcon,
      badge: 'Alert',
      badgeVariant: 'warning' as const,
      borderColor: 'border-l-warning-border',
    },
    achievement: {
      icon: TrophyIcon,
      badge: 'Achievement',
      badgeVariant: 'success' as const,
      borderColor: 'border-l-success-border',
    },
    suggestion: {
      icon: LightBulbIcon,
      badge: 'Suggestion',
      badgeVariant: 'info' as const,
      borderColor: 'border-l-info-border',
    },
  };

  const config = typeConfig[insight.type];
  const Icon = config.icon;
  const TrendIcon = insight.metadata?.trend === 'up' ? ArrowTrendingUpIcon : ArrowTrendingDownIcon;

  return (
    <Card
      className={cn(
        'border-l-4 transition-all duration-200',
        config.borderColor,
        !insight.seen && 'bg-primary/5 ring-1 ring-primary/20',
        'hover:shadow-md'
      )}
      bodyClassName="p-4"
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div
          className={cn(
            'flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center',
            'bg-background-secondary',
            insight.metadata?.color === 'success' && 'bg-success-background text-success-text',
            insight.metadata?.color === 'warning' && 'bg-warning-background text-warning-text',
            insight.metadata?.color === 'danger' && 'bg-danger-background text-danger-text',
            insight.metadata?.color === 'info' && 'bg-info-background text-info-text',
            insight.metadata?.color === 'primary' && 'bg-primary/10 text-primary'
          )}
        >
          <Icon className="w-5 h-5" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant={config.badgeVariant} size="sm">
                  {config.badge}
                </Badge>
                {!insight.seen && (
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                )}
              </div>
              <h3 className="text-sm font-semibold text-text-primary">
                {insight.title}
              </h3>
            </div>

            {/* Metric value */}
            {insight.metadata?.value !== undefined && (
              <div className="flex items-center gap-1 text-text-secondary">
                {insight.metadata.trend && (
                  <TrendIcon
                    className={cn(
                      'w-4 h-4',
                      insight.metadata.trend === 'up' ? 'text-success-text' : 'text-danger-text'
                    )}
                  />
                )}
                <span className="text-sm font-bold">
                  {insight.metadata.unit === 'AED'
                    ? formatCurrency(insight.metadata.value)
                    : `${formatNumber(insight.metadata.value)}${insight.metadata.unit || ''}`}
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-text-secondary mb-3 line-clamp-2">
            {insight.content}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-text-tertiary">
              <SparklesIcon className="w-3.5 h-3.5" />
              <span>{formatRelativeTime(insight.timestamp, language)}</span>
            </div>

            {/* Action */}
            {insight.action && (
              <a href={insight.action.href}>
                <Button variant="ghost" size="sm">
                  {insight.action.label}
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
