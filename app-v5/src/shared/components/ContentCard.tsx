/**
 * ContentCard Component
 * Reusable card wrapper with consistent title styling and optional actions
 * Single Responsibility: Provide consistent card container with title
 *
 * Used in: All detail screens for section organization
 * Replaces: 40+ lines of duplicate card wrapper code
 */

import { ReactNode } from 'react';

export interface ContentCardProps {
  /** Card title (displayed as h2) */
  title: string;
  /** Optional subtitle text displayed below title */
  subtitle?: string;
  /** Optional action element (button, filter, etc.) displayed next to title */
  titleAction?: ReactNode;
  /** Alternative to titleAction - for backwards compatibility */
  action?: ReactNode;
  /** Card content */
  children: ReactNode;
  /** Additional CSS classes for card container */
  className?: string;
}

export function ContentCard({
  title,
  subtitle,
  titleAction,
  action,
  children,
  className = ''
}: ContentCardProps) {
  const actionElement = titleAction || action;

  return (
    <div className={`card-glass p-6 ${className}`}>
      <div className={`mb-4 ${actionElement ? 'flex items-center justify-between' : ''}`}>
        <div>
          <h2 className="text-lg font-semibold text-text-primary">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm text-text-tertiary mt-1">
              {subtitle}
            </p>
          )}
        </div>
        {actionElement && actionElement}
      </div>
      {children}
    </div>
  );
}
