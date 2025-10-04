import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { mainNavigation } from '../../config/navigation';
import {
  ChevronRightIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import * as HeroIcons from '@heroicons/react/24/outline';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  onToggle?: () => void;
}

export function Sidebar({ isOpen = true, onClose, onToggle }: SidebarProps) {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { language, t } = useLanguage();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const isRTL = language === 'ar';

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const getIcon = (iconName: string) => {
    const IconComponent = HeroIcons[iconName as keyof typeof HeroIcons];
    return IconComponent ? <IconComponent className="h-5 w-5" /> : null;
  };

  const handleLogout = () => {
    logout();
  };

  // Filter navigation items based on user role
  const hasAccess = (roles?: string[]) => {
    // If no roles specified, everyone has access
    if (!roles || roles.length === 0) return true;
    // Check if user's role matches any of the allowed roles
    return user?.role ? roles.includes(user.role) : false;
  };

  // Filter navigation groups and items based on user access
  const filteredNavigation = mainNavigation.map(group => ({
    ...group,
    items: group.items.filter(item => hasAccess(item.roles))
  })).filter(group => group.items.length > 0); // Remove empty groups

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && onClose && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-label="Close menu"
        />
      )}

      {/* Floating Toggle Button - Always visible, outside sidebar */}
      <button
        onClick={onToggle || onClose}
        className={`fixed top-6 z-[60] flex h-10 w-10 items-center justify-center rounded-lg bg-background-elevated shadow-lg transition-all duration-300 hover:shadow-xl ${
          isOpen
            ? isRTL ? 'right-4 lg:right-[15rem]' : 'left-4 lg:left-[15rem]'
            : isRTL ? 'right-4' : 'left-4'
        }`}
        style={{
          borderWidth: '1px',
          borderColor: 'var(--color-border-default)',
        }}
        aria-label="Toggle menu"
      >
        <svg
          className="h-5 w-5 text-text-primary transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Sidebar - Centered modal on mobile, pushable on desktop */}
      <aside
        className={`flex flex-col transition-all duration-300 ease-in-out ${
          isOpen ? 'w-72 lg:w-64' : 'w-0'
        }
        fixed left-1/2 top-1/2 z-50 h-[90vh] max-h-[600px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border bg-background-elevated shadow-2xl
        lg:static ${isRTL ? 'lg:right-auto' : 'lg:left-auto'} lg:top-auto lg:h-screen lg:max-h-none lg:translate-x-0 lg:translate-y-0 lg:rounded-none ${isRTL ? 'lg:border-l' : 'lg:border-r'} lg:shadow-none
        ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 lg:scale-100 lg:opacity-100'}
        `}
        style={{ borderColor: 'var(--color-border-default)' }}
      >
        {/* Header - Logo centered */}
        <div className="relative flex h-20 shrink-0 items-center justify-center border-b px-6" style={{ borderBottomColor: 'var(--color-border-default)' }}>
          {/* Logo - Centered */}
          <Link to="/dashboard" className="flex items-center justify-center">
            <img
              src="/emarat-logo.svg"
              alt="Emarat"
              className="h-12 w-auto object-contain transition-transform hover:scale-105"
            />
          </Link>
        </div>

        {/* User Profile Section */}
        <div className="shrink-0 border-b px-4 py-4" style={{ borderBottomColor: 'var(--color-border-default)' }}>
          <div className="flex items-center gap-3">
            {/* User Avatar */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white">
              <span className="text-sm font-semibold">
                {user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
              </span>
            </div>
            {/* User Info */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-text-primary">{user?.name}</p>
              <p className="truncate text-xs text-text-secondary">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Navigation - Scrollable */}
        <nav className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <ul className="space-y-0 px-3 py-4">
            {filteredNavigation.map((group, groupIndex) => (
              <li key={group.id}>
                {/* Group section with border separator */}
                <div className={groupIndex > 0 ? 'border-t pt-4 mt-4' : ''} style={{ borderTopColor: groupIndex > 0 ? 'var(--color-border-default)' : 'transparent' }}>
                  <ul className="space-y-0.5">
                    {group.items.map((item) => {
                      const hasChildren = item.children && item.children.length > 0;
                      const isItemActive = isActive(item.path);
                      const isExpanded = expandedItems.includes(item.id);
                      const showChildren = hasChildren && isExpanded;

                      return (
                        <li key={item.id}>
                          {/* Main Item */}
                          {hasChildren ? (
                            <button
                              onClick={() => toggleExpanded(item.id)}
                              className={`group flex w-full items-center justify-between rounded-md px-3 py-3 transition-colors ${
                                isItemActive
                                  ? 'bg-primary/5'
                                  : 'hover:bg-background-tertiary'
                              }`}
                            >
                              <span className="flex items-center gap-3.5">
                                <span className="flex h-6 w-6 items-center justify-center text-success">
                                  {getIcon(item.icon)}
                                </span>
                                <span className="text-base font-semibold text-primary">
                                  {isRTL && item.labelAr ? item.labelAr : item.label}
                                </span>
                              </span>
                              <span className="flex items-center gap-2">
                                {item.badge && (
                                  <span className="flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-danger px-1.5 text-xs font-semibold text-white">
                                    {item.badge}
                                  </span>
                                )}
                                {isExpanded ? (
                                  <ChevronDownIcon className="h-4 w-4 text-text-tertiary" />
                                ) : (
                                  <ChevronRightIcon className={`h-4 w-4 text-text-tertiary ${isRTL ? 'rotate-180' : ''}`} />
                                )}
                              </span>
                            </button>
                          ) : (
                            <Link
                              to={item.path}
                              className={`group flex items-center justify-between rounded-md px-3 py-3 transition-colors ${
                                isItemActive
                                  ? 'bg-primary/5'
                                  : 'hover:bg-background-tertiary'
                              }`}
                            >
                              <span className="flex items-center gap-3.5">
                                <span className="flex h-6 w-6 items-center justify-center text-success">
                                  {getIcon(item.icon)}
                                </span>
                                <span className="text-base font-semibold text-primary">
                                  {isRTL && item.labelAr ? item.labelAr : item.label}
                                </span>
                              </span>
                              {item.badge && (
                                <span className="flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-danger px-1.5 text-xs font-semibold text-white">
                                  {item.badge}
                                </span>
                              )}
                            </Link>
                          )}

                          {/* Children Items */}
                          {showChildren && (
                            <ul
                              className={`mt-1 space-y-0.5 ${isRTL ? 'mr-6 border-r-2 pr-3' : 'ml-6 border-l-2 pl-3'}`}
                              style={isRTL ? { borderRightColor: 'var(--color-border-default)' } : { borderLeftColor: 'var(--color-border-default)' }}
                            >
                              {item.children!.map((child) => {
                                const isChildActive = isActive(child.path);
                                return (
                                  <li key={child.id}>
                                    <Link
                                      to={child.path}
                                      className={`flex items-center gap-2.5 rounded-md px-3 py-2 transition-colors ${
                                        isChildActive
                                          ? 'bg-primary/5'
                                          : 'hover:bg-background-tertiary'
                                      }`}
                                    >
                                      <span className="flex h-4 w-4 items-center justify-center text-success">
                                        {getIcon(child.icon)}
                                      </span>
                                      <span className="text-sm font-semibold text-primary">
                                        {isRTL && child.labelAr ? child.labelAr : child.label}
                                      </span>
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
          </div>

          {/* Quick Actions - Bottom of Sidebar - Fixed */}
          <div className="shrink-0 border-t px-3 py-3" style={{ borderTopColor: 'var(--color-border-default)' }}>
            {/* Only Settings and Logout */}
            <div className="flex items-center justify-around">
              {/* Settings */}
              <Link
                to="/settings"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-success hover:bg-background-tertiary"
                title={t('common.settings')}
              >
                <Cog6ToothIcon className="h-5 w-5" />
                <span className="text-sm font-medium">{t('common.settings')}</span>
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-success hover:bg-background-tertiary"
                title={t('common.logout')}
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                <span className="text-sm font-medium">{t('common.logout')}</span>
              </button>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}
