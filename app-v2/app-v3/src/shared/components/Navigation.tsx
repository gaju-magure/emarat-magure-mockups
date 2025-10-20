/**
 * Navigation Component
 * Responsive navigation: bottom bar on mobile, sidebar on desktop
 * Mobile-first design
 */

import { Home, Lightbulb, Grid3x3, CheckSquare, Shield } from 'lucide-react';
import { useLanguage } from '@/core/hooks/useLanguage';

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
      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background-elevated backdrop-blur-sm safe-bottom">
        <div className="grid grid-cols-5 h-16">
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
                  transition-all duration-200
                  ${isActive
                    ? 'text-accent'
                    : isAiFeature
                    ? 'text-accent-light hover:text-accent'
                    : 'text-text-tertiary hover:text-accent'
                  }
                `}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
              >
                {isAiFeature && !isActive && (
                  <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                )}
                {item.icon}
                <span className={`text-xs font-medium ${isActive ? 'text-primary' : ''}`}>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Desktop Sidebar Navigation */}
      <nav className="hidden lg:flex flex-col w-64 border-r border-border bg-background-elevated">
        <div className="flex flex-col gap-1 p-4">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            const isAiFeature = item.id === 'insights';
            return (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={`
                  relative
                  flex items-center gap-3 px-4 py-3 rounded-md
                  text-sm font-medium
                  transition-all duration-200
                  ${isActive
                    ? 'bg-primary text-white'
                    : 'text-text-secondary hover:text-accent hover:bg-background-secondary'
                  }
                `}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className={`relative ${isActive ? '' : 'text-accent'}`}>
                  {isAiFeature && !isActive && (
                    <span className="absolute -top-1 -right-1 h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                  )}
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
