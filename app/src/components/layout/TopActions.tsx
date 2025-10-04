import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { UserSelector } from './UserSelector';
import {
  BellIcon,
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
} from '@heroicons/react/24/outline';

export function TopActions() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationCount] = useState(5);

  const themeIcons = {
    light: SunIcon,
    dark: MoonIcon,
    system: ComputerDesktopIcon,
  };

  const ThemeIcon = themeIcons[theme];

  return (
    <div className="flex items-center gap-2">
      {/* User Selector (Demo) */}
      <UserSelector />

      {/* Language Toggle */}
      <button
        onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
        className="rounded-lg px-3 py-2 text-sm font-medium text-text-secondary hover:bg-background-tertiary hover:text-text-primary"
        aria-label={`Switch to ${language === 'en' ? 'Arabic' : 'English'}`}
      >
        {language === 'en' ? 'العربية' : 'English'}
      </button>

      {/* Theme Selector */}
      <div className="relative">
        <button
          onClick={() => setShowThemeMenu(!showThemeMenu)}
          className="rounded-lg p-2 text-text-secondary hover:bg-background-tertiary hover:text-text-primary"
          aria-label="Theme"
        >
          <ThemeIcon className="h-5 w-5" />
        </button>

        {showThemeMenu && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowThemeMenu(false)}
            />
            <div className="absolute right-0 top-full z-20 mt-2 w-48 rounded-lg border bg-background-elevated py-1 shadow-lg" style={{ borderColor: 'var(--color-border-default)' }}>
              <button
                onClick={() => {
                  setTheme('light');
                  setShowThemeMenu(false);
                }}
                className={`flex w-full items-center gap-3 px-4 py-2 text-left text-sm hover:bg-background-tertiary ${
                  theme === 'light' ? 'bg-background-tertiary text-primary' : 'text-text-primary'
                }`}
              >
                <SunIcon className="h-5 w-5" />
                Light
              </button>
              <button
                onClick={() => {
                  setTheme('dark');
                  setShowThemeMenu(false);
                }}
                className={`flex w-full items-center gap-3 px-4 py-2 text-left text-sm hover:bg-background-tertiary ${
                  theme === 'dark' ? 'bg-background-tertiary text-primary' : 'text-text-primary'
                }`}
              >
                <MoonIcon className="h-5 w-5" />
                Dark
              </button>
              <button
                onClick={() => {
                  setTheme('system');
                  setShowThemeMenu(false);
                }}
                className={`flex w-full items-center gap-3 px-4 py-2 text-left text-sm hover:bg-background-tertiary ${
                  theme === 'system' ? 'bg-background-tertiary text-primary' : 'text-text-primary'
                }`}
              >
                <ComputerDesktopIcon className="h-5 w-5" />
                System
              </button>
            </div>
          </>
        )}
      </div>

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative rounded-lg p-2 text-text-secondary hover:bg-background-tertiary hover:text-text-primary"
          aria-label="Notifications"
        >
          <BellIcon className="h-5 w-5" />
          {notificationCount > 0 && (
            <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-xs font-semibold text-white">
              {notificationCount}
            </span>
          )}
        </button>

        {showNotifications && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowNotifications(false)}
            />
            <div className="absolute right-0 top-full z-20 mt-2 w-80 rounded-lg border bg-background-elevated shadow-lg" style={{ borderColor: 'var(--color-border-default)' }}>
              <div className="border-b px-4 py-3" style={{ borderBottomColor: 'var(--color-border-default)' }}>
                <h3 className="text-sm font-semibold text-text-primary">
                  Notifications
                </h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="border-b px-4 py-3 hover:bg-background-tertiary"
                    style={{ borderBottomColor: 'var(--color-border-default)' }}
                  >
                    <p className="text-sm text-text-primary">
                      Notification {i}
                    </p>
                    <p className="mt-1 text-xs text-text-secondary">
                      {i} hour{i > 1 ? 's' : ''} ago
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t px-4 py-2" style={{ borderTopColor: 'var(--color-border-default)' }}>
                <button
                  className="block w-full text-center text-sm font-medium text-primary hover:text-primary/80"
                  onClick={() => setShowNotifications(false)}
                >
                  View all notifications
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
