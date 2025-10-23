/**
 * PilotCard Component
 * Displays pilot/app card with name, status, metrics, and view action
 * Single Responsibility: Render pilot cards with consistent layout
 *
 * Used in: HomeScreen active pilots section
 * Replaces: 90 lines of duplicate pilot card code (3 cards × 30 lines)
 *
 * Features:
 * - Pilot name with status badge
 * - Users count and accuracy percentage
 * - "View →" action button
 * - Hover background transition
 * - Status-based badge colors (Live = success, Testing = warning)
 */

import { Pilot } from '@/shared/types/screen-data-models';

export interface PilotCardProps {
  /** Pilot data */
  pilot: Pilot;
  /** Optional view handler */
  onView?: () => void;
  /** Optional CSS classes */
  className?: string;
}

export function PilotCard({
  pilot,
  onView,
  className = ''
}: PilotCardProps) {
  const isLive = pilot.status === 'Live';
  const statusClasses = isLive
    ? 'bg-success-bg text-success-text border border-success-border'
    : 'bg-warning-bg text-warning-text border border-warning-border';

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-lg glass-light border border-glow hover:glass-medium hover:shadow-glow-sm hover:border-glow-hover transition-all duration-300 group ${className}`}
    >
      {/* Pilot Info */}
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <h3 className="font-medium text-text-primary transition-colors duration-300">
            {pilot.name}
          </h3>
          <span className={`text-xs px-2 py-1 rounded-full shadow-glow-sm ${statusClasses}`}>
            {pilot.status}
          </span>
        </div>
        <div className="flex items-center gap-4 mt-2 text-sm text-text-secondary">
          <span>{pilot.users} users</span>
          <span className="text-text-tertiary">•</span>
          <span>{pilot.accuracy} accuracy</span>
        </div>
      </div>

      {/* View Action */}
      {onView && (
        <button
          onClick={onView}
          className="text-text-secondary hover:text-text-primary text-sm font-medium transition-all duration-300 hover:translate-x-1"
        >
          View →
        </button>
      )}
    </div>
  );
}
