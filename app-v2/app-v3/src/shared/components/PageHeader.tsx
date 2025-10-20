/**
 * PageHeader Component
 * Consistent page header with title, subtitle, and optional action
 * Single Responsibility: Render page headers uniformly across all screens
 *
 * Used in: HomeScreen, AppsScreen, TasksScreen, GovernanceScreen, InsightsScreen
 * Replaces: 40+ lines of duplicate header code across 4 screens
 *
 * Features:
 * - Large responsive title (text-2xl md:text-3xl)
 * - Subtitle with consistent styling
 * - Optional action element (e.g., "+ New Task" button)
 * - Responsive flex layout
 */

import { ReactNode } from 'react';

export interface PageHeaderProps {
  /** Page title */
  title: string;
  /** Page subtitle/description */
  subtitle: string;
  /** Optional action element (button, link, etc.) displayed on the right */
  action?: ReactNode;
  /** Optional CSS classes */
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  action,
  className = ''
}: PageHeaderProps) {
  if (action) {
    // Layout with action button (e.g., TasksScreen)
    return (
      <div className={`flex items-center justify-between ${className}`}>
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-text-primary">
            {title}
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            {subtitle}
          </p>
        </div>
        {action}
      </div>
    );
  }

  // Simple layout without action
  return (
    <div className={className}>
      <h1 className="text-2xl md:text-3xl font-semibold text-text-primary">
        {title}
      </h1>
      <p className="text-sm text-text-secondary mt-1">
        {subtitle}
      </p>
    </div>
  );
}
