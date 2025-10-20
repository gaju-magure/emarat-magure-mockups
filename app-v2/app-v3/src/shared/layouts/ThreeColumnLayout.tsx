/**
 * ThreeColumnLayout Component
 * Master layout: CollapsibleNav + Content + AlertsPanel
 * Fully responsive with mobile-first approach
 */

import { useState } from 'react';
import { AlertCircle, Settings } from 'lucide-react';
import { CollapsibleNav } from '@/shared/components/CollapsibleNav';
import { AlertsPanel } from '@/shared/components/AlertsPanel';
import { Navigation } from '@/shared/components/Navigation';
import { SettingsMenu } from '@/shared/components/SettingsMenu';
import { SAMPLE_ALERTS } from '@/shared/data/alerts-sample-data';

interface ThreeColumnLayoutProps {
  children: React.ReactNode;
  currentView?: string;
  onNavigate?: (view: string) => void;
}

export function ThreeColumnLayout({ children, currentView = 'insights', onNavigate }: ThreeColumnLayoutProps) {
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Count urgent items requiring immediate attention
  const urgentCount = SAMPLE_ALERTS.filter(a => !a.read && a.priority === 'high').length;

  return (
    <div className="min-h-screen min-h-dvh bg-background-primary">
      {/* Desktop: Three-Column Layout */}
      <div className="hidden lg:flex h-screen h-dvh">
        {/* Left: Collapsible Navigation */}
        <CollapsibleNav
          currentView={currentView}
          onNavigate={onNavigate}
          onSettingsClick={() => setIsSettingsOpen(!isSettingsOpen)}
        />

        {/* Center: Main Content */}
        <main className="flex-1 overflow-hidden">
          {children}
        </main>

        {/* Right: Alerts Panel */}
        <AlertsPanel />
      </div>

      {/* Mobile: Bottom Nav + FAB */}
      <div className="lg:hidden flex flex-col h-screen h-dvh">
        {/* Main Content */}
        <main className="flex-1 overflow-hidden pb-20">
          {children}
        </main>

        {/* Bottom Navigation */}
        <Navigation currentView={currentView} onNavigate={onNavigate} />

        {/* Floating Alerts Button - Items requiring immediate attention */}
        <button
          onClick={() => setIsAlertsOpen(true)}
          className="fixed bottom-24 right-4 z-40 w-14 h-14 rounded-full bg-danger text-white shadow-glow-danger hover:shadow-glow-lg hover:scale-110 active:scale-95 flex items-center justify-center transition-all duration-300"
          aria-label="Open alerts requiring immediate attention"
          title="Urgent Alerts & Info"
        >
          <AlertCircle className="h-6 w-6" />
          {urgentCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white text-danger text-xs font-semibold flex items-center justify-center animate-glow-pulse">
              {urgentCount}
            </span>
          )}
        </button>

        {/* Alerts Drawer (Mobile) */}
        <AlertsPanel isOpen={isAlertsOpen} onClose={() => setIsAlertsOpen(false)} />

        {/* Settings Button (Mobile - moved from Navigation) */}
        <button
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className="fixed top-4 right-4 z-40 w-10 h-10 rounded-full bg-primary text-white shadow-glow-primary hover:shadow-glow-lg hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center"
          aria-label="Open settings"
        >
          <Settings className="h-5 w-5" />
        </button>
      </div>

      {/* Settings Menu (Shared) */}
      <SettingsMenu isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}
