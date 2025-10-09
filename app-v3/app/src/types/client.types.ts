/**
 * Client Configuration Types
 * For white-labeling support across multiple clients
 */

export interface ClientTheme {
  /** Primary brand color (hex) */
  primary: string;
  /** Primary hover state (hex) */
  primaryHover: string;
  /** Secondary/accent color (hex) */
  secondary: string;
  /** Secondary hover state (hex) */
  secondaryHover: string;
  /** Success color (hex) */
  success: string;
  /** Warning color (hex) */
  warning: string;
  /** Danger/error color (hex) */
  danger: string;
  /** Info color (hex) */
  info: string;
}

export interface ClientBranding {
  /** Client display name */
  name: string;
  /** Short name (for mobile/compact views) */
  shortName: string;
  /** Logo URL/path (light mode) */
  logo: string;
  /** Logo URL/path (dark mode) */
  logoDark?: string;
  /** Favicon URL/path */
  favicon: string;
  /** Company tagline */
  tagline?: string;
}

export interface ClientTypography {
  /** Primary font family */
  fontFamily: string;
  /** Arabic/RTL font family */
  fontFamilyArabic?: string;
  /** Font weight for headings */
  fontWeightHeading: number;
  /** Font weight for body text */
  fontWeightBody: number;
  /** Font weight for bold text */
  fontWeightBold: number;
}

export interface ClientConfig {
  /** Unique client identifier */
  id: string;
  /** Theme configuration */
  theme: ClientTheme;
  /** Branding assets and text */
  branding: ClientBranding;
  /** Typography settings */
  typography: ClientTypography;
  /** Default language (ISO 639-1 code) */
  defaultLanguage: 'en' | 'ar';
  /** Supported languages */
  supportedLanguages: ('en' | 'ar')[];
  /** AI assistant name (e.g., "Jarvis", "Maggy") */
  aiName: string;
  /** Enable/disable features */
  features: {
    /** Enable dark mode toggle */
    darkMode: boolean;
    /** Enable language switching */
    multiLanguage: boolean;
    /** Enable notifications */
    notifications: boolean;
    /** Enable analytics */
    analytics: boolean;
  };
}

/**
 * Supported client identifiers
 */
export type ClientId = 'emarat' | 'demo';
