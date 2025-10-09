/**
 * Date Utility Functions
 *
 * Formatting and manipulation utilities for dates
 * Supports both English and Arabic locales
 */

/**
 * Format date to localized string
 *
 * @param date - Date string, number, or Date object
 * @param locale - Language locale ('en' | 'ar')
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string
 *
 * @example
 * ```ts
 * formatDate('2024-01-15', 'en') // 'Jan 15, 2024'
 * formatDate('2024-01-15', 'ar') // '١٥ يناير ٢٠٢٤'
 * formatDate(new Date(), 'en', { dateStyle: 'full' }) // 'Monday, January 15, 2024'
 * ```
 */
export function formatDate(
  date: string | number | Date,
  locale: 'en' | 'ar' = 'en',
  options?: Intl.DateTimeFormatOptions
): string {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;

  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  const formatOptions = options || defaultOptions;
  const localeCode = locale === 'ar' ? 'ar-AE' : 'en-US';

  return new Intl.DateTimeFormat(localeCode, formatOptions).format(dateObj);
}

/**
 * Format date to time string
 *
 * @param date - Date string, number, or Date object
 * @param locale - Language locale ('en' | 'ar')
 * @param use24Hour - Use 24-hour format (default: false)
 * @returns Formatted time string
 *
 * @example
 * ```ts
 * formatTime('2024-01-15T14:30:00', 'en') // '2:30 PM'
 * formatTime('2024-01-15T14:30:00', 'en', true) // '14:30'
 * formatTime('2024-01-15T14:30:00', 'ar') // '٢:٣٠ م'
 * ```
 */
export function formatTime(
  date: string | number | Date,
  locale: 'en' | 'ar' = 'en',
  use24Hour: boolean = false
): string {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;

  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: !use24Hour,
  };

  const localeCode = locale === 'ar' ? 'ar-AE' : 'en-US';

  return new Intl.DateTimeFormat(localeCode, options).format(dateObj);
}

/**
 * Format date and time together
 *
 * @param date - Date string, number, or Date object
 * @param locale - Language locale ('en' | 'ar')
 * @returns Formatted date and time string
 *
 * @example
 * ```ts
 * formatDateTime('2024-01-15T14:30:00', 'en') // 'Jan 15, 2024 at 2:30 PM'
 * formatDateTime('2024-01-15T14:30:00', 'ar') // '١٥ يناير ٢٠٢٤ في ٢:٣٠ م'
 * ```
 */
export function formatDateTime(
  date: string | number | Date,
  locale: 'en' | 'ar' = 'en'
): string {
  const dateStr = formatDate(date, locale);
  const timeStr = formatTime(date, locale);

  return locale === 'ar' ? `${dateStr} في ${timeStr}` : `${dateStr} at ${timeStr}`;
}

/**
 * Format relative time (e.g., "2 hours ago", "just now")
 *
 * @param date - Date string, number, or Date object
 * @param locale - Language locale ('en' | 'ar')
 * @returns Relative time string
 *
 * @example
 * ```ts
 * formatRelativeTime(Date.now() - 60000, 'en') // '1 minute ago'
 * formatRelativeTime(Date.now() - 3600000, 'en') // '1 hour ago'
 * formatRelativeTime(Date.now() - 86400000, 'en') // '1 day ago'
 * ```
 */
export function formatRelativeTime(
  date: string | number | Date,
  locale: 'en' | 'ar' = 'en'
): string {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffWeek = Math.floor(diffDay / 7);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);

  // Helper for Arabic pluralization (simplified)
  const arPlural = (count: number, singular: string, plural: string) => {
    return count === 1 ? singular : count === 2 ? `${plural}ين` : plural;
  };

  if (diffSec < 60) {
    return locale === 'ar' ? 'الآن' : 'just now';
  } else if (diffMin < 60) {
    if (locale === 'ar') {
      return `منذ ${diffMin} ${arPlural(diffMin, 'دقيقة', 'دقائق')}`;
    }
    return `${diffMin} minute${diffMin === 1 ? '' : 's'} ago`;
  } else if (diffHour < 24) {
    if (locale === 'ar') {
      return `منذ ${diffHour} ${arPlural(diffHour, 'ساعة', 'ساعات')}`;
    }
    return `${diffHour} hour${diffHour === 1 ? '' : 's'} ago`;
  } else if (diffDay < 7) {
    if (locale === 'ar') {
      return `منذ ${diffDay} ${arPlural(diffDay, 'يوم', 'أيام')}`;
    }
    return `${diffDay} day${diffDay === 1 ? '' : 's'} ago`;
  } else if (diffWeek < 4) {
    if (locale === 'ar') {
      return `منذ ${diffWeek} ${arPlural(diffWeek, 'أسبوع', 'أسابيع')}`;
    }
    return `${diffWeek} week${diffWeek === 1 ? '' : 's'} ago`;
  } else if (diffMonth < 12) {
    if (locale === 'ar') {
      return `منذ ${diffMonth} ${arPlural(diffMonth, 'شهر', 'شهور')}`;
    }
    return `${diffMonth} month${diffMonth === 1 ? '' : 's'} ago`;
  } else {
    if (locale === 'ar') {
      return `منذ ${diffYear} ${arPlural(diffYear, 'سنة', 'سنوات')}`;
    }
    return `${diffYear} year${diffYear === 1 ? '' : 's'} ago`;
  }
}

/**
 * Check if date is today
 *
 * @param date - Date string, number, or Date object
 * @returns True if date is today
 *
 * @example
 * ```ts
 * isToday(new Date()) // true
 * isToday('2024-01-15') // false (unless today is Jan 15, 2024)
 * ```
 */
export function isToday(date: string | number | Date): boolean {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  const today = new Date();

  return (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  );
}

/**
 * Check if date is yesterday
 *
 * @param date - Date string, number, or Date object
 * @returns True if date is yesterday
 */
export function isYesterday(date: string | number | Date): boolean {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return (
    dateObj.getDate() === yesterday.getDate() &&
    dateObj.getMonth() === yesterday.getMonth() &&
    dateObj.getFullYear() === yesterday.getFullYear()
  );
}

/**
 * Check if date is in the past
 *
 * @param date - Date string, number, or Date object
 * @returns True if date is in the past
 */
export function isPast(date: string | number | Date): boolean {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  return dateObj.getTime() < Date.now();
}

/**
 * Check if date is in the future
 *
 * @param date - Date string, number, or Date object
 * @returns True if date is in the future
 */
export function isFuture(date: string | number | Date): boolean {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  return dateObj.getTime() > Date.now();
}

/**
 * Add days to a date
 *
 * @param date - Date string, number, or Date object
 * @param days - Number of days to add (can be negative)
 * @returns New date with days added
 *
 * @example
 * ```ts
 * addDays(new Date(), 7) // One week from now
 * addDays(new Date(), -7) // One week ago
 * ```
 */
export function addDays(date: string | number | Date, days: number): Date {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : new Date(date);
  dateObj.setDate(dateObj.getDate() + days);
  return dateObj;
}

/**
 * Get start of day (00:00:00)
 *
 * @param date - Date string, number, or Date object
 * @returns New date at start of day
 */
export function startOfDay(date: string | number | Date): Date {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : new Date(date);
  dateObj.setHours(0, 0, 0, 0);
  return dateObj;
}

/**
 * Get end of day (23:59:59)
 *
 * @param date - Date string, number, or Date object
 * @returns New date at end of day
 */
export function endOfDay(date: string | number | Date): Date {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : new Date(date);
  dateObj.setHours(23, 59, 59, 999);
  return dateObj;
}

/**
 * Format date for input[type="date"]
 *
 * @param date - Date string, number, or Date object
 * @returns YYYY-MM-DD string
 *
 * @example
 * ```ts
 * formatDateInput(new Date('2024-01-15')) // '2024-01-15'
 * ```
 */
export function formatDateInput(date: string | number | Date): string {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
