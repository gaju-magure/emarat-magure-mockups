/**
 * Mock Tasks Service
 *
 * Provides realistic task data for demo purposes
 */

import type { Task, TaskStats } from '@/types/task.types';

/**
 * Mock tasks data
 */
export const MOCK_TASKS: Task[] = [
  // URGENT TASKS
  {
    id: 'task-001',
    title: 'Review IT Infrastructure RFP Evaluation',
    description: 'Final review of vendor proposals before deadline',
    urgency: 'urgent',
    status: 'pending',
    source: 'rfp',
    sourceId: 'rfp-001',
    dueDate: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    assignee: {
      id: 'user-001',
      name: 'Sarah Al-Mansouri',
    },
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    metadata: {
      rfpTitle: 'IT Infrastructure Upgrade',
    },
  },
  {
    id: 'task-002',
    title: 'Approve Q4 Budget Revision',
    description: 'Review and approve updated Q4 budget allocations',
    urgency: 'urgent',
    status: 'pending',
    source: 'budget',
    dueDate: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
  },
  {
    id: 'task-003',
    title: 'Sign TechCorp Contract Renewal',
    description: 'Contract expires today - urgent signature required',
    urgency: 'urgent',
    status: 'pending',
    source: 'contract',
    sourceId: 'contract-045',
    dueDate: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
    metadata: {
      contractValue: 450000,
      vendorName: 'TechCorp Solutions',
    },
  },

  // HIGH PRIORITY
  {
    id: 'task-004',
    title: 'Team Performance Review Meeting',
    description: 'Quarterly performance review with procurement team',
    urgency: 'high',
    status: 'in_progress',
    source: 'manual',
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
  },
  {
    id: 'task-005',
    title: 'Review Vendor Compliance Reports',
    description: 'Check compliance status for top 10 vendors',
    urgency: 'high',
    status: 'pending',
    source: 'compliance',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'task-006',
    title: 'Update IT Equipment Forecast',
    description: 'Adjust forecasts based on Q3 actuals',
    urgency: 'high',
    status: 'pending',
    source: 'budget',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },

  // MEDIUM PRIORITY
  {
    id: 'task-007',
    title: 'Evaluate Office Supplies Vendor Proposals',
    description: '3 proposals received - review and score',
    urgency: 'medium',
    status: 'pending',
    source: 'rfp',
    sourceId: 'rfp-002',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    metadata: {
      rfpTitle: 'Office Supplies Annual Contract',
    },
  },
  {
    id: 'task-008',
    title: 'Schedule Vendor Performance Review',
    description: 'Quarterly review with FastTech Corp (performance issues)',
    urgency: 'medium',
    status: 'pending',
    source: 'vendor',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    metadata: {
      vendorName: 'FastTech Corp',
    },
  },
  {
    id: 'task-009',
    title: 'Prepare Analytics Report for Leadership',
    description: 'Monthly procurement analytics summary',
    urgency: 'medium',
    status: 'in_progress',
    source: 'manual',
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
  },

  // LOW PRIORITY
  {
    id: 'task-010',
    title: 'Archive Completed RFPs from 2024 Q2',
    description: 'Clean up old RFP records',
    urgency: 'low',
    status: 'pending',
    source: 'manual',
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'task-011',
    title: 'Update Vendor Contact Directory',
    description: 'Refresh contact information for active vendors',
    urgency: 'low',
    status: 'pending',
    source: 'vendor',
    dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 3 weeks from now
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
  },

  // COMPLETED TASKS
  {
    id: 'task-012',
    title: 'Approve Facility Management Contract',
    urgency: 'high',
    status: 'completed',
    source: 'contract',
    dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    completedAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    metadata: {
      contractValue: 850000,
      vendorName: 'Facility Pro Services',
    },
  },
  {
    id: 'task-013',
    title: 'Review Monthly Spending Report',
    urgency: 'medium',
    status: 'completed',
    source: 'manual',
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    completedAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
  },
  {
    id: 'task-014',
    title: 'Submit Compliance Audit Documents',
    urgency: 'urgent',
    status: 'completed',
    source: 'compliance',
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    completedAt: new Date(Date.now() - 10 * 60 * 60 * 1000), // 10 hours ago
  },
];

/**
 * Get all tasks
 */
export function getAllTasks(): Task[] {
  return MOCK_TASKS;
}

/**
 * Get tasks filtered by status
 */
export function getTasksByStatus(status: Task['status']): Task[] {
  return MOCK_TASKS.filter(task => task.status === status);
}

/**
 * Get tasks filtered by urgency
 */
export function getTasksByUrgency(urgency: Task['urgency']): Task[] {
  return MOCK_TASKS.filter(task => task.urgency === urgency);
}

/**
 * Get overdue tasks
 */
export function getOverdueTasks(): Task[] {
  const now = new Date();
  return MOCK_TASKS.filter(
    task => task.status !== 'completed' && task.dueDate < now
  );
}

/**
 * Get tasks due today
 */
export function getTasksDueToday(): Task[] {
  const now = new Date();
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

  return MOCK_TASKS.filter(
    task => task.status !== 'completed' && task.dueDate <= endOfDay
  );
}

/**
 * Get tasks due this week
 */
export function getTasksDueThisWeek(): Task[] {
  const now = new Date();
  const endOfWeek = new Date(now);
  endOfWeek.setDate(now.getDate() + (7 - now.getDay())); // End of current week (Sunday)

  return MOCK_TASKS.filter(
    task => task.status !== 'completed' && task.dueDate <= endOfWeek
  );
}

/**
 * Get task statistics
 */
export function getTaskStats(): TaskStats {
  const allTasks = MOCK_TASKS;
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  return {
    total: allTasks.filter(t => t.status !== 'completed').length,
    urgent: allTasks.filter(t => t.urgency === 'urgent' && t.status !== 'completed').length,
    completedToday: allTasks.filter(
      t => t.completedAt && t.completedAt >= startOfDay
    ).length,
    overdue: allTasks.filter(
      t => t.status !== 'completed' && t.dueDate < now
    ).length,
    inProgress: allTasks.filter(t => t.status === 'in_progress').length,
  };
}

/**
 * Get task by ID
 */
export function getTaskById(id: string): Task | undefined {
  return MOCK_TASKS.find(task => task.id === id);
}

/**
 * Mark task as completed
 */
export function completeTask(id: string): void {
  const task = MOCK_TASKS.find(t => t.id === id);
  if (task) {
    task.status = 'completed';
    task.completedAt = new Date();
  }
}
