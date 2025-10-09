/**
 * Number Utility Functions
 *
 * Formatting and manipulation utilities for numbers
 * Supports both English and Arabic locales with proper number systems
 */

/**
 * Format number with thousands separators
 *
 * @param value - Number to format
 * @param locale - Language locale ('en' | 'ar')
 * @param options - Intl.NumberFormatOptions
 * @returns Formatted number string
 *
 * @example
 * ```ts
 * formatNumber(1234567, 'en') // '1,234,567'
 * formatNumber(1234567, 'ar') // '١٬٢٣٤٬٥٦٧'
 * formatNumber(1234.56, 'en', { minimumFractionDigits: 2 }) // '1,234.56'
 * ```
 */
export function formatNumber(
  value: number,
  locale: 'en' | 'ar' = 'en',
  options?: Intl.NumberFormatOptions
): string {
  const localeCode = locale === 'ar' ? 'ar-AE' : 'en-US';

  return new Intl.NumberFormat(localeCode, options).format(value);
}

/**
 * Format number as currency (AED)
 *
 * @param value - Number to format
 * @param locale - Language locale ('en' | 'ar')
 * @param currency - Currency code (default: 'AED')
 * @returns Formatted currency string
 *
 * @example
 * ```ts
 * formatCurrency(1234.56, 'en') // 'AED 1,234.56'
 * formatCurrency(1234.56, 'ar') // '١٬٢٣٤٫٥٦ د.إ'
 * formatCurrency(1234.56, 'en', 'USD') // '$1,234.56'
 * ```
 */
export function formatCurrency(
  value: number,
  locale: 'en' | 'ar' = 'en',
  currency: string = 'AED'
): string {
  const localeCode = locale === 'ar' ? 'ar-AE' : 'en-US';

  return new Intl.NumberFormat(localeCode, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format number as percentage
 *
 * @param value - Number to format (0-1 range or 0-100 if isDecimal is false)
 * @param locale - Language locale ('en' | 'ar')
 * @param decimals - Number of decimal places (default: 0)
 * @param isDecimal - Whether value is in decimal form 0-1 (default: true)
 * @returns Formatted percentage string
 *
 * @example
 * ```ts
 * formatPercent(0.1234, 'en') // '12%'
 * formatPercent(0.1234, 'en', 2) // '12.34%'
 * formatPercent(12.34, 'en', 2, false) // '12.34%'
 * formatPercent(0.1234, 'ar', 2) // '٪١٢٫٣٤'
 * ```
 */
export function formatPercent(
  value: number,
  locale: 'en' | 'ar' = 'en',
  decimals: number = 0,
  isDecimal: boolean = true
): string {
  const localeCode = locale === 'ar' ? 'ar-AE' : 'en-US';
  const displayValue = isDecimal ? value : value / 100;

  return new Intl.NumberFormat(localeCode, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(displayValue);
}

/**
 * Format large numbers with abbreviations (K, M, B)
 *
 * @param value - Number to format
 * @param locale - Language locale ('en' | 'ar')
 * @param decimals - Number of decimal places (default: 1)
 * @returns Abbreviated number string
 *
 * @example
 * ```ts
 * formatCompact(1234, 'en') // '1.2K'
 * formatCompact(1234567, 'en') // '1.2M'
 * formatCompact(1234567890, 'en') // '1.2B'
 * formatCompact(1234, 'ar') // '١٫٢ ألف'
 * ```
 */
export function formatCompact(
  value: number,
  locale: 'en' | 'ar' = 'en',
  decimals: number = 1
): string {
  const localeCode = locale === 'ar' ? 'ar-AE' : 'en-US';

  // Use Intl.NumberFormat with notation: 'compact' for modern browsers
  if ('compactDisplay' in Intl.NumberFormat.prototype) {
    return new Intl.NumberFormat(localeCode, {
      notation: 'compact',
      compactDisplay: 'short',
      minimumFractionDigits: 0,
      maximumFractionDigits: decimals,
    }).format(value);
  }

  // Fallback for older browsers
  const suffixes = locale === 'ar'
    ? ['', ' ألف', ' مليون', ' مليار', ' تريليون']
    : ['', 'K', 'M', 'B', 'T'];

  const tier = Math.floor(Math.log10(Math.abs(value)) / 3);

  if (tier === 0) return formatNumber(value, locale);

  const suffix = suffixes[tier];
  const scale = Math.pow(10, tier * 3);
  const scaled = value / scale;

  return scaled.toFixed(decimals) + suffix;
}

/**
 * Format number as file size (bytes, KB, MB, GB)
 *
 * @param bytes - File size in bytes
 * @param locale - Language locale ('en' | 'ar')
 * @param decimals - Number of decimal places (default: 1)
 * @returns Formatted file size string
 *
 * @example
 * ```ts
 * formatFileSize(1024, 'en') // '1.0 KB'
 * formatFileSize(1048576, 'en') // '1.0 MB'
 * formatFileSize(1073741824, 'en') // '1.0 GB'
 * formatFileSize(1024, 'ar') // '١٫٠ ك.ب'
 * ```
 */
export function formatFileSize(
  bytes: number,
  locale: 'en' | 'ar' = 'en',
  decimals: number = 1
): string {
  if (bytes === 0) return locale === 'ar' ? '٠ بايت' : '0 Bytes';

  const units = locale === 'ar'
    ? ['بايت', 'ك.ب', 'م.ب', 'ج.ب', 'ت.ب']
    : ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = bytes / Math.pow(k, i);

  const formattedValue = formatNumber(value, locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return `${formattedValue} ${units[i]}`;
}

/**
 * Format number with ordinal suffix (1st, 2nd, 3rd, etc.)
 *
 * @param value - Number to format
 * @param locale - Language locale ('en' | 'ar')
 * @returns Number with ordinal suffix
 *
 * @example
 * ```ts
 * formatOrdinal(1, 'en') // '1st'
 * formatOrdinal(2, 'en') // '2nd'
 * formatOrdinal(3, 'en') // '3rd'
 * formatOrdinal(21, 'en') // '21st'
 * formatOrdinal(1, 'ar') // 'الأول'
 * ```
 */
export function formatOrdinal(value: number, locale: 'en' | 'ar' = 'en'): string {
  if (locale === 'ar') {
    // Simplified Arabic ordinals (first 10)
    const arabicOrdinals = [
      'الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس',
      'السادس', 'السابع', 'الثامن', 'التاسع', 'العاشر'
    ];
    return arabicOrdinals[value - 1] || `${formatNumber(value, 'ar')}`;
  }

  // English ordinals
  const j = value % 10;
  const k = value % 100;

  if (j === 1 && k !== 11) {
    return value + 'st';
  }
  if (j === 2 && k !== 12) {
    return value + 'nd';
  }
  if (j === 3 && k !== 13) {
    return value + 'rd';
  }
  return value + 'th';
}

/**
 * Clamp number between min and max
 *
 * @param value - Number to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Clamped number
 *
 * @example
 * ```ts
 * clamp(5, 0, 10) // 5
 * clamp(-5, 0, 10) // 0
 * clamp(15, 0, 10) // 10
 * ```
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Round number to specified decimal places
 *
 * @param value - Number to round
 * @param decimals - Number of decimal places
 * @returns Rounded number
 *
 * @example
 * ```ts
 * round(1.2345, 2) // 1.23
 * round(1.2355, 2) // 1.24
 * ```
 */
export function round(value: number, decimals: number = 0): number {
  const multiplier = Math.pow(10, decimals);
  return Math.round(value * multiplier) / multiplier;
}

/**
 * Calculate percentage change between two values
 *
 * @param oldValue - Original value
 * @param newValue - New value
 * @returns Percentage change (positive or negative)
 *
 * @example
 * ```ts
 * percentChange(100, 150) // 50
 * percentChange(100, 50) // -50
 * ```
 */
export function percentChange(oldValue: number, newValue: number): number {
  if (oldValue === 0) return 0;
  return ((newValue - oldValue) / oldValue) * 100;
}

/**
 * Check if number is within range (inclusive)
 *
 * @param value - Number to check
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns True if number is in range
 */
export function inRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * Parse number from string (handles localized input)
 *
 * @param value - String to parse
 * @param locale - Language locale ('en' | 'ar')
 * @returns Parsed number or NaN
 *
 * @example
 * ```ts
 * parseNumber('1,234.56', 'en') // 1234.56
 * parseNumber('١٬٢٣٤٫٥٦', 'ar') // 1234.56
 * ```
 */
export function parseNumber(value: string, locale: 'en' | 'ar' = 'en'): number {
  if (locale === 'ar') {
    // Convert Arabic numerals to Western numerals
    const arabicToWestern: Record<string, string> = {
      '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4',
      '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9',
      '٫': '.', '٬': ''
    };
    value = value.replace(/[٠-٩٫٬]/g, (match) => arabicToWestern[match] || match);
  }

  // Remove thousands separators
  const cleaned = value.replace(/,/g, '');

  return parseFloat(cleaned);
}
