/**
 * Tasks Screen
 * Task management with filters and grouping by department
 */

import { useState } from 'react';
import { Calendar, User, Flag, CheckCircle2, Clock } from 'lucide-react';
import { FilterTabs } from '@/shared/components/FilterTabs';
import { PageHeader } from '@/shared/components/PageHeader';
import { Task } from '@/shared/types/screen-data-models';

const TASKS: Task[] = [
  {
    id: 1,
    title: 'Review Invoice Reconciliation Model',
    department: 'Finance',
    assignee: 'Sara Ahmed',
    dueDate: '2025-10-22',
    priority: 'High',
    status: 'In Progress',
  },
  {
    id: 2,
    title: 'Test RFP Evaluation Accuracy',
    department: 'Procurement',
    assignee: 'Mohammed Ali',
    dueDate: '2025-10-25',
    priority: 'Medium',
    status: 'Pending',
  },
  {
    id: 3,
    title: 'Deploy Demand Forecasting to Production',
    department: 'Operations',
    assignee: 'Fatima Hassan',
    dueDate: '2025-10-20',
    priority: 'High',
    status: 'Overdue',
  },
  {
    id: 4,
    title: 'Update Contract Review Training Data',
    department: 'Legal',
    assignee: 'Ahmed Khalid',
    dueDate: '2025-10-28',
    priority: 'Low',
    status: 'Pending',
  },
  {
    id: 5,
    title: 'Prepare Customer Insights Report',
    department: 'Marketing',
    assignee: 'Noura Salem',
    dueDate: '2025-10-23',
    priority: 'Medium',
    status: 'In Progress',
  },
];

const PRIORITY_CONFIG = {
  High: {
    color: 'danger',
    bgClass: 'bg-danger-bg',
    textClass: 'text-danger-text',
    borderClass: 'border-danger-border',
  },
  Medium: {
    color: 'warning',
    bgClass: 'bg-warning-bg',
    textClass: 'text-warning-text',
    borderClass: 'border-warning-border',
  },
  Low: {
    color: 'info',
    bgClass: 'bg-info-bg',
    textClass: 'text-info-text',
    borderClass: 'border-info-border',
  },
};

const STATUS_CONFIG = {
  'In Progress': {
    icon: Clock,
    bgClass: 'bg-primary/10',
    textClass: 'text-primary',
  },
  Pending: {
    icon: Flag,
    bgClass: 'bg-text-tertiary/10',
    textClass: 'text-text-tertiary',
  },
  Overdue: {
    icon: CheckCircle2,
    bgClass: 'bg-danger/10',
    textClass: 'text-danger',
  },
};

export function TasksScreen() {
  const [activeFilter, setActiveFilter] = useState('All Tasks');

  // Group tasks by department
  const tasksByDepartment = TASKS.reduce((acc, task) => {
    if (!acc[task.department]) {
      acc[task.department] = [];
    }
    acc[task.department].push(task);
    return acc;
  }, {} as Record<string, typeof TASKS>);

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 md:p-6 lg:p-8 space-y-6">
        {/* Page Header */}
        <PageHeader
          title="Tasks"
          subtitle="Manage and track your AI project tasks"
          action={
            <button className="btn-primary">
              + New Task
            </button>
          }
        />

        {/* Filter Buttons */}
        <FilterTabs
          items={['All Tasks', 'In Progress', 'Pending', 'Overdue', 'Completed']}
          activeItem={activeFilter}
          onChange={setActiveFilter}
        />

        {/* Tasks Grouped by Department */}
        <div className="space-y-6">
          {Object.entries(tasksByDepartment).map(([department, tasks]) => (
            <div key={department} className="card p-6">
              <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                <span>{department}</span>
                <span className="text-sm font-normal text-text-tertiary">
                  ({tasks.length} {tasks.length === 1 ? 'task' : 'tasks'})
                </span>
              </h2>

              <div className="space-y-3">
                {tasks.map((task) => {
                  const priorityConfig = PRIORITY_CONFIG[task.priority as keyof typeof PRIORITY_CONFIG];
                  const statusConfig = STATUS_CONFIG[task.status as keyof typeof STATUS_CONFIG];
                  const StatusIcon = statusConfig.icon;

                  return (
                    <div
                      key={task.id}
                      className="p-4 rounded-lg bg-background-secondary hover:bg-background-tertiary transition-colors duration-200 cursor-pointer"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start gap-3 mb-2">
                            <div className="mt-1">
                              <StatusIcon className={`h-5 w-5 ${statusConfig.textClass}`} />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-text-primary mb-1">
                                {task.title}
                              </h3>
                              <div className="flex flex-wrap items-center gap-3 text-sm text-text-secondary">
                                <div className="flex items-center gap-1">
                                  <User className="h-4 w-4" />
                                  {task.assignee}
                                </div>
                                <span className="text-text-tertiary">•</span>
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {task.dueDate}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${priorityConfig.bgClass} ${priorityConfig.textClass} border ${priorityConfig.borderClass}`}
                          >
                            {task.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
