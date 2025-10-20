/**
 * Header Component
 * Main application header with logo, search, and actions
 * Mobile-first responsive design
 */

import { Search, Bell, User } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import { useLanguage } from '@/core/hooks/useLanguage';
import brandConfig from '@/config/brand.config';

export function Header() {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full px-4 py-3">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between gap-4 px-4 rounded-xl bg-background-elevated backdrop-blur-glass-md shadow-float-md border border-glow transition-all duration-300">
          {/* Logo Section */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <img
              src={brandConfig.logo}
              alt={brandConfig.name}
              className="h-8 w-auto md:h-10"
            />
            <h1 className="hidden sm:block text-lg md:text-xl font-semibold text-text-primary">
              {brandConfig.name === 'emarat' ? 'Emarat AI' : brandConfig.name}
            </h1>
          </div>

          {/* Search Bar - Hidden on mobile, shown on tablet+ */}
          <div className="hidden md:flex flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
              <input
                type="search"
                placeholder={t('header.search')}
                className="
                  w-full h-10 pl-10 pr-4
                  glass-light
                  border border-glow
                  rounded-lg
                  text-sm text-text-primary
                  placeholder:text-text-tertiary
                  focus:outline-none focus:shadow-glow-md focus:border-glow-hover
                  transition-all duration-300
                "
              />
            </div>
          </div>

          {/* Actions Section */}
          <div className="flex items-center gap-2">
            {/* Mobile Search Icon */}
            <button
              className="btn-icon md:hidden"
              aria-label={t('header.search')}
            >
              <Search className="h-5 w-5 text-text-primary" />
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Language Toggle */}
            <LanguageToggle />

            {/* Notifications */}
            <button
              className="btn-icon relative"
              aria-label={t('header.notifications')}
            >
              <Bell className="h-5 w-5 text-text-primary" />
              {/* Notification Badge */}
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-danger shadow-glow-danger animate-glow-pulse" />
            </button>

            {/* User Profile */}
            <button
              className="
                inline-flex items-center justify-center
                h-10 w-10 rounded-full
                bg-primary text-white
                shadow-glow-primary
                hover:shadow-glow-lg hover:scale-110
                active:scale-95
                transition-all duration-300
              "
              aria-label={t('header.profile')}
            >
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
