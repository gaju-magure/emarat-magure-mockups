/**
 * LeftSidebar Component
 *
 * Icon-based navigation sidebar with expandable labels on hover
 * Main navigation for the application (Home, Apps, Tasks, Governance, Profile)
 */

import React, { useState } from 'react';
import { cn } from '@/utils/classnames';
import { Logo } from '@/components/atoms/Logo';
import {
  HomeIcon,
  Squares2X2Icon,
  CheckCircleIcon,
  ShieldCheckIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: number;
}

export interface LeftSidebarProps {
  /** Current active route */
  activeRoute?: string;
  /** Navigation click handler */
  onNavigate?: (href: string) => void;
  /** Additional className */
  className?: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: HomeIcon,
    href: '/',
  },
  {
    id: 'apps',
    label: 'Apps',
    icon: Squares2X2Icon,
    href: '/apps',
  },
  {
    id: 'tasks',
    label: 'Tasks',
    icon: CheckCircleIcon,
    href: '/tasks',
    badge: 5,
  },
  {
    id: 'governance',
    label: 'Governance',
    icon: ShieldCheckIcon,
    href: '/governance',
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: UserCircleIcon,
    href: '/profile',
  },
];

/**
 * LeftSidebar Component
 *
 * @example
 * ```tsx
 * <LeftSidebar
 *   activeRoute="/apps"
 *   onNavigate={(href) => navigate(href)}
 * />
 * ```
 */
export function LeftSidebar({
  activeRoute = '/',
  onNavigate,
  className,
}: LeftSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleNavigate = (href: string) => {
    if (onNavigate) {
      onNavigate(href);
    }
  };

  return (
    <div
      className={cn(
        'flex flex-col',
        'transition-all duration-300 ease-in-out',
        isExpanded ? 'w-56' : 'w-16',
        className
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Navigation - no logo */}
      <nav className="py-3">
        <ul className="space-y-2 px-2">
          {NAV_ITEMS.map((item) => {
            const isActive = activeRoute === item.href;
            const IconComponent = item.icon;

            return (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigate(item.href)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-3 rounded-xl',
                    'text-text-secondary hover:text-text-primary',
                    'hover:bg-white/5 hover-lift',
                    'transition-all duration-200',
                    'group relative',
                    isActive && [
                      'bg-primary/10 text-primary',
                      'hover:bg-primary/15 hover:text-primary',
                      'shadow-lg shadow-primary/20',
                    ]
                  )}
                  aria-label={item.label}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {/* Icon */}
                  <div className="relative flex-shrink-0">
                    <IconComponent className="w-6 h-6" />

                    {/* Badge */}
                    {item.badge && (
                      <span
                        className={cn(
                          'absolute -top-1 -end-1',
                          'min-w-[18px] h-[18px] px-1',
                          'flex items-center justify-center',
                          'bg-danger text-white',
                          'text-xs font-medium rounded-full',
                          'ring-2 ring-background-elevated'
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Label (visible when expanded) */}
                  <span
                    className={cn(
                      'font-medium whitespace-nowrap transition-all duration-300',
                      isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                    )}
                  >
                    {item.label}
                  </span>

                  {/* Active indicator */}
                  {isActive && (
                    <div
                      className={cn(
                        'absolute inset-y-0 start-0 w-1 bg-primary rounded-e',
                        'transition-all duration-200'
                      )}
                    />
                  )}

                  {/* Tooltip (visible when NOT expanded) */}
                  {!isExpanded && (
                    <div
                      className={cn(
                        'absolute start-full ms-2 px-3 py-2',
                        'glass border border-white/20 rounded-lg shadow-lg',
                        'text-sm font-medium text-text-primary whitespace-nowrap',
                        'opacity-0 group-hover:opacity-100',
                        'pointer-events-none transition-opacity duration-200',
                        'z-50'
                      )}
                    >
                      {item.label}
                      {item.badge && (
                        <span className="ms-2 px-1.5 py-0.5 bg-danger text-white text-xs rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom section (Settings, etc.) */}
      <div className="border-t border-white/10 py-2 px-2 mt-2">
        <button
          className={cn(
            'w-full flex items-center gap-3 px-3 py-3 rounded-xl relative group',
            'text-text-secondary hover:text-text-primary',
            'hover:bg-white/5 hover-lift',
            'transition-all duration-200'
          )}
          aria-label="Settings"
        >
          <div className="relative flex-shrink-0">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <span
            className={cn(
              'font-medium whitespace-nowrap transition-all duration-300',
              isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
            )}
          >
            Settings
          </span>

          {/* Tooltip (visible when NOT expanded) */}
          {!isExpanded && (
            <div
              className={cn(
                'absolute start-full ms-2 px-3 py-2',
                'glass border border-white/20 rounded-lg shadow-lg',
                'text-sm font-medium text-text-primary whitespace-nowrap',
                'opacity-0 group-hover:opacity-100',
                'pointer-events-none transition-opacity duration-200',
                'z-50'
              )}
            >
              Settings
            </div>
          )}
        </button>
      </div>
    </div>
  );
}

LeftSidebar.displayName = 'LeftSidebar';
