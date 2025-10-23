/**
 * Theme System Type Definitions
 * Supports dynamic theme injection from platform
 */

export interface FontFile {
  weight: number;
  style: 'normal' | 'italic';
  format: 'woff' | 'woff2' | 'ttf' | 'otf';
  url: string;
}

export interface ThemeFont {
  name: string;
  fallback: string;
  files: FontFile[];
}

export interface ThemeBranding {
  companyName: string;
  tagline?: string;
  logo: {
    light: string;
    dark: string;
    icon: string;
  };
  favicon: {
    ico: string;
    png16: string;
    png32: string;
    appleTouchIcon: string;
    safariPinned: string;
  };
}

export interface ColorPalette {
  // Base colors
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;

  // Brand colors
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;

  // UI colors
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;

  // Borders & inputs
  border: string;
  input: string;
  inputBackground: string;
  ring: string;

  // Sidebar
  sidebar: string;
  sidebarForeground: string;
  sidebarPrimary: string;
  sidebarPrimaryForeground: string;
  sidebarAccent: string;
  sidebarAccentForeground: string;
  sidebarBorder: string;
  sidebarRing: string;

  // Charts
  chart1: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;

  // Semantic colors
  success: string;
  successBg: string;
  successBorder: string;
  successText: string;

  warning: string;
  warningBg: string;
  warningBorder: string;
  warningText: string;

  danger: string;
  dangerBg: string;
  dangerBorder: string;
  dangerText: string;

  info: string;
  infoBg: string;
  infoBorder: string;
  infoText: string;
}

export interface ThemeColors {
  light: ColorPalette;
  dark: ColorPalette;
}

export interface ThemeSpacing {
  radius: string;
}

export interface Theme {
  id: string;
  name: string;
  version: string;
  branding: ThemeBranding;
  fonts: {
    primary: ThemeFont;
    arabic?: ThemeFont;
    mono?: ThemeFont;
  };
  colors: ThemeColors;
  spacing: ThemeSpacing;
  customCss?: string;
}

export type ThemeMode = 'light' | 'dark';

export interface ThemeContextValue {
  theme: Theme | null;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  loadTheme: (themeUrl: string) => Promise<void>;
  setThemeData: (theme: Theme) => void;
  isLoading: boolean;
  error: string | null;
}

// Window API interface
export interface EmaratAIAPI {
  setThemeFromUrl: (url: string) => Promise<void>;
  setTheme: (theme: Theme) => void;
  setMode: (mode: ThemeMode) => void;
  getTheme: () => Theme | null;
  getMode: () => ThemeMode;
  onThemeChange: (callback: (theme: Theme) => void) => () => void;
}

declare global {
  interface Window {
    EmaratAI?: EmaratAIAPI;
  }
}
