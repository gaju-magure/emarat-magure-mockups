/**
 * LoadingScreen Component
 *
 * Full-screen loading overlay with logo animation
 * Used during initial app load or major transitions
 */

import React from 'react';
import { cn } from '@/utils/classnames';
import { Logo } from '@/components/atoms/Logo';

export interface LoadingScreenProps {
  /** Loading message */
  message?: string;
  /** Additional className */
  className?: string;
}

/**
 * LoadingScreen Component
 *
 * @example
 * ```tsx
 * // Basic
 * <LoadingScreen />
 *
 * // With message
 * <LoadingScreen message="Loading your dashboard..." />
 * ```
 */
export function LoadingScreen({
  message = 'Loading...',
  className,
}: LoadingScreenProps) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-50',
        'flex flex-col items-center justify-center',
        'bg-background-primary',
        className
      )}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      {/* Logo with pulse animation */}
      <div className="mb-8 animate-pulse">
        <Logo size="lg" />
      </div>

      {/* Spinner */}
      <div className="relative w-16 h-16 mb-6">
        <div
          className={cn(
            'absolute inset-0',
            'border-4 border-border-default rounded-full',
            'border-t-primary',
            'animate-spin'
          )}
        />
      </div>

      {/* Loading message */}
      <p className="text-text-secondary text-sm font-medium">
        {message}
      </p>

      {/* Loading dots animation */}
      <div className="flex gap-1.5 mt-3">
        <span
          className="w-2 h-2 bg-primary rounded-full animate-bounce"
          style={{ animationDelay: '0ms' }}
        />
        <span
          className="w-2 h-2 bg-primary rounded-full animate-bounce"
          style={{ animationDelay: '150ms' }}
        />
        <span
          className="w-2 h-2 bg-primary rounded-full animate-bounce"
          style={{ animationDelay: '300ms' }}
        />
      </div>
    </div>
  );
}

LoadingScreen.displayName = 'LoadingScreen';
