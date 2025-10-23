/**
 * ThreeColumnLayout Component
 * Master layout: CollapsibleNav + Content + AlertsPanel
 * Fully responsive with mobile-first approach
 */

import { useState } from 'react';
import { CollapsibleNav } from '@/shared/components/CollapsibleNav';
import { AlertsPanel } from '@/shared/components/AlertsPanel';
import { Navigation } from '@/shared/components/Navigation';
import { SettingsMenu } from '@/shared/components/SettingsMenu';
import { TopBar } from '@/shared/components/TopBar';
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
      {/* Top Bar - Settings & Alerts */}
      <TopBar
        onSettingsClick={() => setIsSettingsOpen(!isSettingsOpen)}
        onAlertsClick={() => setIsAlertsOpen(true)}
        urgentCount={urgentCount}
      />

      {/* Desktop: Three-Column Layout */}
      <div className="hidden lg:flex h-screen h-dvh">
        {/* Left: Collapsible Navigation */}
        <CollapsibleNav
          currentView={currentView}
          onNavigate={onNavigate}
        />

        {/* Center: Main Content */}
        <main className="flex-1 overflow-hidden pt-16">
          {children}
        </main>

        {/* Right: Alerts Panel */}
        <AlertsPanel />
      </div>

      {/* Mobile: Bottom Nav */}
      <div className="lg:hidden flex flex-col h-screen h-dvh">
        {/* Main Content */}
        <main className="flex-1 overflow-hidden pt-16 pb-20">
          {children}
        </main>

        {/* Bottom Navigation */}
        <Navigation currentView={currentView} onNavigate={onNavigate} />

        {/* Alerts Drawer (Mobile) */}
        <AlertsPanel isOpen={isAlertsOpen} onClose={() => setIsAlertsOpen(false)} />
      </div>

      {/* Settings Menu (Shared) */}
      <SettingsMenu isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}
