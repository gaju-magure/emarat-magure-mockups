/**
 * FlaggedClauseCard Component
 * Displays a single flagged contract clause with risk indicator
 * Single Responsibility: Render flagged clause cards with consistent styling
 *
 * Used in: Contract review screens
 * Eliminates: Duplicate clause card rendering (40+ lines per usage)
 */

import { AlertTriangle } from 'lucide-react';
import { RiskBadge } from './RiskBadge';
import { RiskLevel } from '@/shared/types/data-models';

export interface FlaggedClauseCardProps {
  /** Clause identifier (e.g., "Payment Terms - Section 4.2") */
  clause: string;
  /** Risk level */
  risk: RiskLevel;
  /** Issue description */
  issue: string;
  /** Recommendation text */
  recommendation: string;
}

export function FlaggedClauseCard({
  clause,
  risk,
  issue,
  recommendation
}: FlaggedClauseCardProps) {
  // Icon color based on risk level
  const iconColorClass =
    risk === 'High' ? 'text-danger' :
    risk === 'Medium' ? 'text-warning' :
    'text-info';

  return (
    <div className="p-4 rounded-lg border border-border bg-background-secondary">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <AlertTriangle className={`h-5 w-5 ${iconColorClass}`} />
          <div className="font-medium text-text-primary">
            {clause}
          </div>
        </div>
        <RiskBadge level={risk} showIcon={false} />
      </div>
      <div className="ml-7 space-y-2">
        <div className="text-sm text-text-secondary">
          <span className="font-medium text-text-primary">Issue:</span> {issue}
        </div>
        <div className="text-sm text-text-secondary">
          <span className="font-medium text-text-primary">Recommendation:</span> {recommendation}
        </div>
      </div>
    </div>
  );
}
