/**
 * TrendIndicator Component
 * Displays trend arrows with percentage changes
 * Single Responsibility: Render trend indicators with proper colors and icons
 *
 * Used in: Stats grids, forecast tables, customer analytics
 * Replaces: 30+ lines of duplicate trend rendering code
 */

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export type TrendDirection = 'up' | 'down' | 'stable';

export interface TrendIndicatorProps {
  /** Trend value (e.g., "+18%", "-5%", "0%") */
  value: string;
  /** Trend direction (auto-detected from value if not provided) */
  direction?: TrendDirection;
  /** Show icon (default: true) */
  showIcon?: boolean;
  /** Size variant (default: 'md') */
  size?: 'sm' | 'md';
  /** Color scheme - 'semantic' treats up=success, down=danger (default for financial data),
   * 'neutral' treats all trends as neutral */
  colorScheme?: 'semantic' | 'neutral';
}

const TREND_ICONS = {
  up: TrendingUp,
  down: TrendingDown,
  stable: Minus,
};

const SIZE_CLASSES = {
  sm: { text: 'text-xs', icon: 'h-3 w-3' },
  md: { text: 'text-sm', icon: 'h-4 w-4' },
};

export function TrendIndicator({
  value,
  direction,
  showIcon = true,
  size = 'md',
  colorScheme = 'semantic'
}: TrendIndicatorProps) {
  // Auto-detect direction from value if not provided
  const detectedDirection: TrendDirection = direction || (
    value.startsWith('+') ? 'up' :
    value.startsWith('-') ? 'down' :
    'stable'
  );

  const Icon = TREND_ICONS[detectedDirection];
  const sizeClass = SIZE_CLASSES[size];

  // Color classes based on scheme
  const colorClass = colorScheme === 'semantic'
    ? detectedDirection === 'up' ? 'text-success' :
      detectedDirection === 'down' ? 'text-danger' :
      'text-text-tertiary'
    : 'text-text-secondary';

  return (
    <span className={`inline-flex items-center gap-1 ${colorClass} ${sizeClass.text} font-medium`}>
      {showIcon && <Icon className={sizeClass.icon} />}
      <span>{value}</span>
    </span>
  );
}
