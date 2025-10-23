/**
 * Alerts Panel Data Models
 * Types and sample data for alerts, activities, and quick stats
 */

import { ReactNode } from 'react';

export interface Alert {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  time: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
  actionUrl?: string;
}

export interface Activity {
  id: string;
  icon: string; // emoji
  action: string;
  user: string;
  time: string;
  type: 'ai' | 'user' | 'system';
  details?: string;
}

export interface QuickStat {
  label: string;
  value: string;
  change: number; // percentage or absolute
  trend: 'up' | 'down' | 'neutral';
  icon: ReactNode;
  color: 'primary' | 'accent' | 'success' | 'warning';
}

export interface AlertsPanelData {
  alerts: Alert[];
  activities: Activity[];
  stats: QuickStat[];
  unreadCount: number;
}
