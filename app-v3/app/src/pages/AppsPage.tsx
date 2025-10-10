/**
 * AppsPage Component
 *
 * Main apps listing page showing all available applications
 * Features: Grid layout, search, filtering by category
 */

import { useState, useMemo } from 'react';
import { cn } from '@/utils/classnames';
import { AppCard } from '@/components/organisms/AppCard';
import { Input } from '@/components/atoms/Input';
import { Badge } from '@/components/atoms/Badge';
import { APPS, searchApps, getAppsByCategory, type App } from '@/config/apps.config';
import { useAuth } from '@/contexts/AuthContext';
import { MagnifyingGlassIcon, Squares2X2Icon, RectangleStackIcon, ChartBarIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

type CategoryFilter = 'all' | 'core' | 'analytics' | 'management' | 'settings';

export interface AppsPageProps {
  /** Additional className */
  className?: string;
}

/**
 * AppsPage Component
 *
 * @example
 * ```tsx
 * <AppsPage />
 * ```
 */
export function AppsPage({ className }: AppsPageProps) {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');

  // Filter apps based on search and category
  const filteredApps = useMemo(() => {
    let apps: App[] = APPS;

    // Filter by category
    if (categoryFilter !== 'all') {
      apps = getAppsByCategory(categoryFilter);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      apps = searchApps(searchQuery);
      // If category filter is active, further filter by category
      if (categoryFilter !== 'all') {
        apps = apps.filter((app) => app.category === categoryFilter);
      }
    }

    // Filter by user role (only show apps user has access to)
    if (user?.role) {
      apps = apps.filter((app) => !app.roles || app.roles.includes(user.role));
    }

    return apps;
  }, [searchQuery, categoryFilter, user]);

  // Category badges with counts
  const categories: { id: CategoryFilter; label: string; icon: React.ComponentType<{ className?: string }>; count: number }[] = [
    {
      id: 'all',
      label: 'All Apps',
      icon: Squares2X2Icon,
      count: APPS.length,
    },
    {
      id: 'core',
      label: 'Core',
      icon: RectangleStackIcon,
      count: getAppsByCategory('core').length,
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: ChartBarIcon,
      count: getAppsByCategory('analytics').length,
    },
    {
      id: 'management',
      label: 'Management',
      icon: RectangleStackIcon,
      count: getAppsByCategory('management').length,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Cog6ToothIcon,
      count: getAppsByCategory('settings').length,
    },
  ];

  // Calculate total badge count across all apps
  const totalBadges = filteredApps.reduce((sum, app) => sum + (app.badge || 0), 0);

  return (
    <div className={cn('min-h-screen bg-background-primary', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Header */}
        <header className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-text-primary">Applications</h1>
              <p className="text-sm text-text-secondary mt-1">
                Explore all available apps and features
              </p>
            </div>
            {totalBadges > 0 && (
              <Badge variant="primary" size="lg">
                {totalBadges} pending
              </Badge>
            )}
          </div>
        </header>

        {/* Search Bar */}
        <div className="w-full max-w-2xl">
          <Input
            type="search"
            placeholder="Search apps by name, description, or features..."
            value={searchQuery}
            onChange={setSearchQuery}
            icon={<MagnifyingGlassIcon className="w-5 h-5" />}
            aria-label="Search applications"
          />
        </div>

        {/* Category Filters */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = categoryFilter === category.id;

            return (
              <button
                key={category.id}
                onClick={() => setCategoryFilter(category.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap',
                  'focus:outline-none focus:ring-2 focus:ring-border-focus',
                  isActive
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-background-secondary text-text-secondary hover:bg-background-tertiary hover:text-text-primary'
                )}
                aria-pressed={isActive}
                aria-label={`Filter by ${category.label}`}
              >
                <Icon className="w-4 h-4" />
                <span>{category.label}</span>
                <span
                  className={cn(
                    'px-2 py-0.5 rounded-full text-xs font-semibold',
                    isActive ? 'bg-white/20' : 'bg-background-primary text-text-tertiary'
                  )}
                >
                  {category.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Apps Grid */}
        {filteredApps.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {filteredApps.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        ) : (
          // Empty State
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="w-16 h-16 rounded-full bg-background-tertiary flex items-center justify-center mb-4">
              <MagnifyingGlassIcon className="w-8 h-8 text-text-tertiary" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">No apps found</h3>
            <p className="text-sm text-text-secondary max-w-md">
              {searchQuery
                ? `No apps match "${searchQuery}". Try different keywords or clear the search.`
                : 'No apps available in this category.'}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 px-4 py-2 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary-600 transition-colors"
              >
                Clear search
              </button>
            )}
          </div>
        )}

        {/* Footer Info */}
        {filteredApps.length > 0 && (
          <div className="flex items-center justify-between pt-4 border-t border-border-primary">
            <p className="text-sm text-text-tertiary">
              Showing <span className="font-semibold text-text-secondary">{filteredApps.length}</span> of{' '}
              <span className="font-semibold text-text-secondary">{APPS.length}</span> apps
            </p>
            {user?.role && (
              <p className="text-sm text-text-tertiary">
                Access level: <span className="font-semibold text-text-secondary capitalize">{user.role}</span>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

AppsPage.displayName = 'AppsPage';
