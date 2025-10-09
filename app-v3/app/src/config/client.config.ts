/**
 * Client Configuration System
 *
 * Purpose: Enable white-labeling for multiple clients without code changes
 * Usage: Import ACTIVE_CLIENT to access current client configuration
 *
 * To add a new client:
 * 1. Create a new ClientConfig object below
 * 2. Add the client ID to ClientId type in client.types.ts
 * 3. Update ACTIVE_CLIENT to point to your new client
 */

import type { ClientConfig, ClientId } from '@/types/client.types';

/**
 * EMARAT Configuration
 * Main client for Emarat AI platform
 */
export const EMARAT_CONFIG: ClientConfig = {
  id: 'emarat',

  theme: {
    // Emarat brand colors
    primary: '#003a85',           // Emarat Blue
    primaryHover: '#002c66',      // Darker blue for hover
    secondary: '#47a01a',         // Emarat Green
    secondaryHover: '#3a8015',    // Darker green for hover

    // Status colors
    success: '#50aa1b',           // Green
    warning: '#d97706',           // Amber
    danger: '#dc2626',            // Red
    info: '#0369a1',              // Sky blue
  },

  branding: {
    name: 'Emarat AI',
    shortName: 'Emarat',
    logo: '/emarat-logo.svg',
    logoDark: '/emarat-logo.svg',  // Same logo works for both modes
    favicon: '/favicon.ico',
    tagline: 'Your AI-Powered Business Intelligence Platform',
  },

  typography: {
    fontFamily: 'Karbon, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontFamilyArabic: 'TheSansArabic, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontWeightHeading: 600,       // Semi-bold for headings
    fontWeightBody: 400,          // Regular for body
    fontWeightBold: 600,          // Semi-bold (not too heavy)
  },

  defaultLanguage: 'en',
  supportedLanguages: ['en', 'ar'],

  aiName: 'Jarvis',

  features: {
    darkMode: true,
    multiLanguage: true,
    notifications: true,
    analytics: true,
  },
};

/**
 * DEMO Configuration
 * Generic demo client for testing white-labeling
 */
export const DEMO_CONFIG: ClientConfig = {
  id: 'demo',

  theme: {
    primary: '#6366f1',           // Indigo
    primaryHover: '#4f46e5',      // Darker indigo
    secondary: '#10b981',         // Emerald
    secondaryHover: '#059669',    // Darker emerald

    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6',
  },

  branding: {
    name: 'Demo AI',
    shortName: 'Demo',
    logo: '/emarat-logo.svg',     // Placeholder - replace with demo logo
    favicon: '/favicon.ico',
    tagline: 'AI Platform Demo',
  },

  typography: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontWeightHeading: 700,
    fontWeightBody: 400,
    fontWeightBold: 600,
  },

  defaultLanguage: 'en',
  supportedLanguages: ['en'],

  aiName: 'Assistant',

  features: {
    darkMode: true,
    multiLanguage: false,
    notifications: true,
    analytics: false,
  },
};

/**
 * Client Configuration Map
 * Maps client IDs to their configurations
 */
export const CLIENT_CONFIGS: Record<ClientId, ClientConfig> = {
  emarat: EMARAT_CONFIG,
  demo: DEMO_CONFIG,
};

/**
 * Active Client Configuration
 *
 * IMPORTANT: Change this value to switch between clients
 * Options: 'emarat' | 'demo'
 *
 * For production: Set via environment variable
 * Example: const activeClientId = (import.meta.env.VITE_CLIENT_ID as ClientId) || 'emarat';
 */
const activeClientId: ClientId = 'emarat';

/**
 * Get the active client configuration
 * Use this throughout the app to access client settings
 */
export const ACTIVE_CLIENT: ClientConfig = CLIENT_CONFIGS[activeClientId];

/**
 * Helper function to check if a feature is enabled
 */
export function isFeatureEnabled(feature: keyof ClientConfig['features']): boolean {
  return ACTIVE_CLIENT.features[feature];
}

/**
 * Helper function to get theme color
 */
export function getThemeColor(color: keyof ClientConfig['theme']): string {
  return ACTIVE_CLIENT.theme[color];
}

/**
 * Apply client theme colors to CSS variables
 * Call this in ClientContext to update CSS vars dynamically
 */
export function applyThemeColors(config: ClientConfig): void {
  const root = document.documentElement;

  // Apply theme colors to CSS variables
  root.style.setProperty('--color-primary', config.theme.primary);
  root.style.setProperty('--color-primary-hover', config.theme.primaryHover);
  root.style.setProperty('--color-secondary', config.theme.secondary);
  root.style.setProperty('--color-secondary-hover', config.theme.secondaryHover);
  root.style.setProperty('--color-success', config.theme.success);
  root.style.setProperty('--color-warning', config.theme.warning);
  root.style.setProperty('--color-danger', config.theme.danger);
  root.style.setProperty('--color-info', config.theme.info);

  // Apply typography
  root.style.setProperty('--font-family', config.typography.fontFamily);
  if (config.typography.fontFamilyArabic) {
    root.style.setProperty('--font-family-arabic', config.typography.fontFamilyArabic);
  }
}
