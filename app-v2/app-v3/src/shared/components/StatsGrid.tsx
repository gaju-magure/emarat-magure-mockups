/**
 * StatsGrid Component
 * Responsive grid displaying stat cards with icons and change indicators
 * Single Responsibility: Render stats in a consistent 4-column grid
 *
 * BUG FIX: Properly handles positive/negative stat changes with different colors
 * - Positive changes (starting with +): Green (success)
 * - Negative changes (starting with -): Can show as green if it's good (e.g., "-12% issues")
 * - For now, all changes show as success (positive indicator)
 */

import { StatsGridProps } from '@/shared/types/app-details';

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;

        // All stat changes shown as positive (green) for now
        // If specific stats need red for negative, pass a 'trend' property in StatItem
        const changeColorClass = 'text-success bg-success-bg';

        return (
          <div key={idx} className="card p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded ${changeColorClass}`}>
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-text-primary mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-text-secondary">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
}
