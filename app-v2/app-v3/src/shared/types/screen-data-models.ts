/**
 * Screen Data Models
 * TypeScript interfaces for all main application screen data structures
 * Single Responsibility: Define strict types for screen-level data constants
 *
 * Screens: HomeScreen, AppsScreen, TasksScreen, GovernanceScreen, InsightsScreen
 *
 * Benefits:
 * - Type safety throughout the application
 * - IntelliSense/autocomplete support
 * - Prevents typos and runtime errors
 * - Self-documenting code
 */

import { LucideIcon } from 'lucide-react';

// ============================================================================
// HomeScreen Data Models
// ============================================================================

export interface KPI {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
}

export interface Pilot {
  name: string;
  status: 'Live' | 'Testing' | 'Planned';
  users: number;
  accuracy: string;
}

export interface QuickAction {
  icon: string;
  label: string;
  color: string;
}

// ============================================================================
// AppsScreen Data Models
// ============================================================================

export interface App {
  id: number;
  name: string;
  description: string;
  icon: LucideIcon;
  status: 'Live' | 'In Development' | 'Planned';
  users: number;
  accuracy: string;
  savings: string;
}

export interface StatusConfig {
  icon: LucideIcon;
  color: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
}

// ============================================================================
// TasksScreen Data Models
// ============================================================================

export interface Task {
  id: number;
  title: string;
  department: string;
  assignee: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'In Progress' | 'Pending' | 'Overdue' | 'Completed';
}

export interface PriorityConfig {
  color: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
}

export interface StatusConfigWithIcon {
  icon: LucideIcon;
  bgClass: string;
  textClass: string;
}

// ============================================================================
// GovernanceScreen Data Models
// ============================================================================

export interface ComplianceMetric {
  label: string;
  status: 'Compliant' | 'Review Needed';
  score: number;
  icon: LucideIcon;
}

export interface AuditLog {
  id: number;
  action: string;
  app: string;
  user: string;
  timestamp: string;
  type: 'Deployment' | 'Access' | 'Training' | 'Report' | 'Security';
}

export interface ComplianceDocument {
  name: string;
  date: string;
  status: 'Current' | 'Under Review';
}

export interface ActionTypeConfig {
  bgClass: string;
  textClass: string;
}

// ============================================================================
// InsightsScreen Data Models
// ============================================================================

export interface QuickPrompt {
  icon: string;
  text: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  time: string;
}

// ============================================================================
// Common Type Unions
// ============================================================================

export type AppStatus = 'Live' | 'In Development' | 'Planned';
export type TaskPriority = 'High' | 'Medium' | 'Low';
export type TaskStatus = 'In Progress' | 'Pending' | 'Overdue' | 'Completed';
export type ComplianceStatus = 'Compliant' | 'Review Needed';
export type DocumentStatus = 'Current' | 'Under Review';
export type AuditLogType = 'Deployment' | 'Access' | 'Training' | 'Report' | 'Security';
