/**
 * Navigation Component
 * Responsive navigation: bottom bar on mobile, sidebar on desktop
 * Mobile-first design with FAB drawer on mobile
 */

import { useState } from 'react';
import { Home, Lightbulb, Grid3x3, CheckSquare, Shield, Settings } from 'lucide-react';
import { useLanguage } from '@/core/hooks/useLanguage';
import { SettingsMenu } from './SettingsMenu';
import brandConfig from '@/config/brand.config';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
}

interface NavigationProps {
  currentView?: string;
  onNavigate?: (view: string) => void;
}

export function Navigation({ currentView = 'home', onNavigate }: NavigationProps) {
  const { t } = useLanguage();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const navItems: NavItem[] = [
    {
      id: 'insights',
      label: t('nav.insights'),
      icon: <Lightbulb className="h-5 w-5" />,
      href: '#insights',
    },
    {
      id: 'home',
      label: t('nav.home'),
      icon: <Home className="h-5 w-5" />,
      href: '#home',
    },
    {
      id: 'apps',
      label: t('nav.apps'),
      icon: <Grid3x3 className="h-5 w-5" />,
      href: '#apps',
    },
    {
      id: 'tasks',
      label: t('nav.tasks'),
      icon: <CheckSquare className="h-5 w-5" />,
      href: '#tasks',
    },
    {
      id: 'governance',
      label: t('nav.governance'),
      icon: <Shield className="h-5 w-5" />,
      href: '#governance',
    },
  ];

  const handleClick = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
    }
  };

  return (
    <>
      {/* Settings Menu - Shared by both mobile and desktop */}
      <SettingsMenu isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

      {/* Mobile Settings Button - Top Right */}
      <button
        onClick={() => setIsSettingsOpen(!isSettingsOpen)}
        className="lg:hidden fixed top-4 right-4 z-40 w-10 h-10 rounded-full bg-primary text-white shadow-glow-primary hover:shadow-glow-lg hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center"
        aria-label="Open settings"
      >
        <Settings className="h-5 w-5" />
      </button>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 safe-bottom">
        <div className="grid grid-cols-5 h-16 rounded-xl bg-background-elevated backdrop-blur-glass-md shadow-float-lg border border-glow transition-all duration-300">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            const isAiFeature = item.id === 'insights';
            return (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={`
                  relative
                  flex flex-col items-center justify-center gap-1
                  rounded-lg
                  transition-all duration-300
                  ${isActive
                    ? 'text-primary drop-shadow-glow-md scale-105'
                    : isAiFeature
                    ? 'text-accent hover:text-accent-hover hover:drop-shadow-glow-sm hover:scale-105'
                    : 'text-text-tertiary hover:text-text-primary hover:scale-105'
                  }
                `}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
              >
                {isAiFeature && !isActive && (
                  <span className="absolute top-2 right-4 h-1.5 w-1.5 rounded-full bg-accent shadow-glow-accent animate-glow-pulse" />
                )}
                {item.icon}
                <span className={`text-xs font-medium`}>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Desktop Sidebar Navigation */}
      <nav className="hidden lg:flex flex-col w-64 border-r border-glow bg-background-elevated backdrop-blur-glass-sm">
        {/* Logo Section */}
        <div className="p-6 border-b border-glow">
          <div className="flex items-center gap-3">
            <img
              src={brandConfig.logo}
              alt={brandConfig.name}
              className="h-10 w-auto"
            />
            <div>
              <div className="text-sm font-semibold text-text-primary">
                {brandConfig.name === 'emarat' ? 'Emarat AI' : brandConfig.name}
              </div>
              <div className="text-xs text-text-tertiary">
                AI Platform
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              const isAiFeature = item.id === 'insights';
              return (
                <button
                  key={item.id}
                  onClick={() => handleClick(item.id)}
                  className={`
                    relative
                    flex items-center gap-3 px-4 py-3 rounded-lg
                    text-sm font-medium
                    transition-all duration-300
                    ${isActive
                      ? 'glass-medium text-text-primary shadow-glow-primary border border-glow-hover'
                      : 'text-text-secondary hover:text-text-primary hover:glass-light hover:shadow-glow-sm hover:border hover:border-glow'
                    }
                  `}
                  aria-label={item.label}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className={`relative ${isAiFeature ? 'text-accent' : ''}`}>
                    {isAiFeature && !isActive && (
                      <span className="absolute -top-1 -right-1 h-1.5 w-1.5 rounded-full bg-accent shadow-glow-accent animate-glow-pulse" />
                    )}
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Settings Section */}
        <div className="p-4 border-t border-glow">
          <button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg glass-light border border-glow hover:glass-medium hover:shadow-glow-sm hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
          >
            <Settings className="h-5 w-5 text-text-primary" />
            <span className="text-sm font-medium text-text-primary">Settings</span>
          </button>
        </div>
      </nav>
    </>
  );
}
