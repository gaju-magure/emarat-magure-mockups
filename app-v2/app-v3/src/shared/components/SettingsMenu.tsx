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
  const { mode, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();

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
        className="fixed top-16 right-4 lg:top-auto lg:bottom-20 lg:left-72 z-50 w-64 bg-background-elevated backdrop-blur-glass-lg border border-glow rounded-xl shadow-float-xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-3 space-y-2">
          {/* Theme Toggle */}
          <button
            onClick={handleToggleTheme}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg glass-light border border-glow hover:glass-medium hover:shadow-glow-sm hover:-translate-y-0.5 active:scale-95 transition-all duration-300 group"
          >
            <div className="w-9 h-9 rounded-lg bg-warning/10 flex items-center justify-center group-hover:bg-warning/20 transition-colors">
              {mode === 'dark' ? (
                <Sun className="h-4 w-4 text-warning" />
              ) : (
                <Moon className="h-4 w-4 text-warning" />
              )}
            </div>
            <span className="text-sm font-medium text-text-primary">
              {mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>

          {/* Language Toggle */}
          <button
            onClick={handleToggleLanguage}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg glass-light border border-glow hover:glass-medium hover:shadow-glow-sm hover:-translate-y-0.5 active:scale-95 transition-all duration-300 group"
          >
            <div className="w-9 h-9 rounded-lg bg-info/10 flex items-center justify-center group-hover:bg-info/20 transition-colors">
              <Languages className="h-4 w-4 text-info" />
            </div>
            <span className="text-sm font-medium text-text-primary">
              {language === 'en' ? 'العربية' : 'English'}
            </span>
          </button>

          {/* Profile */}
          <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg glass-light border border-glow hover:glass-medium hover:shadow-glow-sm hover:-translate-y-0.5 active:scale-95 transition-all duration-300 group">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <User className="h-4 w-4 text-primary" />
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
