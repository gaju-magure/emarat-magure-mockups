/**
 * Alert Types
 *
 * Type definitions for AI-powered priority alerts
 */

export type AlertType = 'urgent' | 'warning' | 'info';

export type AlertCategory =
  | 'rfp'
  | 'procurement'
  | 'compliance'
  | 'forecast'
  | 'approval'
  | 'deadline'
  | 'anomaly'
  | 'opportunity';

export interface AlertAction {
  label: string;
  href: string;
}

export interface AlertMetadata {
  /** AI confidence score (0-1) */
  confidence?: number;
  /** Data source */
  source?: string;
  /** Related entity ID */
  entityId?: string;
  /** Priority score (1-10) */
  priority?: number;
}

export interface Alert {
  id: string;
  type: AlertType;
  category: AlertCategory;
  title: string;
  description: string;
  timestamp: Date | string;
  action: AlertAction;
  metadata?: AlertMetadata;
  /** Already dismissed by user */
  dismissed?: boolean;
  /** User has seen this alert */
  seen?: boolean;
}
