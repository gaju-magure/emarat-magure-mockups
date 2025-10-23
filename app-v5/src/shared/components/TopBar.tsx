/**
 * TopBar Component
 * Floating top bar with settings and alerts icons
 * Compact glassmorphic design
 */

import { Settings, AlertCircle } from 'lucide-react';

interface TopBarProps {
  onSettingsClick: () => void;
  onAlertsClick?: () => void;
  urgentCount?: number;
}

export function TopBar({ onSettingsClick, onAlertsClick, urgentCount = 0 }: TopBarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-30 px-3 pt-3">
      <div className="max-w-[2000px] mx-auto flex items-center justify-end gap-2">
        {/* Alerts Button - Mobile only */}
        {onAlertsClick && (
          <button
            onClick={onAlertsClick}
            className="lg:hidden relative w-11 h-11 rounded-full bg-background-elevated backdrop-blur-glass-lg shadow-float-md hover:shadow-float-lg hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center"
            aria-label="Open alerts"
            title="Alerts & Info"
          >
            <AlertCircle className={`h-5 w-5 ${urgentCount > 0 ? 'text-danger' : 'text-text-secondary'}`} />
            {urgentCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-danger text-white text-xs font-bold flex items-center justify-center animate-glow-pulse shadow-float-sm">
                {urgentCount}
              </span>
            )}
          </button>
        )}

        {/* Settings Button */}
        <button
          onClick={onSettingsClick}
          className="w-11 h-11 rounded-full bg-background-elevated backdrop-blur-glass-lg shadow-float-md hover:shadow-float-lg hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center group"
          aria-label="Open settings"
          title="Settings"
        >
          <Settings className="h-5 w-5 text-text-secondary group-hover:text-primary group-hover:rotate-90 transition-all duration-200" />
        </button>
      </div>
    </div>
  );
}
