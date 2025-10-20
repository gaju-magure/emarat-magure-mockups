/**
 * Layout Component
 * Responsive layout with navigation only (no header)
 * Desktop: Sidebar with logo + nav + settings
 * Mobile: Bottom nav + FAB drawer
 */

import { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { InsightsScreen } from '@/screens/InsightsScreen';
import { HomeScreen } from '@/screens/HomeScreen';
import { AppsScreen } from '@/screens/AppsScreen';
import { TasksScreen } from '@/screens/TasksScreen';
import { GovernanceScreen } from '@/screens/GovernanceScreen';

interface LayoutProps {
  defaultView?: string;
}

export function Layout({ defaultView = 'home' }: LayoutProps) {
  const [currentView, setCurrentView] = useState(defaultView);

  // Render the current screen based on navigation
  const renderScreen = () => {
    switch (currentView) {
      case 'insights':
        return <InsightsScreen />;
      case 'home':
        return <HomeScreen />;
      case 'apps':
        return <AppsScreen />;
      case 'tasks':
        return <TasksScreen />;
      case 'governance':
        return <GovernanceScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen min-h-dvh bg-background-primary">
      {/* Main Layout Container - Full viewport height */}
      <div className="flex h-screen h-dvh">
        {/* Navigation - Sidebar on desktop, bottom bar + FAB on mobile */}
        <Navigation currentView={currentView} onNavigate={setCurrentView} />

        {/* Main Content Area - Screen rendered here */}
        <main className="flex-1 overflow-hidden pb-20 lg:pb-0">
          {renderScreen()}
        </main>
      </div>
    </div>
  );
}
