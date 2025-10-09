/**
 * GreetingSection Component
 *
 * Personalized greeting for the Jarvis home page
 * Shows time-based greeting with contextual subtitle
 */

import React from 'react';
import { cn } from '@/utils/classnames';
import { useGreeting } from '@/hooks/useGreeting';
import {
  SunIcon,
  MoonIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

export interface GreetingSectionProps {
  /** Additional className */
  className?: string;
  /** Show animated background */
  animated?: boolean;
}

/**
 * GreetingSection Component
 *
 * @example
 * ```tsx
 * // Basic usage
 * <GreetingSection />
 *
 * // With animation
 * <GreetingSection animated />
 * ```
 */
export function GreetingSection({
  className,
  animated = true,
}: GreetingSectionProps) {
  const { greeting, name, subtitle, period, icon } = useGreeting();

  // Icon mapping
  const iconComponents = {
    sun: SunIcon,
    'sun-high': SunIcon,
    moon: MoonIcon,
    stars: SparklesIcon,
  };

  const Icon = iconComponents[icon];

  // Period-based colors
  const periodColors = {
    morning: {
      gradient: 'from-orange-500/20 to-yellow-500/20',
      icon: 'text-orange-500',
      glow: 'shadow-orange-500/20',
    },
    afternoon: {
      gradient: 'from-blue-500/20 to-cyan-500/20',
      icon: 'text-blue-500',
      glow: 'shadow-blue-500/20',
    },
    evening: {
      gradient: 'from-purple-500/20 to-pink-500/20',
      icon: 'text-purple-500',
      glow: 'shadow-purple-500/20',
    },
    night: {
      gradient: 'from-indigo-500/20 to-purple-500/20',
      icon: 'text-indigo-500',
      glow: 'shadow-indigo-500/20',
    },
  };

  const colors = periodColors[period];

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl',
        'bg-gradient-to-br',
        colors.gradient,
        'border border-border-default',
        'p-8 sm:p-10 lg:p-12',
        className
      )}
    >
      {/* Animated background effect */}
      {animated && (
        <div className="absolute inset-0 opacity-30">
          <div
            className={cn(
              'absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl',
              'bg-gradient-to-br',
              colors.gradient,
              'animate-pulse'
            )}
            style={{ animationDuration: '4s' }}
          />
          <div
            className={cn(
              'absolute -bottom-24 -left-24 w-64 h-64 rounded-full blur-3xl',
              'bg-gradient-to-tr',
              colors.gradient,
              'animate-pulse'
            )}
            style={{ animationDuration: '6s', animationDelay: '1s' }}
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start gap-4 mb-4">
          {/* Icon */}
          <div
            className={cn(
              'flex items-center justify-center',
              'w-16 h-16 sm:w-20 sm:h-20',
              'bg-background-elevated/80 backdrop-blur-sm',
              'border border-border-default',
              'rounded-2xl shadow-lg',
              colors.glow,
              animated && 'animate-bounce'
            )}
            style={animated ? { animationDuration: '3s' } : undefined}
          >
            <Icon className={cn('w-8 h-8 sm:w-10 sm:h-10', colors.icon)} />
          </div>

          {/* Greeting text */}
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-2">
              {greeting}, <span className="text-primary">{name}</span>!
            </h1>
            <p className="text-base sm:text-lg text-text-secondary max-w-2xl">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Current date and time */}
        <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border-default/50">
          <div className="flex items-center gap-2 text-sm text-text-tertiary">
            <span className="w-2 h-2 bg-success-text rounded-full animate-pulse" />
            <span>
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
          <span className="text-text-tertiary">•</span>
          <div className="text-sm text-text-tertiary">
            {new Date().toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

GreetingSection.displayName = 'GreetingSection';
