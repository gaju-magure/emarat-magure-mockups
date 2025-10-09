/**
 * MainLayout Component
 *
 * 3-column responsive layout for the main application
 * - Left: Icon navigation sidebar (collapsible)
 * - Center: Main content area
 * - Right: Widgets sidebar (collapsible, hidden on mobile/tablet)
 * - Mobile: Bottom navigation bar
 */

import React, { type ReactNode, useState } from 'react';
import { cn } from '@/utils/classnames';

export interface MainLayoutProps {
  /** Main content */
  children: ReactNode;
  /** Left sidebar content */
  leftSidebar?: ReactNode;
  /** Right sidebar content */
  rightSidebar?: ReactNode;
  /** Mobile bottom navigation */
  bottomNav?: ReactNode;
  /** Show/hide right sidebar */
  showRightSidebar?: boolean;
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
 *   rightSidebar={<RightSidebar />}
 *   bottomNav={<MobileBottomNav />}
 * >
 *   <YourPageContent />
 * </MainLayout>
 * ```
 */
export function MainLayout({
  children,
  leftSidebar,
  rightSidebar,
  bottomNav,
  showRightSidebar = true,
  className,
}: MainLayoutProps) {
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(showRightSidebar);

  return (
    <div className={cn('min-h-screen bg-background-primary', className)}>
      {/* Main container - 3 column layout */}
      <div className="flex h-screen overflow-hidden">
        {/* Left Sidebar - Icon Navigation */}
        {leftSidebar && (
          <aside
            className={cn(
              'hidden lg:flex flex-col',
              'bg-background-elevated border-e border-border-default',
              'transition-all duration-300 ease-in-out'
            )}
          >
            {leftSidebar}
          </aside>
        )}

        {/* Main Content Area */}
        <main
          className={cn(
            'flex-1 overflow-y-auto',
            'pb-16 lg:pb-0', // Add padding for mobile bottom nav
          )}
        >
          {children}
        </main>

        {/* Right Sidebar - Widgets (Desktop only) */}
        {rightSidebar && isRightSidebarOpen && (
          <aside
            className={cn(
              'hidden xl:flex flex-col',
              'w-80 bg-background-elevated border-s border-border-default',
              'transition-all duration-300 ease-in-out',
              'overflow-y-auto'
            )}
          >
            <div className="relative h-full">
              {/* Close button */}
              <button
                onClick={() => setIsRightSidebarOpen(false)}
                className={cn(
                  'absolute top-4 end-4 z-10',
                  'p-2 rounded-lg',
                  'text-text-secondary hover:text-text-primary',
                  'hover:bg-background-secondary',
                  'transition-colors'
                )}
                aria-label="Close sidebar"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {rightSidebar}
            </div>
          </aside>
        )}

        {/* Right Sidebar Toggle (when closed) */}
        {rightSidebar && !isRightSidebarOpen && (
          <button
            onClick={() => setIsRightSidebarOpen(true)}
            className={cn(
              'hidden xl:flex items-center justify-center',
              'w-12 bg-background-elevated border-s border-border-default',
              'text-text-secondary hover:text-text-primary hover:bg-background-secondary',
              'transition-colors'
            )}
            aria-label="Open sidebar"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      {bottomNav && (
        <div className="lg:hidden">
          {bottomNav}
        </div>
      )}
    </div>
  );
}

MainLayout.displayName = 'MainLayout';
