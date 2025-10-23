/**
 * StatusPill Component
 * Displays inline status badges for data items (different from app-level StatusBadge)
 * Single Responsibility: Render inline status indicators with semantic colors
 *
 * Examples: "Matched", "Review", "Active", "Pending", "Approved", etc.
 * Used in: Tables and lists across all detail screens
 * Replaces: 45+ lines of duplicate inline badge code
 *
 * TAILWIND FIX: Uses explicit class mapping for production build compatibility
 */

export type PillVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

export interface StatusPillProps {
  /** Status label text */
  label: string;
  /** Color variant for the pill */
  variant: PillVariant;
  /** Size variant (default: 'md') */
  size?: 'sm' | 'md';
}

const VARIANT_CLASSES: Record<PillVariant, string> = {
  success: 'bg-success-bg text-success-text',
  warning: 'bg-warning-bg text-warning-text',
  danger: 'bg-danger-bg text-danger-text',
  info: 'bg-info-bg text-info-text',
  neutral: 'bg-background-tertiary text-text-secondary',
};

const SIZE_CLASSES = {
  sm: 'px-1.5 py-0.5 text-xs',
  md: 'px-2 py-1 text-xs',
};

export function StatusPill({ label, variant, size = 'md' }: StatusPillProps) {
  const variantClass = VARIANT_CLASSES[variant];
  const sizeClass = SIZE_CLASSES[size];

  return (
    <span className={`rounded font-medium ${variantClass} ${sizeClass}`}>
      {label}
    </span>
  );
}
