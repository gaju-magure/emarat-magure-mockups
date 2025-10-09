/**
 * MobileBottomNav Component
 *
 * Bottom navigation bar for mobile devices
 * Fixed at bottom with 4-5 main navigation items
 * Includes badge support for notifications
 */

import React from 'react';
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
  activeRoute = '/',
  onNavigate,
  className,
}: MobileBottomNavProps) {
  const handleNavigate = (href: string) => {
    if (onNavigate) {
      onNavigate(href);
    }
  };

  return (
    <nav
      className={cn(
        'fixed bottom-0 inset-x-0 z-40',
        'bg-background-elevated border-t border-border-default',
        'safe-area-inset-bottom', // For devices with notches
        className
      )}
    >
      <div className="flex items-center justify-around h-16 px-2">
        {NAV_ITEMS.map((item) => {
          const isActive = activeRoute === item.href;
          const IconComponent = isActive ? item.iconSolid : item.icon;

          return (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.href)}
              className={cn(
                'flex flex-col items-center justify-center',
                'min-w-[64px] h-full px-3 py-2',
                'transition-colors duration-200',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                'rounded-lg'
              )}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* Icon with badge */}
              <div className="relative mb-1">
                <IconComponent
                  className={cn(
                    'w-6 h-6 transition-colors',
                    isActive
                      ? 'text-primary'
                      : 'text-text-tertiary'
                  )}
                />

                {/* Badge */}
                {item.badge && (
                  <span
                    className={cn(
                      'absolute -top-1 -end-1',
                      'min-w-[16px] h-[16px] px-1',
                      'flex items-center justify-center',
                      'bg-danger text-white',
                      'text-[10px] font-bold rounded-full',
                      'ring-2 ring-background-elevated'
                    )}
                  >
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </div>

              {/* Label */}
              <span
                className={cn(
                  'text-[11px] font-medium',
                  isActive
                    ? 'text-primary'
                    : 'text-text-tertiary'
                )}
              >
                {item.label}
              </span>

              {/* Active indicator */}
              {isActive && (
                <div
                  className="absolute top-0 inset-x-0 h-0.5 bg-primary rounded-b"
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

MobileBottomNav.displayName = 'MobileBottomNav';
