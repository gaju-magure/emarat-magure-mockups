/**
 * Navigation Component (Mobile Only)
 * Compact mobile bottom navigation with circular icons
 * Icons-only design for maximum screen real estate
 * Desktop navigation handled by CollapsibleNav component
 */

import { Home, Sparkles, Grid3x3, CheckSquare, Shield } from 'lucide-react';
import { useLanguage } from '@/core/hooks/useLanguage';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface NavigationProps {
  currentView?: string;
  onNavigate?: (view: string) => void;
}

export function Navigation({ currentView = 'insights', onNavigate }: NavigationProps) {
  const { t } = useLanguage();

  const navItems: NavItem[] = [
    {
      id: 'insights',
      label: t('nav.insights'),
      icon: <Sparkles className="h-5 w-5" />,
    },
    {
      id: 'home',
      label: t('nav.home'),
      icon: <Home className="h-5 w-5" />,
    },
    {
      id: 'apps',
      label: t('nav.apps'),
      icon: <Grid3x3 className="h-5 w-5" />,
    },
    {
      id: 'tasks',
      label: t('nav.tasks'),
      icon: <CheckSquare className="h-5 w-5" />,
    },
    {
      id: 'governance',
      label: t('nav.governance'),
      icon: <Shield className="h-5 w-5" />,
    },
  ];

  const handleClick = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
    }
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 px-2 pb-2 safe-bottom">
      {/* Sleek floating navigation bar - ultra compact */}
      <div className="relative rounded-2xl bg-background-elevated backdrop-blur-glass-lg shadow-float-lg overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/3 via-transparent to-accent/3 pointer-events-none" />

        {/* Navigation grid - ultra compact icons only */}
        <div className="relative grid grid-cols-5 gap-0.5 px-1.5 py-1.5">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            const isAiFeature = item.id === 'insights';
            return (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className="relative flex items-center justify-center p-1 rounded-xl transition-all duration-200 active:scale-95"
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
                title={item.label}
              >
                {/* Circular icon background */}
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200
                  ${isActive
                    ? isAiFeature
                      ? 'bg-accent/10 text-accent shadow-glow-accent'
                      : 'bg-primary/10 text-primary shadow-glow-primary'
                    : 'text-text-secondary'
                  }
                `}>
                  <div className="relative">
                    {/* AI feature indicator */}
                    {isAiFeature && (
                      <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-accent shadow-glow-accent animate-glow-pulse" />
                    )}
                    {item.icon}
                  </div>
                </div>

                {/* Active indicator dot */}
                {isActive && (
                  <div className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                    isAiFeature ? 'bg-accent shadow-glow-accent' : 'bg-primary shadow-glow-primary'
                  }`} />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
