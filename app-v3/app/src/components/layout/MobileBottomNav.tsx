/**
 * MobileBottomNav Component
 *
 * Bottom navigation bar for mobile devices
 * Fixed at bottom with 4-5 main navigation items
 * Includes badge support for notifications
 */


import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/utils/classnames';
import {
  HomeIcon,
  Squares2X2Icon,
  CheckCircleIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeIconSolid,
  Squares2X2Icon as Squares2X2IconSolid,
  CheckCircleIcon as CheckCircleIconSolid,
  EllipsisHorizontalIcon as EllipsisHorizontalIconSolid,
} from '@heroicons/react/24/solid';

export interface MobileNavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  iconSolid: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: number;
}

export interface MobileBottomNavProps {
  /** Current active route */
  activeRoute?: string;
  /** Navigation click handler */
  onNavigate?: (href: string) => void;
  /** Additional className */
  className?: string;
}

const NAV_ITEMS: MobileNavItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: HomeIcon,
    iconSolid: HomeIconSolid,
    href: '/',
  },
  {
    id: 'apps',
    label: 'Apps',
    icon: Squares2X2Icon,
    iconSolid: Squares2X2IconSolid,
    href: '/apps',
  },
  {
    id: 'tasks',
    label: 'Tasks',
    icon: CheckCircleIcon,
    iconSolid: CheckCircleIconSolid,
    href: '/tasks',
    badge: 5,
  },
  {
    id: 'more',
    label: 'More',
    icon: EllipsisHorizontalIcon,
    iconSolid: EllipsisHorizontalIconSolid,
    href: '/more',
  },
];

/**
 * MobileBottomNav Component
 *
 * @example
 * ```tsx
 * <MobileBottomNav
 *   activeRoute="/apps"
 *   onNavigate={(href) => navigate(href)}
 * />
 * ```
 */
export function MobileBottomNav({
  activeRoute,
  className,
}: MobileBottomNavProps) {
  const location = useLocation();

  // Use location.pathname if activeRoute not provided
  const currentRoute = activeRoute || location.pathname;

  return (
    <nav
      className={cn(
        'backdrop-blur-xl p-3',
        'safe-area-inset-bottom', // For devices with notches
        className
      )}
    >
      <div className="flex items-center justify-center gap-4">
        {NAV_ITEMS.map((item) => {
          const isActive = currentRoute === item.href;
          const IconComponent = isActive ? item.iconSolid : item.icon;

          return (
            <Link
              key={item.id}
              to={item.href}
              className={cn(
                'flex flex-col items-center justify-center',
                'p-2 rounded-xl',
                'transition-all duration-200 relative group',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                isActive
                  ? 'bg-primary/10 shadow-lg shadow-primary/20'
                  : 'hover:bg-primary/10'
              )}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* Icon with badge */}
              <div className="relative">
                <div className="w-5 h-5 flex items-center justify-center">
                  <IconComponent
                    className={cn(
                      'w-5 h-5 transition-all duration-200',
                      isActive
                        ? 'text-primary'
                        : 'text-text-tertiary'
                    )}
                  />
                </div>

                {/* Badge */}
                {item.badge && (
                  <span
                    className={cn(
                      'absolute -top-1.5 -end-1.5',
                      'min-w-[14px] h-[14px] px-0.5',
                      'flex items-center justify-center',
                      'bg-gradient-to-br from-danger to-danger/80',
                      'text-white shadow-lg shadow-danger/30',
                      'text-[8px] font-bold rounded-full',
                      'ring-1 ring-background-elevated',
                      'animate-pulse-glow'
                    )}
                  >
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </div>

              {/* Label */}
              <span
                className={cn(
                  'text-[10px] font-medium mt-0.5',
                  isActive ? 'text-primary' : 'text-text-tertiary'
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

MobileBottomNav.displayName = 'MobileBottomNav';
