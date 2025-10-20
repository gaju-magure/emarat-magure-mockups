/**
 * Layout Component
 * Responsive layout with header and navigation
 * Automatically adapts: mobile (bottom nav) or desktop (sidebar nav)
 */

import { useState } from 'react';
import { Header } from '../components/Header';
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
      {/* Header */}
      <Header />

      {/* Main Layout Container */}
      <div className="flex h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)]">
        {/* Navigation - Sidebar on desktop, bottom bar on mobile */}
        <Navigation currentView={currentView} onNavigate={setCurrentView} />

        {/* Main Content Area - Screen rendered here */}
        <main className="flex-1 overflow-hidden pb-16 lg:pb-0">
          {renderScreen()}
        </main>
      </div>
    </div>
  );
}
