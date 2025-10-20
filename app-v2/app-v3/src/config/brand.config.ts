/**
 * Brand Configuration
 * Reads client branding from environment variables
 * Allows one-click theme changes via .env.local
 */

export interface BrandConfig {
  name: string;
  logo: string;
  colors: {
    primary: string;
    brandGreen: string;
  };
  defaults: {
    theme: 'light' | 'dark';
    language: 'en' | 'ar';
  };
}

const brandConfig: BrandConfig = {
  name: import.meta.env.VITE_CLIENT_NAME || 'emarat',
  logo: import.meta.env.VITE_CLIENT_LOGO || '/assets/emarat-logo.svg',
  colors: {
    primary: import.meta.env.VITE_PRIMARY_COLOR || '#003a85',
    brandGreen: import.meta.env.VITE_BRAND_GREEN || '#47a01a',
  },
  defaults: {
    theme: (import.meta.env.VITE_DEFAULT_THEME as 'light' | 'dark') || 'dark',
    language: (import.meta.env.VITE_DEFAULT_LANGUAGE as 'en' | 'ar') || 'en',
  },
};

export default brandConfig;
