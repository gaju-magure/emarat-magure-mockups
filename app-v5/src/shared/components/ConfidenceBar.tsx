/**
 * ConfidenceBar Component
 * Displays confidence/progress percentage with color-coded visualization
 * Single Responsibility: Render confidence bars with threshold-based colors
 *
 * Used in: Invoice Reconciliation, RFP Evaluation, Demand Forecasting screens
 * Replaces: 65+ lines of duplicate confidence bar code
 */

export interface ConfidenceBarProps {
  /** Confidence value (0-100) */
  value: number;
  /** Show percentage label next to bar (default: true) */
  showLabel?: boolean;
  /** Size variant (default: 'md') */
  size?: 'sm' | 'md' | 'lg';
  /** Custom thresholds for color changes (defaults: success >= 90, warning >= 80) */
  thresholds?: {
    success?: number;
    warning?: number;
  };
}

export function ConfidenceBar({
  value,
  showLabel = true,
  size = 'md',
  thresholds = {}
}: ConfidenceBarProps) {
  const successThreshold = thresholds.success ?? 90;
  const warningThreshold = thresholds.warning ?? 80;

  // Determine color based on thresholds
  const colorClass =
    value >= successThreshold ? 'bg-success' :
    value >= warningThreshold ? 'bg-warning' :
    'bg-danger';

  // Size configurations
  const sizeClasses = {
    sm: { container: 'max-w-[80px] h-1.5', text: 'text-xs' },
    md: { container: 'max-w-[100px] h-2', text: 'text-sm' },
    lg: { container: 'max-w-[120px] h-2.5', text: 'text-base' },
  };

  const classes = sizeClasses[size];

  return (
    <div className="flex items-center gap-2">
      <div className={`flex-1 ${classes.container} bg-background-tertiary rounded-full overflow-hidden`}>
        <div
          className={`h-full ${colorClass}`}
          style={{ width: `${value}%` }}
        />
      </div>
      {showLabel && (
        <span className={`font-medium text-text-primary ${classes.text}`}>
          {value}%
        </span>
      )}
    </div>
  );
}
