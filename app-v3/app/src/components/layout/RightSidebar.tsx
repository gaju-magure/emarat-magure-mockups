/**
 * RightSidebar Component
 *
 * Widgets sidebar for quick access to stats, calendar, links, and team status
 * Visible on desktop (xl breakpoint) only
 */

import React from 'react';
import { cn } from '@/utils/classnames';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatNumber } from '@/utils/numbers';

export interface RightSidebarProps {
  /** Additional className */
  className?: string;
}

/**
 * RightSidebar Component
 *
 * @example
 * ```tsx
 * <RightSidebar />
 * ```
 */
export function RightSidebar({ className }: RightSidebarProps) {
  const { t } = useLanguage();

  return (
    <div className={cn('p-6 space-y-6', className)}>
      {/* Quick Stats Widget */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-text-primary">
          Quick Stats
        </h3>
        <div className="space-y-2">
          <StatItem
            label="Active Tasks"
            value="12"
            trend="+2"
            trendUp
          />
          <StatItem
            label="Pending Approvals"
            value="5"
            trend="-1"
            trendUp={false}
          />
          <StatItem
            label="Completed Today"
            value="8"
            trend="+3"
            trendUp
          />
        </div>
      </div>

      {/* Calendar Widget Placeholder */}
      <div className="p-4 glass rounded-lg border border-white/10">
        <h3 className="text-sm font-semibold text-text-primary mb-3">
          Calendar
        </h3>
        <div className="flex items-center justify-center h-32 text-text-tertiary text-sm">
          Calendar Widget
        </div>
      </div>

      {/* Quick Links Widget */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-text-primary">
          Quick Links
        </h3>
        <div className="space-y-1">
          <QuickLink label="New RFP Evaluation" href="/apps/rfp/new" />
          <QuickLink label="View Reports" href="/reports" />
          <QuickLink label="Team Dashboard" href="/team" />
          <QuickLink label="Help Center" href="/help" />
        </div>
      </div>

      {/* Team Status Widget */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-text-primary">
          Team Status
        </h3>
        <div className="space-y-2">
          <TeamMember
            name="Ahmed Hassan"
            status="online"
            role="Procurement"
          />
          <TeamMember
            name="Fatima Ali"
            status="busy"
            role="Finance"
          />
          <TeamMember
            name="Mohammed Said"
            status="away"
            role="Legal"
          />
          <TeamMember
            name="Layla Omar"
            status="offline"
            role="Operations"
          />
        </div>
      </div>
    </div>
  );
}

/**
 * StatItem Component
 */
interface StatItemProps {
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
}

function StatItem({ label, value, trend, trendUp }: StatItemProps) {
  return (
    <div className="flex items-center justify-between p-3 glass rounded-lg border border-white/10">
      <span className="text-sm text-text-secondary">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-lg font-semibold text-text-primary">{value}</span>
        <span
          className={cn(
            'text-xs font-medium px-1.5 py-0.5 rounded',
            trendUp
              ? 'text-success-text bg-success-bg'
              : 'text-danger-text bg-danger-bg'
          )}
        >
          {trend}
        </span>
      </div>
    </div>
  );
}

/**
 * QuickLink Component
 */
interface QuickLinkProps {
  label: string;
  href: string;
}

function QuickLink({ label, href }: QuickLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        'block px-3 py-2 rounded-lg',
        'text-sm text-text-secondary hover:text-text-primary',
        'hover:bg-white/5 hover-lift',
        'transition-colors'
      )}
    >
      {label}
    </a>
  );
}

/**
 * TeamMember Component
 */
interface TeamMemberProps {
  name: string;
  status: 'online' | 'offline' | 'away' | 'busy';
  role: string;
}

function TeamMember({ name, status, role }: TeamMemberProps) {
  const statusColors = {
    online: 'bg-success-border',
    offline: 'bg-text-tertiary',
    away: 'bg-warning-border',
    busy: 'bg-danger-border',
  };

  return (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 hover-lift transition-colors">
      {/* Avatar with status */}
      <div className="relative">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-medium">
          {name.split(' ').map(n => n[0]).join('')}
        </div>
        <span
          className={cn(
            'absolute bottom-0 end-0 w-2.5 h-2.5 rounded-full',
            'ring-2 ring-white/20',
            statusColors[status]
          )}
        />
      </div>

      {/* Name and role */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text-primary truncate">{name}</p>
        <p className="text-xs text-text-tertiary truncate">{role}</p>
      </div>
    </div>
  );
}

RightSidebar.displayName = 'RightSidebar';
