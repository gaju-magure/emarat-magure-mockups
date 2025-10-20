/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CLIENT_NAME: string;
  readonly VITE_CLIENT_LOGO: string;
  readonly VITE_PRIMARY_COLOR: string;
  readonly VITE_BRAND_GREEN: string;
  readonly VITE_DEFAULT_THEME: 'light' | 'dark';
  readonly VITE_DEFAULT_LANGUAGE: 'en' | 'ar';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
