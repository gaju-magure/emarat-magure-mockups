/**
 * Insight Types
 *
 * Type definitions for AI-powered insights feed
 */

export type InsightType = 'metric' | 'alert' | 'achievement' | 'suggestion';

export interface InsightMetadata {
  /** Trend direction */
  trend?: 'up' | 'down' | 'neutral';
  /** Numeric value */
  value?: number;
  /** Unit (e.g., 'AED', '%', 'items') */
  unit?: string;
  /** Icon suggestion */
  icon?: string;
  /** Color theme */
  color?: 'success' | 'warning' | 'danger' | 'info' | 'primary';
}

export interface InsightAction {
  label: string;
  href: string;
}

export interface Insight {
  id: string;
  type: InsightType;
  title: string;
  content: string;
  timestamp: Date | string;
  metadata?: InsightMetadata;
  action?: InsightAction;
  /** User has seen this insight */
  seen?: boolean;
  /** User has dismissed this insight */
  dismissed?: boolean;
}
