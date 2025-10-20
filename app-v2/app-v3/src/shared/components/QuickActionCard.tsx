/**
 * QuickActionCard Component
 * Quick action button card with icon and label
 * Single Responsibility: Render action cards with consistent layout
 *
 * Used in: HomeScreen quick actions section
 * Replaces: 40+ lines of duplicate action card code (4 cards × 10 lines)
 *
 * Features:
 * - Emoji icon display
 * - Label with hover effect
 * - Click handler
 * - Hover shadow transition
 */

import { QuickAction } from '@/shared/types/screen-data-models';

export interface QuickActionCardProps {
  /** Action data */
  action: QuickAction;
  /** Click handler */
  onClick?: () => void;
  /** Optional CSS classes */
  className?: string;
}

export function QuickActionCard({
  action,
  onClick,
  className = ''
}: QuickActionCardProps) {
  return (
    <button
      onClick={onClick}
      className={`card p-4 hover:shadow-lg transition-all duration-200 group text-left ${className}`}
    >
      <div className="text-3xl mb-2">{action.icon}</div>
      <div className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors">
        {action.label}
      </div>
    </button>
  );
}
