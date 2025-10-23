/**
 * MetricsGrid Component
 * Reusable 3-column metrics display grid
 * Single Responsibility: Render metric grids with consistent styling
 *
 * Used in: AppCard, detail screens, any 3-column data display
 * Replaces: 30+ lines of duplicate 3-column grid code
 *
 * Features:
 * - Responsive 3-column grid
 * - Label + value pattern
 * - Optional highlight for specific metrics
 */

export interface MetricItem {
  /** Metric label (e.g., "Users", "Accuracy") */
  label: string;
  /** Metric value (e.g., "45", "94%") */
  value: string;
  /** Apply accent color to value (default: false) */
  highlight?: boolean;
}

export interface MetricsGridProps {
  /** Array of metrics to display */
  metrics: MetricItem[];
  /** Optional CSS classes */
  className?: string;
}

export function MetricsGrid({ metrics, className = '' }: MetricsGridProps) {
  return (
    <div className={`grid grid-cols-3 gap-3 pt-4 border-t border-border ${className}`}>
      {metrics.map((metric, idx) => (
        <div key={idx}>
          <div className="text-xs text-text-tertiary mb-1">
            {metric.label}
          </div>
          <div className={`text-sm font-semibold ${
            metric.highlight ? 'text-primary' : 'text-text-primary'
          }`}>
            {metric.value}
          </div>
        </div>
      ))}
    </div>
  );
}
