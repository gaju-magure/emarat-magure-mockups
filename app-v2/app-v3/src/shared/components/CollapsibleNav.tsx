/**
 * CollapsibleNav Component
 * Collapsible navigation sidebar: icons only (64px) → expands on hover (256px)
 */

import { Home, Lightbulb, Grid3x3, CheckSquare, Shield, Settings } from 'lucide-react';
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
  onSettingsClick?: () => void;
}

export function CollapsibleNav({ currentView = 'insights', onNavigate, onSettingsClick }: CollapsibleNavProps) {
  const { t } = useLanguage();

  const navItems: NavItem[] = [
    {
      id: 'insights',
      label: t('nav.insights'),
      icon: <Lightbulb className="h-5 w-5" />,
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
    <nav className="hidden lg:flex flex-col h-full w-16 hover:w-64 group border-r border-glow bg-background-elevated backdrop-blur-glass-sm transition-all duration-300 ease-out shadow-float-sm hover:shadow-float-lg">
      {/* Logo Section - Shows when expanded */}
      <div className="p-4 border-b border-glow overflow-hidden">
        <div className="flex items-center gap-3 whitespace-nowrap">
          <img
            src={brandConfig.logo}
            alt={brandConfig.name}
            className="h-8 w-8 flex-shrink-0"
          />
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-100">
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
      <div className="flex-1 overflow-y-auto p-2">
        <div className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            const isAiFeature = item.id === 'insights';
            return (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={`
                  relative
                  flex items-center gap-3 p-3 rounded-lg
                  text-sm font-medium whitespace-nowrap
                  transition-all duration-300
                  ${isActive
                    ? 'glass-medium text-text-primary shadow-glow-primary border border-glow-hover'
                    : 'text-text-secondary hover:text-text-primary hover:glass-light hover:shadow-glow-sm hover:border hover:border-glow'
                  }
                `}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
                title={item.label}
              >
                <span className={`relative flex-shrink-0 ${isAiFeature ? 'text-accent' : ''}`}>
                  {isAiFeature && !isActive && (
                    <span className="absolute -top-1 -right-1 h-1.5 w-1.5 rounded-full bg-accent shadow-glow-accent animate-glow-pulse" />
                  )}
                  {item.icon}
                </span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-100">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Settings Section */}
      <div className="p-2 border-t border-glow">
        <button
          onClick={onSettingsClick}
          className="w-full flex items-center gap-3 p-3 rounded-lg glass-light border border-glow hover:glass-medium hover:shadow-glow-sm hover:-translate-y-0.5 active:scale-95 transition-all duration-300 whitespace-nowrap"
          title="Settings"
        >
          <Settings className="h-5 w-5 text-text-primary flex-shrink-0" />
          <span className="text-sm font-medium text-text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-100">
            Settings
          </span>
        </button>
      </div>
    </nav>
  );
}
