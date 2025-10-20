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

        {/* Floating Alerts Button - Sleek design with urgency */}
        <button
          onClick={() => setIsAlertsOpen(true)}
          className="fixed bottom-24 right-3 z-40 w-14 h-14 rounded-full bg-danger backdrop-blur-glass-md text-white shadow-glow-danger hover:shadow-glow-lg hover:scale-110 active:scale-95 flex items-center justify-center transition-all duration-200"
          aria-label="Open alerts requiring immediate attention"
          title="Urgent Alerts & Info"
        >
          <AlertCircle className="h-6 w-6" />
          {urgentCount > 0 && (
            <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white text-danger text-xs font-bold flex items-center justify-center animate-glow-pulse shadow-float-md">
              {urgentCount}
            </span>
          )}
        </button>

        {/* Alerts Drawer (Mobile) */}
        <AlertsPanel isOpen={isAlertsOpen} onClose={() => setIsAlertsOpen(false)} />

        {/* Settings Button (Mobile - Sleek floating button) */}
        <button
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className="fixed top-3 right-3 z-40 w-11 h-11 rounded-full bg-primary backdrop-blur-glass-md text-white shadow-glow-primary hover:shadow-glow-lg hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center"
          aria-label="Open settings"
          title="Settings"
        >
          <Settings className="h-5 w-5 hover:rotate-90 transition-transform duration-200" />
        </button>
      </div>

      {/* Settings Menu (Shared) */}
      <SettingsMenu isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}
