/**
 * Confidence Utilities
 * Helper functions for confidence/score calculations and color mapping
 * Single Responsibility: Centralize confidence-related logic
 */

export type ConfidenceLevel = 'high' | 'medium' | 'low';

export interface ConfidenceColorClasses {
  bg: string;
  text: string;
  border: string;
}

/**
 * Determine confidence level based on value
 * @param value - Confidence percentage (0-100)
 * @param thresholds - Custom thresholds (defaults: high >= 90, medium >= 80)
 */
export function getConfidenceLevel(
  value: number,
  thresholds = { high: 90, medium: 80 }
): ConfidenceLevel {
  if (value >= thresholds.high) return 'high';
  if (value >= thresholds.medium) return 'medium';
  return 'low';
}

/**
 * Get Tailwind color classes for confidence value
 * IMPORTANT: Uses explicit class names for Tailwind JIT/tree-shaking compatibility
 */
export function getConfidenceColorClasses(
  value: number,
  thresholds = { high: 90, medium: 80 }
): ConfidenceColorClasses {
  const level = getConfidenceLevel(value, thresholds);

  const COLOR_MAP: Record<ConfidenceLevel, ConfidenceColorClasses> = {
    high: {
      bg: 'bg-success',
      text: 'text-success',
      border: 'border-success'
    },
    medium: {
      bg: 'bg-warning',
      text: 'text-warning',
      border: 'border-warning'
    },
    low: {
      bg: 'bg-danger',
      text: 'text-danger',
      border: 'border-danger'
    },
  };

  return COLOR_MAP[level];
}
