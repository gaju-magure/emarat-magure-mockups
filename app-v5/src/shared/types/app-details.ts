/**
 * Shared TypeScript types for app detail screens
 * Ensures consistency and type safety across all detail components
 */

import { LucideIcon } from 'lucide-react';

/**
 * Status badge variants used across app detail screens
 */
export type AppStatus = 'Live' | 'In Development' | 'Planned';

/**
 * Status types for various UI elements
 */
export type StatusVariant = 'success' | 'warning' | 'danger' | 'info';

/**
 * Statistic card data structure
 */
export interface StatItem {
  label: string;
  value: string;
  change: string;
  icon: LucideIcon;
}

/**
 * Insight card data structure for AI recommendations
 */
export interface InsightItem {
  title: string;
  type: StatusVariant;
  icon: LucideIcon;
  message: string;
}

/**
 * Props for app detail header component
 */
export interface AppDetailHeaderProps {
  title: string;
  subtitle: string;
  status: AppStatus;
  onClose: () => void;
}

/**
 * Props for stats grid component
 */
export interface StatsGridProps {
  stats: StatItem[];
}

/**
 * Props for status badge component
 */
export interface StatusBadgeProps {
  status: AppStatus;
}

/**
 * Props for insight card component
 */
export interface InsightCardProps {
  insight: InsightItem;
}

/**
 * Status badge configuration mapping
 */
export interface StatusConfig {
  bgClass: string;
  textClass: string;
  borderClass: string;
}

/**
 * Insight card color classes mapping
 */
export interface InsightColorClasses {
  container: string;
  icon: string;
  title: string;
}
