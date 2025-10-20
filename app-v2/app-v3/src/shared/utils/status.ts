/**
 * Status Utilities
 * Helper functions for mapping status strings to semantic variants
 * Single Responsibility: Centralize status-to-variant mapping logic
 */

import { StatusVariant } from '@/shared/types/app-details';
import { PillVariant } from '@/shared/components/StatusPill';

/**
 * Map status string to StatusVariant (for InsightCard)
 * Handles common status values across the application
 */
export function getStatusVariant(status: string): StatusVariant {
  const STATUS_MAP: Record<string, StatusVariant> = {
    // Success states
    'matched': 'success',
    'live': 'success',
    'active': 'success',
    'approved': 'success',
    'completed': 'success',

    // Warning states
    'review': 'warning',
    'pending': 'warning',
    'in development': 'warning',
    'under review': 'warning',
    'revision needed': 'warning',

    // Danger states
    'failed': 'danger',
    'expired': 'danger',
    'inactive': 'danger',
    'rejected': 'danger',

    // Info/neutral states
    'planned': 'info',
    'scheduled': 'info',
  };

  return STATUS_MAP[status.toLowerCase()] || 'info';
}

/**
 * Map status string to PillVariant (for StatusPill)
 * Uses same logic as getStatusVariant but returns PillVariant type
 */
export function getPillVariant(status: string): PillVariant {
  return getStatusVariant(status) as PillVariant;
}
