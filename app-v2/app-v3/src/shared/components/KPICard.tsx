/**
 * KPICard Component
 * Displays KPI/metric cards with icon, value, and optional badge
 * Single Responsibility: Render KPI cards with consistent styling
 *
 * Used in: HomeScreen (dashboard KPIs), GovernanceScreen (compliance metrics)
 * Replaces: 60+ lines of duplicate KPI card code
 *
 * Features:
 * - Icon with customizable background
 * - Large value display
 * - Optional badge (for changes, status, etc.)
 * - Optional left border accent
 * - Hover effects
 */

import { LucideIcon } from 'lucide-react';

export interface KPICardProps {
  /** KPI label */
  label: string;
  /** Main value to display */
  value: string;
  /** Icon component */
  icon: LucideIcon;
  /** Optional badge with text and styling */
  badge?: {
    text: string;
    variant: 'success' | 'warning' | 'info' | 'danger' | 'neutral';
  };
  /** Optional left border color accent */
  leftBorderColor?: 'success' | 'warning' | 'info' | 'danger';
  /** Optional additional CSS classes */
  className?: string;
}

const BADGE_VARIANTS = {
  success: 'bg-success-bg text-success-text',
  warning: 'bg-warning-bg text-warning-text',
  info: 'bg-info-bg text-info-text',
  danger: 'bg-danger-bg text-danger-text',
  neutral: 'bg-background-tertiary text-text-secondary',
};

const BORDER_COLORS = {
  success: 'border-l-success',
  warning: 'border-l-warning',
  info: 'border-l-info',
  danger: 'border-l-danger',
};

export function KPICard({
  label,
  value,
  icon: Icon,
  badge,
  leftBorderColor,
  className = ''
}: KPICardProps) {
  const borderClass = leftBorderColor ? `border-l-4 ${BORDER_COLORS[leftBorderColor]}` : '';
  const badgeClass = badge ? BADGE_VARIANTS[badge.variant] : '';

  return (
    <div className={`card-glass p-4 hover:shadow-float-xl transition-all duration-300 ${borderClass} ${className}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        {badge && (
          <span className={`text-xs font-medium px-2 py-1 rounded ${badgeClass}`}>
            {badge.text}
          </span>
        )}
      </div>
      <div className="text-2xl font-bold text-text-primary mb-1">
        {value}
      </div>
      <div className="text-sm text-text-secondary">{label}</div>
    </div>
  );
}
