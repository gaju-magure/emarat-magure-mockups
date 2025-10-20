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
        <div className="flex flex-col gap-2 p-4">
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
      </nav>
    </>
  );
}
