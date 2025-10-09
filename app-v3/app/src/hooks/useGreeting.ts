/**
 * useGreeting Hook
 *
 * Generates time-based, role-aware greetings for users
 * Provides contextual messages based on time of day and day of week
 */

import { useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

export interface GreetingData {
  /** Main greeting (e.g., "Good morning") */
  greeting: string;
  /** User's name */
  name: string;
  /** Subtitle with context (e.g., "Let's make this Monday productive!") */
  subtitle: string;
  /** Time period */
  period: 'morning' | 'afternoon' | 'evening' | 'night';
  /** Icon suggestion */
  icon: 'sun' | 'sun-high' | 'moon' | 'stars';
}

/**
 * useGreeting Hook
 *
 * @example
 * ```tsx
 * function GreetingSection() {
 *   const { greeting, name, subtitle, period } = useGreeting();
 *
 *   return (
 *     <div>
 *       <h1>{greeting}, {name}!</h1>
 *       <p>{subtitle}</p>
 *     </div>
 *   );
 * }
 * ```
 */
export function useGreeting(): GreetingData {
  const { user } = useAuth();
  const { t } = useLanguage();

  const greetingData = useMemo(() => {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.

    // Determine time period
    let period: GreetingData['period'];
    let icon: GreetingData['icon'];
    let greetingKey: string;

    if (hour >= 5 && hour < 12) {
      period = 'morning';
      icon = 'sun';
      greetingKey = 'jarvis.greeting.morning';
    } else if (hour >= 12 && hour < 17) {
      period = 'afternoon';
      icon = 'sun-high';
      greetingKey = 'jarvis.greeting.afternoon';
    } else if (hour >= 17 && hour < 21) {
      period = 'evening';
      icon = 'moon';
      greetingKey = 'jarvis.greeting.evening';
    } else {
      period = 'night';
      icon = 'stars';
      greetingKey = 'jarvis.greeting.night';
    }

    // Get greeting text
    const greeting = t(greetingKey) || getDefaultGreeting(period);

    // Generate contextual subtitle
    const subtitle = generateSubtitle(day, hour, period, user?.role, t);

    return {
      greeting,
      name: user?.name.split(' ')[0] || 'there', // First name only
      subtitle,
      period,
      icon,
    };
  }, [user, t]);

  return greetingData;
}

/**
 * Default greetings if translations missing
 */
function getDefaultGreeting(period: GreetingData['period']): string {
  const greetings = {
    morning: 'Good morning',
    afternoon: 'Good afternoon',
    evening: 'Good evening',
    night: 'Good night',
  };
  return greetings[period];
}

/**
 * Generate contextual subtitle based on day, time, and role
 */
function generateSubtitle(
  day: number,
  hour: number,
  period: GreetingData['period'],
  role?: string,
  t?: (key: string) => string
): string {
  // Monday motivation
  if (day === 1 && period === 'morning') {
    return t?.('jarvis.subtitle.mondayMotivation') || "Let's make this Monday productive!";
  }

  // Friday energy
  if (day === 5 && period === 'afternoon') {
    return t?.('jarvis.subtitle.fridayEnergy') || "Almost the weekend! Let's finish strong.";
  }

  // Weekend
  if (day === 0 || day === 6) {
    return t?.('jarvis.subtitle.weekend') || 'Hope you\'re having a great weekend!';
  }

  // Late night work
  if (hour >= 22 || hour < 5) {
    return t?.('jarvis.subtitle.lateNight') || 'Burning the midnight oil? Take care of yourself.';
  }

  // Role-based subtitles
  if (role) {
    const roleSubtitles: Record<string, string> = {
      manager: t?.('jarvis.subtitle.manager') || "Here's what needs your attention today.",
      admin: t?.('jarvis.subtitle.admin') || 'Your team is ready for your guidance.',
      analyst: t?.('jarvis.subtitle.analyst') || 'Fresh insights are waiting for you.',
      user: t?.('jarvis.subtitle.user') || "Let's get things done today.",
    };

    if (roleSubtitles[role]) {
      return roleSubtitles[role];
    }
  }

  // Time-based defaults
  if (period === 'morning') {
    return t?.('jarvis.subtitle.morningDefault') || "Ready to tackle today's challenges?";
  } else if (period === 'afternoon') {
    return t?.('jarvis.subtitle.afternoonDefault') || "Hope your day is going well!";
  } else if (period === 'evening') {
    return t?.('jarvis.subtitle.eveningDefault') || "Wrapping up the day?";
  } else {
    return t?.('jarvis.subtitle.nightDefault') || 'Working late? I can help.';
  }
}
