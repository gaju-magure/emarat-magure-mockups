/**
 * FilterTabs Component
 * Reusable horizontal filter/category tabs with active state
 * Single Responsibility: Render filter tabs with consistent styling
 *
 * Used in: AppsScreen, TasksScreen (eliminates duplicate code)
 * Replaces: 30+ lines of duplicate filter tab code
 *
 * Features:
 * - Horizontal scrollable layout (overflow-x-auto)
 * - Active state highlighting
 * - Responsive with proper touch targets
 * - Consistent transition effects
 */

export interface FilterTabsProps {
  /** Array of filter/category items to display */
  items: string[];
  /** Currently active item */
  activeItem: string;
  /** Callback when item is clicked */
  onChange: (item: string) => void;
  /** Optional CSS class for container */
  className?: string;
}

export function FilterTabs({
  items,
  activeItem,
  onChange,
  className = ''
}: FilterTabsProps) {
  return (
    <div className={`flex gap-2 overflow-x-auto pb-2 ${className}`}>
      {items.map((item) => {
        const isActive = item === activeItem;

        return (
          <button
            key={item}
            onClick={() => onChange(item)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              isActive
                ? 'bg-primary text-white'
                : 'bg-background-secondary text-text-secondary hover:bg-background-tertiary hover:text-text-primary'
            }`}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}
