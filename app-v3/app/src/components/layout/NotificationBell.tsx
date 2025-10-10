/**
 * NotificationBell Component
 *
 * Bell icon with notification count badge and dropdown panel
 * Shows recent notifications and alerts
 */

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/utils/classnames';
import { useLanguage } from '@/contexts/LanguageContext';
import { Badge } from '@/components/atoms/Badge';
import { Avatar } from '@/components/atoms/Avatar';
import { BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { formatRelativeTime } from '@/utils/date';

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'danger';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  avatar?: string;
  avatarName?: string;
  action?: {
    label: string;
    href: string;
  };
}

export interface NotificationBellProps {
  /** Notifications list */
  notifications?: Notification[];
  /** Mark as read handler */
  onMarkAsRead?: (id: string) => void;
  /** Mark all as read handler */
  onMarkAllAsRead?: () => void;
  /** Clear notification handler */
  onClear?: (id: string) => void;
  /** Additional className */
  className?: string;
}

/**
 * NotificationBell Component
 *
 * @example
 * ```tsx
 * <NotificationBell
 *   notifications={notifications}
 *   onMarkAsRead={(id) => handleMarkAsRead(id)}
 *   onMarkAllAsRead={() => handleMarkAllAsRead()}
 * />
 * ```
 */
export function NotificationBell({
  notifications = [],
  onMarkAsRead,
  onMarkAllAsRead,
  onClear,
  className,
}: NotificationBellProps) {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

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

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read && onMarkAsRead) {
      onMarkAsRead(notification.id);
    }
    if (notification.action?.href) {
      window.location.href = notification.action.href;
    }
  };

  const getNotificationIcon = (type: Notification['type']) => {
    const colors = {
      info: 'text-info-text',
      success: 'text-success-text',
      warning: 'text-warning-text',
      danger: 'text-danger-text',
    };
    return colors[type];
  };

  return (
    <div className={cn('relative', className)}>
      {/* Bell Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'relative p-2 rounded-lg',
          'text-text-secondary hover:text-text-primary',
          'hover:bg-background-secondary',
          'transition-colors',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary'
        )}
        aria-label={t('common.notifications') || 'Notifications'}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <BellIcon className="w-6 h-6" />

        {/* Badge count */}
        {unreadCount > 0 && (
          <span
            className={cn(
              'absolute top-1 end-1',
              'flex items-center justify-center',
              'min-w-[18px] h-[18px] px-1',
              'bg-danger text-white',
              'text-xs font-semibold',
              'rounded-full',
              'pointer-events-none'
            )}
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className={cn(
            'absolute top-full end-0 mt-2 z-50',
            'w-80 sm:w-96',
            'bg-background-elevated border border-border-default rounded-lg shadow-xl',
            'max-h-[32rem] overflow-hidden flex flex-col'
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border-default">
            <h3 className="text-base font-semibold text-text-primary">
              {t('common.notifications') || 'Notifications'}
            </h3>
            {unreadCount > 0 && onMarkAllAsRead && (
              <button
                onClick={onMarkAllAsRead}
                className="text-sm text-primary hover:text-primary-600 font-medium transition-colors"
              >
                {t('common.markAllRead') || 'Mark all as read'}
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-12 text-center">
                <BellIcon className="w-12 h-12 mx-auto mb-3 text-text-tertiary opacity-50" />
                <p className="text-sm text-text-secondary">
                  {t('common.noNotifications') || 'No notifications'}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border-default">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      'group relative px-4 py-3',
                      'hover:bg-background-secondary',
                      'transition-colors cursor-pointer',
                      !notification.read && 'bg-primary/5'
                    )}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start gap-3">
                      {/* Avatar or Icon */}
                      {notification.avatarName ? (
                        <Avatar
                          name={notification.avatarName}
                          src={notification.avatar}
                          size="sm"
                        />
                      ) : (
                        <div
                          className={cn(
                            'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
                            'bg-background-secondary',
                            getNotificationIcon(notification.type)
                          )}
                        >
                          <BellIcon className="w-4 h-4" />
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="text-sm font-medium text-text-primary line-clamp-1">
                            {notification.title}
                          </p>
                          {!notification.read && (
                            <span className="flex-shrink-0 w-2 h-2 bg-primary rounded-full" />
                          )}
                        </div>

                        <p className="text-sm text-text-secondary line-clamp-2 mb-1">
                          {notification.message}
                        </p>

                        <div className="flex items-center gap-2">
                          <Badge variant={notification.type} size="sm">
                            {notification.type}
                          </Badge>
                          <span className="text-xs text-text-tertiary">
                            {formatRelativeTime(notification.timestamp, language)}
                          </span>
                        </div>

                        {notification.action && (
                          <button
                            className="mt-2 text-xs text-primary hover:text-primary-600 font-medium"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.location.href = notification.action!.href;
                            }}
                          >
                            {notification.action.label}
                          </button>
                        )}
                      </div>

                      {/* Clear button */}
                      {onClear && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onClear(notification.id);
                          }}
                          className={cn(
                            'flex-shrink-0 p-1',
                            'text-text-tertiary hover:text-text-primary',
                            'opacity-0 group-hover:opacity-100',
                            'transition-opacity',
                            'focus:outline-none focus-visible:opacity-100'
                          )}
                          aria-label="Clear notification"
                        >
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-4 py-3 border-t border-border-default">
              <a
                href="/notifications"
                className="block text-center text-sm text-primary hover:text-primary-600 font-medium transition-colors"
              >
                {t('common.viewAll') || 'View all notifications'}
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

NotificationBell.displayName = 'NotificationBell';
