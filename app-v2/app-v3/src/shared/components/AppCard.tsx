/**
 * AppCard Component
 * AI application card with icon, status, metrics, and click handler
 * Single Responsibility: Render app cards with consistent layout
 *
 * Used in: AppsScreen gallery
 * Replaces: 240+ lines of duplicate app card code (6 cards × 40 lines)
 *
 * Features:
 * - Icon with colored background
 * - Status badge with icon (top right)
 * - Title with hover effect
 * - Description with line clamp
 * - 3-column metrics grid (users/accuracy/savings)
 * - Click handler
 * - Hover shadow effect
 */

import { LucideIcon } from 'lucide-react';
import { MetricsGrid } from './MetricsGrid';

export interface AppCardProps {
  /** Application data */
  app: {
    id: number;
    name: string;
    description: string;
    icon: LucideIcon;
    status: string;
    users: number;
    accuracy: string;
    savings: string;
  };
  /** Status configuration */
  statusConfig: {
    icon: LucideIcon;
    bgClass: string;
    textClass: string;
    borderClass: string;
  };
  /** Click handler */
  onClick: (id: number) => void;
  /** Optional CSS classes */
  className?: string;
}

export function AppCard({
  app,
  statusConfig,
  onClick,
  className = ''
}: AppCardProps) {
  const Icon = app.icon;
  const StatusIcon = statusConfig.icon;

  return (
    <div
      onClick={() => onClick(app.id)}
      className={`card p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group ${className}`}
    >
      {/* App Icon & Status */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
          <Icon className="h-6 w-6 text-accent" />
        </div>
        <div
          className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig.bgClass} ${statusConfig.textClass} border ${statusConfig.borderClass}`}
        >
          <StatusIcon className="h-3 w-3" />
          {app.status}
        </div>
      </div>

      {/* App Info */}
      <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors">
        {app.name}
      </h3>
      <p className="text-sm text-text-secondary mb-4 line-clamp-2">
        {app.description}
      </p>

      {/* Metrics */}
      <MetricsGrid
        metrics={[
          { label: 'Users', value: app.users.toString() },
          { label: 'Accuracy', value: app.accuracy },
          { label: 'Savings', value: app.savings, highlight: true },
        ]}
      />
    </div>
  );
}
