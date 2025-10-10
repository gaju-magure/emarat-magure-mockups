/**
 * PageHeader Component
 *
 * Reusable page header with title, back button, breadcrumbs, and actions
 * Used at the top of content pages
 */

import { type ReactNode } from 'react';
import { cn } from '@/utils/classnames';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

export interface Breadcrumb {
  label: string;
  href?: string;
}

export interface PageHeaderProps {
  /** Page title */
  title: string;
  /** Page subtitle/description */
  subtitle?: string;
  /** Show back button */
  showBack?: boolean;
  /** Back button click handler */
  onBack?: () => void;
  /** Breadcrumbs */
  breadcrumbs?: Breadcrumb[];
  /** Action buttons (right side) */
  actions?: ReactNode;
  /** Additional className */
  className?: string;
}

/**
 * PageHeader Component
 *
 * @example
 * ```tsx
 * // Basic
 * <PageHeader title="Dashboard" />
 *
 * // With back button
 * <PageHeader
 *   title="Edit Profile"
 *   showBack
 *   onBack={() => navigate(-1)}
 * />
 *
 * // With breadcrumbs and actions
 * <PageHeader
 *   title="New RFP"
 *   breadcrumbs={[
 *     { label: 'Apps', href: '/apps' },
 *     { label: 'RFP Evaluation', href: '/apps/rfp' },
 *     { label: 'New' }
 *   ]}
 *   actions={<Button>Save</Button>}
 * />
 * ```
 */
export function PageHeader({
  title,
  subtitle,
  showBack = false,
  onBack,
  breadcrumbs,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        'border-b border-border-default bg-background-primary',
        className
      )}
    >
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-3" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm">
              {breadcrumbs.map((crumb, index) => (
                <li key={index} className="flex items-center gap-2">
                  {index > 0 && (
                    <ChevronLeftIcon className="w-4 h-4 text-text-tertiary rotate-180" />
                  )}
                  {crumb.href ? (
                    <a
                      href={crumb.href}
                      className="text-text-secondary hover:text-text-primary transition-colors"
                    >
                      {crumb.label}
                    </a>
                  ) : (
                    <span className="text-text-primary font-medium">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Header content */}
        <div className="flex items-start justify-between gap-4">
          {/* Left: Back button + Title */}
          <div className="flex items-start gap-3 flex-1 min-w-0">
            {/* Back button */}
            {showBack && (
              <button
                onClick={onBack}
                className={cn(
                  'flex-shrink-0 p-2 -m-2',
                  'text-text-secondary hover:text-text-primary',
                  'hover:bg-background-secondary rounded-lg',
                  'transition-colors',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary'
                )}
                aria-label="Go back"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
            )}

            {/* Title and subtitle */}
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-semibold text-text-primary truncate">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-1 text-sm text-text-secondary line-clamp-2">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Right: Actions */}
          {actions && (
            <div className="flex-shrink-0 flex items-center gap-2">
              {actions}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

PageHeader.displayName = 'PageHeader';
