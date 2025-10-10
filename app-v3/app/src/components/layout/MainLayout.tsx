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
      <div className="relative z-10 h-full flex">
        {/* Main Content Area - FULL WIDTH with sidebar inside */}
        <main
          className={cn(
            'flex-1',
            'glass border border-white/20 lg:rounded-2xl shadow-2xl',
          )}
        >
          <div className="relative h-full flex">
            {/* Left Sidebar - Inside main content, floating */}
            {leftSidebar && (
              <aside
                className={cn(
                  'hidden lg:flex flex-col fixed left-4 top-1/2 -translate-y-1/2 z-40',
                  'bg-background-primary/80 backdrop-blur-sm rounded-3xl shadow-2xl',
                  'transition-all duration-300 ease-in-out overflow-visible'
                )}
              >
                {leftSidebar}
              </aside>
            )}

            {/* Chat content with left padding for sidebar */}
            <div className="flex-1 lg:pl-20">
              {children}
            </div>
          </div>
        </main>

        {/* Mobile Top Navigation - Collapsible on hover */}
        {bottomNav && (
          <div className="lg:hidden fixed top-4 left-1/2 -translate-x-1/2 z-50 group">
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-primary/50 rounded-full group-hover:bg-primary transition-colors" />

            <div className="bg-background-primary/80 backdrop-blur-sm rounded-b-3xl shadow-2xl overflow-hidden -translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              {bottomNav}
            </div>
          </div>
        )}
      </div>
      {/* End of main content container */}
    </div>
  );
}

MainLayout.displayName = 'MainLayout';
