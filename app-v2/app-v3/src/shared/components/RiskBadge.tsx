/**
 * RiskBadge Component
 * Displays risk level indicators (High/Medium/Low) with semantic colors
 * Single Responsibility: Render risk badges with proper styling
 *
 * Used in: Contract review screens for flagged clauses and risk assessment
 * Eliminates: Duplicate risk badge rendering and Tailwind dynamic class issues
 *
 * TAILWIND FIX: Uses explicit class mapping for production build compatibility
 */

import { AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export type RiskLevel = 'High' | 'Medium' | 'Low';

export interface RiskBadgeProps {
  /** Risk level */
  level: RiskLevel;
  /** Show icon (default: true) */
  showIcon?: boolean;
  /** Size variant (default: 'md') */
  size?: 'sm' | 'md';
}

interface RiskConfig {
  icon: LucideIcon;
  badge: string;
  iconClass: string;
}

const RISK_CONFIG: Record<RiskLevel, RiskConfig> = {
  High: {
    icon: AlertTriangle,
    badge: 'bg-danger-bg text-danger-text',
    iconClass: 'text-danger',
  },
  Medium: {
    icon: AlertCircle,
    badge: 'bg-warning-bg text-warning-text',
    iconClass: 'text-warning',
  },
  Low: {
    icon: Info,
    badge: 'bg-info-bg text-info-text',
    iconClass: 'text-info',
  },
};

const SIZE_CLASSES = {
  sm: { badge: 'px-1.5 py-0.5 text-xs', icon: 'h-3 w-3' },
  md: { badge: 'px-2 py-1 text-xs', icon: 'h-4 w-4' },
};

export function RiskBadge({ level, showIcon = true, size = 'md' }: RiskBadgeProps) {
  const config = RISK_CONFIG[level];
  const sizeClass = SIZE_CLASSES[size];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 rounded font-medium ${config.badge} ${sizeClass.badge}`}>
      {showIcon && <Icon className={`${sizeClass.icon} ${config.iconClass}`} />}
      <span>{level} Risk</span>
    </span>
  );
}
