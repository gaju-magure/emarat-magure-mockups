/**
 * Layout Component
 * Three-column layout: CollapsibleNav + Content + AlertsPanel
 * Desktop: Collapsible nav (64px→256px) + Content + Alerts panel (320px)
 * Mobile: Bottom nav + Content + Alerts FAB
 */

import { useState } from 'react';
import { ThreeColumnLayout } from './ThreeColumnLayout';
import { InsightsScreen } from '@/screens/InsightsScreen';
import { HomeScreen } from '@/screens/HomeScreen';
import { AppsScreen } from '@/screens/AppsScreen';
import { TasksScreen } from '@/screens/TasksScreen';
import { GovernanceScreen } from '@/screens/GovernanceScreen';

interface LayoutProps {
  defaultView?: string;
}

export function Layout({ defaultView = 'insights' }: LayoutProps) {
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
        return <InsightsScreen />;
    }
  };

  return (
    <ThreeColumnLayout currentView={currentView} onNavigate={setCurrentView}>
      {renderScreen()}
    </ThreeColumnLayout>
  );
}
