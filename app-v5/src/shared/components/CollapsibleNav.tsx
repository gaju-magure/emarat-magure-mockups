/**
 * CollapsibleNav Component
 * Premium collapsible navigation: icons only (80px) → expands on hover (280px)
 * Futuristic glassmorphic design with smooth animations
 */

import { Home, Grid3x3, CheckSquare, Shield, Sparkles } from 'lucide-react';
import { useLanguage } from '@/core/hooks/useLanguage';
import brandConfig from '@/config/brand.config';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface CollapsibleNavProps {
  currentView?: string;
  onNavigate?: (view: string) => void;
}

export function CollapsibleNav({ currentView = 'insights', onNavigate }: CollapsibleNavProps) {
  const { t } = useLanguage();

  const navItems: NavItem[] = [
    {
      id: 'insights',
      label: t('nav.insights'),
      icon: <Sparkles className="h-6 w-6" />,
    },
    {
      id: 'home',
      label: t('nav.home'),
      icon: <Home className="h-6 w-6" />,
    },
    {
      id: 'apps',
      label: t('nav.apps'),
      icon: <Grid3x3 className="h-6 w-6" />,
    },
    {
      id: 'tasks',
      label: t('nav.tasks'),
      icon: <CheckSquare className="h-6 w-6" />,
    },
    {
      id: 'governance',
      label: t('nav.governance'),
      icon: <Shield className="h-6 w-6" />,
    },
  ];

  const handleClick = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
    }
  };

  return (
    <nav className="hidden lg:flex flex-col h-[80vh] max-h-[900px] w-20 hover:w-[280px] group bg-background-elevated backdrop-blur-glass-lg m-4 my-auto rounded-2xl shadow-float-lg hover:shadow-float-xl transition-all duration-300 ease-out overflow-hidden">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />

      {/* Logo Section */}
      <div className="relative flex items-center p-5 border-b border-border-light min-h-[80px]">
        {/* Logo - always visible and centered */}
        <div className="w-full group-hover:w-auto flex justify-center group-hover:justify-start">
          <img
            src={brandConfig.logo}
            alt={brandConfig.name}
            className="h-10 w-10 flex-shrink-0 drop-shadow-md"
          />
        </div>

        {/* Brand text - appears on hover */}
        <div className="ml-4 overflow-hidden w-0 group-hover:w-auto opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
          <div className="text-base font-bold text-text-primary whitespace-nowrap">
            {brandConfig.name === 'emarat' ? 'Emarat AI' : brandConfig.name}
          </div>
          <div className="text-xs text-text-tertiary font-medium whitespace-nowrap">
            AI Platform
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-6 px-3">
        <div className="space-y-3">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            const isAiFeature = item.id === 'insights';

            return (
              <button
                onClick={() => handleClick(item.id)}
                className="relative w-full flex items-center justify-start"
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
                title={item.label}
              >
                {/* Active indicator dot */}
                {isActive && (
                  <div className={`absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full ${
                    isAiFeature ? 'bg-accent shadow-glow-accent' : 'bg-primary shadow-glow-primary'
                  }`} />
                )}

                {/* Icon with circular background */}
                <div className={`
                  w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0
                  transition-all duration-200
                  ${isActive
                    ? isAiFeature
                      ? 'bg-accent/10 text-accent shadow-glow-accent'
                      : 'bg-primary/10 text-primary shadow-glow-primary'
                    : 'text-text-secondary group-hover:text-text-primary group-hover:bg-background-tertiary/50 group-hover:shadow-float-sm'
                  }
                `}>
                  <div className={`relative ${
                    isActive
                      ? isAiFeature ? 'text-accent' : 'text-primary'
                      : isAiFeature ? 'text-accent' : ''
                  }`}>
                    {/* AI indicator */}
                    {isAiFeature && (
                      <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-accent shadow-glow-accent animate-glow-pulse" />
                    )}
                    {item.icon}
                  </div>
                </div>

                {/* Label - appears to the right on hover with proper spacing */}
                <div className="ml-3 overflow-hidden max-w-0 group-hover:max-w-xs opacity-0 group-hover:opacity-100 transition-all duration-300 delay-75">
                  <span className={`text-sm font-medium whitespace-nowrap ${
                    isActive
                      ? isAiFeature ? 'text-accent' : 'text-primary'
                      : 'text-text-primary'
                  }`}>
                    {item.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
