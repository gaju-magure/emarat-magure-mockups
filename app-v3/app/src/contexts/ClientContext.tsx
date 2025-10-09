/**
 * ClientContext
 *
 * Provides client configuration throughout the app
 * Applies theme colors to CSS variables for dynamic theming
 */

import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { ACTIVE_CLIENT, applyThemeColors } from '@/config/client.config';
import type { ClientConfig } from '@/types/client.types';

interface ClientContextType {
  /** Current active client configuration */
  client: ClientConfig;
  /** Check if a feature is enabled for the current client */
  isFeatureEnabled: (feature: keyof ClientConfig['features']) => boolean;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

interface ClientProviderProps {
  children: ReactNode;
  /** Optional client override (useful for testing) */
  client?: ClientConfig;
}

/**
 * ClientProvider Component
 *
 * Wraps the app to provide client configuration
 * Automatically applies theme colors to CSS variables on mount
 */
export function ClientProvider({ children, client = ACTIVE_CLIENT }: ClientProviderProps) {
  // Apply theme colors to CSS variables when client changes
  useEffect(() => {
    applyThemeColors(client);
  }, [client]);

  const value: ClientContextType = {
    client,
    isFeatureEnabled: (feature) => client.features[feature],
  };

  return <ClientContext.Provider value={value}>{children}</ClientContext.Provider>;
}

/**
 * useClient Hook
 *
 * Access client configuration in any component
 *
 * @example
 * ```tsx
 * const { client, isFeatureEnabled } = useClient();
 *
 * // Access branding
 * <img src={client.branding.logo} alt={client.branding.name} />
 *
 * // Check features
 * {isFeatureEnabled('darkMode') && <DarkModeToggle />}
 * ```
 */
export function useClient(): ClientContextType {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error('useClient must be used within a ClientProvider');
  }
  return context;
}

// Named exports for convenience
ClientProvider.displayName = 'ClientProvider';
