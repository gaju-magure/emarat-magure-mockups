/**
 * useAlerts Hook
 *
 * Manages alerts state and actions
 * Provides top priority alerts for Jarvis home
 */

import { useState, useCallback } from 'react';
import { getTopAlerts } from '@/services/mock/alerts.mock';
import type { Alert } from '@/types/alert.types';

export interface UseAlertsResult {
  /** Top priority alerts */
  alerts: Alert[];
  /** Dismiss an alert */
  dismissAlert: (id: string) => void;
  /** Mark alert as seen */
  markAsSeen: (id: string) => void;
  /** Refresh alerts */
  refreshAlerts: () => void;
  /** Loading state */
  loading: boolean;
}

/**
 * useAlerts Hook
 *
 * @example
 * ```tsx
 * function PriorityAlerts() {
 *   const { alerts, dismissAlert } = useAlerts();
 *
 *   return (
 *     <div>
 *       {alerts.map(alert => (
 *         <AlertCard
 *           key={alert.id}
 *           alert={alert}
 *           onDismiss={() => dismissAlert(alert.id)}
 *         />
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */
export function useAlerts(limit: number = 3): UseAlertsResult {
  const [alerts, setAlerts] = useState<Alert[]>(() => getTopAlerts(limit));
  const [loading, setLoading] = useState(false);

  const dismissAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  }, []);

  const markAsSeen = useCallback((id: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id ? { ...alert, seen: true } : alert
      )
    );
  }, []);

  const refreshAlerts = useCallback(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setAlerts(getTopAlerts(limit));
      setLoading(false);
    }, 500);
  }, [limit]);

  return {
    alerts,
    dismissAlert,
    markAsSeen,
    refreshAlerts,
    loading,
  };
}
