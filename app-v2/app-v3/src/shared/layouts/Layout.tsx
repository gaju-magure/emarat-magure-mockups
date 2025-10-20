/**
 * Layout Component
 * Responsive layout with header and navigation
 * Automatically adapts: mobile (bottom nav) or desktop (sidebar nav)
 */

import { useState, type ReactNode } from 'react';
import { Header } from '../components/Header';
import { Navigation } from '../components/Navigation';

interface LayoutProps {
  children: ReactNode;
  defaultView?: string;
}

export function Layout({ children, defaultView = 'home' }: LayoutProps) {
  const [currentView, setCurrentView] = useState(defaultView);

  return (
    <div className="min-h-screen min-h-dvh bg-background-primary">
      {/* Header */}
      <Header />

      {/* Main Layout Container */}
      <div className="flex h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)]">
        {/* Navigation - Sidebar on desktop, bottom bar on mobile */}
        <Navigation currentView={currentView} onNavigate={setCurrentView} />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto pb-16 lg:pb-0">
          <div className="container mx-auto p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
