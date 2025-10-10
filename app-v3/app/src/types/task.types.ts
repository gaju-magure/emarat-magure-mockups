/**
 * Task Type Definitions
 */

export type TaskUrgency = 'urgent' | 'high' | 'medium' | 'low';
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';
export type TaskSource = 'rfp' | 'contract' | 'budget' | 'vendor' | 'compliance' | 'manual';

export interface Task {
  id: string;
  title: string;
  description?: string;
  urgency: TaskUrgency;
  status: TaskStatus;
  source: TaskSource;
  sourceId?: string; // ID of related RFP, contract, etc.
  dueDate: Date;
  assignee?: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: Date;
  completedAt?: Date;
  metadata?: {
    rfpTitle?: string;
    contractValue?: number;
    vendorName?: string;
  };
}

export interface TaskFilters {
  status?: TaskStatus[];
  urgency?: TaskUrgency[];
  source?: TaskSource[];
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface TaskStats {
  total: number;
  urgent: number;
  completedToday: number;
  overdue: number;
  inProgress: number;
}
