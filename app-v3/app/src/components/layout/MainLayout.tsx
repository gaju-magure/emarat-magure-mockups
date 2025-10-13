/**
 * MainLayout Component
 *
 * 2-column responsive layout for the main application
 * - Top: Borderless navbar with controls
 * - Left: Icon navigation sidebar
 * - Center: Main content area (full width)
 * - Mobile: Bottom navigation bar
 */

import { type ReactNode } from 'react';
import { cn } from '@/utils/classnames';
import { useGreeting } from '@/hooks/useGreeting';

export interface MainLayoutProps {
  /** Main content */
  children: ReactNode;
  /** Left sidebar content */
  leftSidebar?: ReactNode;
  /** Mobile bottom navigation */
  bottomNav?: ReactNode;
  /** Additional className */
  className?: string;
}

/**
 * MainLayout Component
 *
 * @example
 * ```tsx
 * <MainLayout
 *   leftSidebar={<LeftSidebar />}
 *   bottomNav={<MobileBottomNav />}
 * >
 *   <YourPageContent />
 * </MainLayout>
 * ```
 */
export function MainLayout({
  children,
  leftSidebar,
  bottomNav,
  className,
}: MainLayoutProps) {
  const { period } = useGreeting();

  // Premium gradients based on time period
  const periodGradients = {
    morning: 'from-orange-500/20 via-yellow-500/10 to-transparent',
    afternoon: 'from-blue-500/20 via-sky-500/10 to-transparent',
    evening: 'from-purple-500/20 via-pink-500/10 to-transparent',
    night: 'from-indigo-500/20 via-purple-500/10 to-transparent',
  };

  const currentGradient = periodGradients[period];

  return (
    <div className={cn('h-screen bg-background-primary relative', className)}>
      {/* Animated Background Gradient */}
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br animated-gradient opacity-30 pointer-events-none',
          currentGradient
        )}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="particle absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl" style={{ animationDelay: '0s' }} />
        <div className="particle absolute top-40 right-32 w-48 h-48 bg-success/10 rounded-full blur-3xl" style={{ animationDelay: '2s' }} />
        <div className="particle absolute bottom-32 left-40 w-40 h-40 bg-primary/10 rounded-full blur-3xl" style={{ animationDelay: '4s' }} />
      </div>

      {/* Main content container - positioned above background */}
      <div className="relative z-10 h-full flex p-4">
        {/* Main Glass Container with integrated sidebar */}
        <main
          className={cn(
            'flex-1 flex overflow-hidden',
            'glass border border-white/20 rounded-2xl shadow-2xl',
          )}
        >
          {/* Left Sidebar - Part of glass container, vertically centered */}
          {leftSidebar && (
            <aside
              className={cn(
                'hidden lg:flex flex-col items-center justify-center',
                'border-r border-white/10',
                'transition-all duration-300 ease-in-out'
              )}
            >
              {leftSidebar}
            </aside>
          )}

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        {bottomNav && (
          <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
            <div className="glass border-t border-white/20">
              {bottomNav}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

MainLayout.displayName = 'MainLayout';
