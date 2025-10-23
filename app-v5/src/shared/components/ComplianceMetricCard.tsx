/**
 * ComplianceMetricCard Component
 * Compliance metric card with score, status, icon, and left border
 * Single Responsibility: Render compliance metric cards with consistent styling
 *
 * Used in: GovernanceScreen compliance metrics section
 * Replaces: 168 lines of duplicate card code (4 cards × 42 lines)
 *
 * Features:
 * - Left border color based on compliance status
 * - Icon with conditional background color
 * - Score percentage (large, top right)
 * - Status text with conditional color
 * - Label text
 */

import { LucideIcon } from 'lucide-react';

export interface ComplianceMetricCardProps {
  /** Metric label */
  label: string;
  /** Compliance status */
  status: 'Compliant' | 'Review Needed';
  /** Score percentage (0-100) */
  score: number;
  /** Icon component */
  icon: LucideIcon;
  /** Optional CSS classes */
  className?: string;
}

export function ComplianceMetricCard({
  label,
  status,
  score,
  icon: Icon,
  className = ''
}: ComplianceMetricCardProps) {
  const isCompliant = status === 'Compliant';

  return (
    <div
      className={`card-glass p-4 border-l-4 hover:shadow-float-md transition-all duration-300 ${
        isCompliant ? 'border-l-success shadow-glow-success' : 'border-l-warning shadow-glow-warning'
      } ${className}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className={`w-10 h-10 rounded-lg glass-light border border-glow flex items-center justify-center ${
            isCompliant ? 'shadow-glow-success' : 'shadow-glow-warning'
          }`}
        >
          <Icon
            className={`h-5 w-5 drop-shadow-glow-sm ${
              isCompliant ? 'text-success' : 'text-warning'
            }`}
          />
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-text-primary">
            {score}%
          </div>
          <div
            className={`text-xs font-medium ${
              isCompliant ? 'text-success' : 'text-warning'
            }`}
          >
            {status}
          </div>
        </div>
      </div>
      <div className="text-sm font-medium text-text-secondary">
        {label}
      </div>
    </div>
  );
}
