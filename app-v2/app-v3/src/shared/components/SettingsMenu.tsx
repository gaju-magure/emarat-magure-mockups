/**
 * SettingsMenu Component
 * Compact popup menu with essential settings (Theme, Language, Profile)
 * Minimal and elegant design
 */

import { Moon, Sun, Languages, User } from 'lucide-react';
import { useTheme } from '@/core/hooks/useTheme';
import { useLanguage } from '@/core/hooks/useLanguage';

interface SettingsMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsMenu({ isOpen, onClose }: SettingsMenuProps) {
  const { mode, toggle: toggleTheme } = useTheme();
  const { language, toggle: toggleLanguage } = useLanguage();

  if (!isOpen) return null;

  const handleToggleTheme = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleTheme();
  };

  const handleToggleLanguage = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLanguage();
  };

  return (
    <>
      {/* Backdrop - click outside to close */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />

      {/* Compact Popup Menu - Attached to settings button */}
      <div
        className="fixed top-16 right-3 lg:top-auto lg:bottom-24 lg:left-24 z-50 w-64 bg-background-elevated backdrop-blur-glass-lg shadow-float-xl rounded-xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-3 space-y-2">
          {/* Theme Toggle */}
          <button
            onClick={handleToggleTheme}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-background-tertiary/50 hover:shadow-float-sm active:scale-95 transition-all duration-200 group"
          >
            <div className="w-9 h-9 rounded-lg bg-warning/10 flex items-center justify-center group-hover:bg-warning/20 transition-colors">
              {mode === 'dark' ? (
                <Sun className="h-5 w-5 text-warning" />
              ) : (
                <Moon className="h-5 w-5 text-warning" />
              )}
            </div>
            <span className="text-sm font-medium text-text-primary">
              {mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>

          {/* Language Toggle */}
          <button
            onClick={handleToggleLanguage}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-background-tertiary/50 hover:shadow-float-sm active:scale-95 transition-all duration-200 group"
          >
            <div className="w-9 h-9 rounded-lg bg-info/10 flex items-center justify-center group-hover:bg-info/20 transition-colors">
              <Languages className="h-5 w-5 text-info" />
            </div>
            <span className="text-sm font-medium text-text-primary">
              {language === 'en' ? 'العربية' : 'English'}
            </span>
          </button>

          {/* Profile */}
          <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-background-tertiary/50 hover:shadow-float-sm active:scale-95 transition-all duration-200 group">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <User className="h-5 w-5 text-primary" />
            </div>
            <span className="text-sm font-medium text-text-primary">
              Profile
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
