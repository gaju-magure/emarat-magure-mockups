import { useState, ReactNode } from 'react';
import { Sidebar } from '../navigation/Sidebar';
import { TopActions } from './TopActions';

interface AppLayoutProps {
  children: ReactNode;
  maxWidth?: 'full' | '7xl' | '6xl' | '5xl';
}

export function AppLayout({
  children,
  maxWidth = '7xl',
}: AppLayoutProps) {
  // Sidebar open by default on desktop (lg), closed on mobile
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const maxWidthClass = {
    full: 'max-w-full',
    '7xl': 'max-w-7xl',
    '6xl': 'max-w-6xl',
    '5xl': 'max-w-5xl',
  }[maxWidth];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Sidebar - Emarat style with logo and toggle */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:ml-0' : 'lg:ml-0'}`}>
        <div className={`mx-auto w-full ${maxWidthClass} px-4 py-6 sm:px-6 lg:px-8`}>
          {/* Top Actions Bar */}
          <div className="mb-6 flex items-center justify-end">
            {/* Top Actions on right */}
            <TopActions />
          </div>

          {/* Page Content */}
          {children}
        </div>
      </main>
    </div>
  );
}
