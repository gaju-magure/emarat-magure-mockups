/**
 * DocumentCard Component
 * Document card with icon, name, date, and status badge
 * Single Responsibility: Render document cards with consistent styling
 *
 * Used in: GovernanceScreen compliance documents section
 * Replaces: 100+ lines of duplicate document card code (4 cards × 25 lines)
 *
 * Features:
 * - FileText icon
 * - Document name and updated date
 * - Status badge (Current/Under Review)
 * - Hover background transition
 * - Click handler support
 */

import { FileText } from 'lucide-react';
import { ComplianceDocument } from '@/shared/types/screen-data-models';

export interface DocumentCardProps {
  /** Document data */
  document: ComplianceDocument;
  /** Optional click handler */
  onClick?: () => void;
  /** Optional CSS classes */
  className?: string;
}

export function DocumentCard({
  document,
  onClick,
  className = ''
}: DocumentCardProps) {
  const isCurrent = document.status === 'Current';

  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between p-4 rounded-lg glass-light border border-glow hover:glass-medium hover:shadow-glow-sm hover:border-glow-hover transition-all duration-300 cursor-pointer group ${className}`}
    >
      <div className="flex items-center gap-3">
        <FileText className="h-5 w-5 text-text-primary group-hover:scale-110 transition-transform duration-300" />
        <div>
          <div className="text-sm font-medium text-text-primary transition-colors duration-300">
            {document.name}
          </div>
          <div className="text-xs text-text-tertiary">
            Updated: {document.date}
          </div>
        </div>
      </div>
      <span
        className={`text-xs px-2 py-1 rounded shadow-glow-sm ${
          isCurrent
            ? 'bg-success-bg text-success-text border border-success-border'
            : 'bg-warning-bg text-warning-text border border-warning-border'
        }`}
      >
        {document.status}
      </span>
    </div>
  );
}
