/**
 * Application Entry Point
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppProviders } from '@/core/providers/AppProviders';
import App from './App';

// Import i18n config (initializes i18next)
import '@/config/i18n.config';

// Import base styles
import '@/design-system/styles/base.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>
);
