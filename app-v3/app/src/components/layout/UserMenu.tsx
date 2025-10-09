/**
 * UserMenu Component
 *
 * User avatar dropdown with profile, settings, and logout options
 * Displays current user info and quick actions
 */

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/utils/classnames';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar } from '@/components/atoms/Avatar';
import { Badge } from '@/components/atoms/Badge';
import {
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';

export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  href?: string;
  onClick?: () => void;
  badge?: string;
  variant?: 'default' | 'danger';
  divider?: boolean;
}

export interface UserMenuProps {
  /** Additional menu items */
  menuItems?: MenuItem[];
  /** Additional className */
  className?: string;
}

/**
 * UserMenu Component
 *
 * @example
 * ```tsx
 * <UserMenu />
 *
 * // With custom menu items
 * <UserMenu
 *   menuItems={[
 *     { id: 'team', label: 'Team Settings', icon: UsersIcon, href: '/team' }
 *   ]}
 * />
 * ```
 */
export function UserMenu({ menuItems = [], className }: UserMenuProps) {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  // Default menu items
  const defaultMenuItems: MenuItem[] = [
    {
      id: 'profile',
      label: t('nav.profile') || 'Profile',
      icon: UserCircleIcon,
      href: '/profile',
    },
    {
      id: 'settings',
      label: t('common.settings') || 'Settings',
      icon: Cog6ToothIcon,
      href: '/settings',
    },
    {
      id: 'divider-1',
      label: '',
      divider: true,
    },
    {
      id: 'logout',
      label: t('common.logout') || 'Logout',
      icon: ArrowRightOnRectangleIcon,
      onClick: logout,
      variant: 'danger',
    },
  ];

  // Combine custom items with default items
  const allMenuItems = [...menuItems, ...defaultMenuItems];

  const handleMenuItemClick = (item: MenuItem) => {
    if (item.onClick) {
      item.onClick();
    }
    if (item.href) {
      window.location.href = item.href;
    }
    setIsOpen(false);
  };

  if (!user) {
    return null;
  }

  return (
    <div className={cn('relative', className)}>
      {/* User Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-2 py-1.5 rounded-lg',
          'hover:bg-background-secondary',
          'transition-colors',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary'
        )}
        aria-label="User menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {/* Avatar */}
        <Avatar name={user.name} src={user.avatar} size="sm" status="online" />

        {/* Name (hidden on mobile) */}
        <div className="hidden sm:block text-start">
          <p className="text-sm font-medium text-text-primary truncate max-w-[120px]">
            {user.name}
          </p>
          <p className="text-xs text-text-tertiary truncate max-w-[120px]">
            {user.title || user.role}
          </p>
        </div>

        {/* Chevron */}
        <ChevronDownIcon
          className={cn(
            'w-4 h-4 text-text-tertiary transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className={cn(
            'absolute top-full end-0 mt-2 z-50',
            'w-64',
            'bg-background-elevated border border-border-default rounded-lg shadow-xl',
            'py-2'
          )}
        >
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-border-default">
            <div className="flex items-center gap-3 mb-2">
              <Avatar name={user.name} src={user.avatar} size="md" status="online" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-text-primary truncate">
                  {user.name}
                </p>
                <p className="text-xs text-text-tertiary truncate">{user.email}</p>
              </div>
            </div>
            {user.department && (
              <div className="flex items-center gap-2">
                <Badge variant="primary" size="sm">
                  {user.department}
                </Badge>
                <span className="text-xs text-text-tertiary">{user.title}</span>
              </div>
            )}
          </div>

          {/* Menu Items */}
          <div className="py-1">
            {allMenuItems.map((item) => {
              if (item.divider) {
                return (
                  <div
                    key={item.id}
                    className="my-1 border-t border-border-default"
                  />
                );
              }

              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuItemClick(item)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-2',
                    'hover:bg-background-secondary',
                    'transition-colors text-start',
                    'focus:outline-none focus-visible:bg-background-secondary',
                    item.variant === 'danger'
                      ? 'text-danger-text hover:bg-danger-background'
                      : 'text-text-primary'
                  )}
                >
                  {Icon && <Icon className="w-5 h-5 flex-shrink-0" />}
                  <span className="flex-1 text-sm font-medium">{item.label}</span>
                  {item.badge && (
                    <Badge variant="default" size="sm">
                      {item.badge}
                    </Badge>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

UserMenu.displayName = 'UserMenu';
