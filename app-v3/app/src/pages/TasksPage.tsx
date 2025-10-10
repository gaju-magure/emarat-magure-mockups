/**
 * Tasks Dashboard Page
 *
 * Displays all user tasks with filtering, grouping, and quick stats
 */

import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ClockIcon,
  ExclamationTriangleIcon,
  FireIcon,
  ChartBarIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleSolidIcon } from '@heroicons/react/24/solid';
import type { Task } from '@/types/task.types';
import {
  getAllTasks,
  getTaskStats,
  getTasksByStatus,
  getTasksDueToday,
  getTasksDueThisWeek,
  completeTask,
} from '@/services/mock/tasks.mock';
import { MetricCard } from '@/components/molecules/MetricCard';
import { formatRelativeTime } from '@/utils/date';
import { cn } from '@/utils/classnames';

type TaskFilter = 'all' | 'urgent' | 'today' | 'week' | 'completed';

export function TasksPage() {
  const [activeFilter, setActiveFilter] = useState<TaskFilter>('all');
  const [tasks, setTasks] = useState<Task[]>(getAllTasks());
  const stats = getTaskStats();

  // Filter tasks based on active filter
  const filteredTasks = useMemo(() => {
    switch (activeFilter) {
      case 'urgent':
        return tasks.filter(t => t.urgency === 'urgent' && t.status !== 'completed');
      case 'today':
        return getTasksDueToday();
      case 'week':
        return getTasksDueThisWeek();
      case 'completed':
        return getTasksByStatus('completed');
      default:
        return tasks.filter(t => t.status !== 'completed');
    }
  }, [activeFilter, tasks]);

  // Group tasks by urgency
  const groupedTasks = useMemo(() => {
    if (activeFilter === 'completed') {
      return { completed: filteredTasks };
    }

    return {
      urgent: filteredTasks.filter(t => t.urgency === 'urgent'),
      high: filteredTasks.filter(t => t.urgency === 'high'),
      medium: filteredTasks.filter(t => t.urgency === 'medium'),
      low: filteredTasks.filter(t => t.urgency === 'low'),
    };
  }, [filteredTasks, activeFilter]);

  const handleCompleteTask = (taskId: string) => {
    completeTask(taskId);
    setTasks(getAllTasks());
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
          My Tasks
        </h1>
        <p className="text-text-secondary">
          Manage your procurement tasks and approvals
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 mb-6">
        <MetricCard
          label="Total Tasks"
          value={stats.total}
          icon={ChartBarIcon}
          size="sm"
        />
        <MetricCard
          label="Urgent"
          value={stats.urgent}
          icon={FireIcon}
          variant="danger"
          size="sm"
        />
        <MetricCard
          label="Completed Today"
          value={stats.completedToday}
          icon={CheckCircleSolidIcon}
          variant="success"
          size="sm"
        />
        <MetricCard
          label="In Progress"
          value={stats.inProgress}
          icon={ClockIcon}
          variant="primary"
          size="sm"
        />
        <MetricCard
          label="Overdue"
          value={stats.overdue}
          icon={ExclamationTriangleIcon}
          variant="warning"
          size="sm"
        />
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 glass rounded-xl p-1.5 inline-flex gap-1">
        {[
          { id: 'all', label: 'All Tasks', count: tasks.filter(t => t.status !== 'completed').length },
          { id: 'urgent', label: 'Urgent', count: stats.urgent },
          { id: 'today', label: 'Due Today', count: getTasksDueToday().length },
          { id: 'week', label: 'This Week', count: getTasksDueThisWeek().length },
          { id: 'completed', label: 'Completed', count: tasks.filter(t => t.status === 'completed').length },
        ].map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id as TaskFilter)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-all',
              activeFilter === filter.id
                ? 'bg-primary text-white shadow-md'
                : 'text-text-secondary hover:text-text-primary hover:bg-background-secondary'
            )}
          >
            {filter.label}
            <span className="ml-2 text-xs opacity-75">({filter.count})</span>
          </button>
        ))}
      </div>

      {/* Tasks List */}
      <div className="space-y-6">
        {activeFilter === 'completed' ? (
          /* Completed Tasks */
          <div>
            <h2 className="text-lg font-semibold text-text-primary mb-3 flex items-center gap-2">
              <CheckCircleSolidIcon className="w-5 h-5 text-success" />
              Completed Tasks ({groupedTasks.completed?.length || 0})
            </h2>
            {groupedTasks.completed && groupedTasks.completed.length > 0 ? (
              <div className="space-y-2">
                {groupedTasks.completed.map((task) => (
                  <TaskCard key={task.id} task={task} onComplete={handleCompleteTask} />
                ))}
              </div>
            ) : (
              <EmptyState message="No completed tasks yet" />
            )}
          </div>
        ) : (
          /* Active Tasks Grouped by Urgency */
          <>
            {groupedTasks.urgent && groupedTasks.urgent.length > 0 && (
              <TaskGroup
                title="Urgent"
                icon={<FireIcon className="w-5 h-5 text-danger" />}
                tasks={groupedTasks.urgent}
                onComplete={handleCompleteTask}
              />
            )}

            {groupedTasks.high && groupedTasks.high.length > 0 && (
              <TaskGroup
                title="High Priority"
                icon={<ExclamationTriangleIcon className="w-5 h-5 text-warning" />}
                tasks={groupedTasks.high}
                onComplete={handleCompleteTask}
              />
            )}

            {groupedTasks.medium && groupedTasks.medium.length > 0 && (
              <TaskGroup
                title="Medium Priority"
                icon={<ClockIcon className="w-5 h-5 text-primary" />}
                tasks={groupedTasks.medium}
                onComplete={handleCompleteTask}
              />
            )}

            {groupedTasks.low && groupedTasks.low.length > 0 && (
              <TaskGroup
                title="Low Priority"
                icon={<FunnelIcon className="w-5 h-5 text-text-tertiary" />}
                tasks={groupedTasks.low}
                onComplete={handleCompleteTask}
              />
            )}

            {filteredTasks.length === 0 && (
              <EmptyState message="No tasks match the selected filter" />
            )}
          </>
        )}
      </div>
    </div>
  );
}

// Task Group Component
interface TaskGroupProps {
  title: string;
  icon: React.ReactNode;
  tasks: Task[];
  onComplete: (taskId: string) => void;
}

function TaskGroup({ title, icon, tasks, onComplete }: TaskGroupProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-text-primary mb-3 flex items-center gap-2">
        {icon}
        {title} ({tasks.length})
      </h2>
      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onComplete={onComplete} />
        ))}
      </div>
    </div>
  );
}

// Task Card Component
interface TaskCardProps {
  task: Task;
  onComplete: (taskId: string) => void;
}

function TaskCard({ task, onComplete }: TaskCardProps) {
  const isOverdue = task.status !== 'completed' && new Date(task.dueDate) < new Date();
  const isCompleted = task.status === 'completed';

  const getUrgencyColor = (urgency: Task['urgency']) => {
    switch (urgency) {
      case 'urgent':
        return 'border-l-danger bg-danger/5';
      case 'high':
        return 'border-l-warning bg-warning/5';
      case 'medium':
        return 'border-l-primary bg-primary/5';
      case 'low':
        return 'border-l-text-tertiary bg-background-secondary';
    }
  };

  const getSourceIcon = (source: Task['source']) => {
    switch (source) {
      case 'rfp':
        return '📋';
      case 'contract':
        return '📄';
      case 'budget':
        return '💰';
      case 'vendor':
        return '🏢';
      case 'compliance':
        return '✅';
      default:
        return '📌';
    }
  };

  const getSourceLabel = (source: Task['source']) => {
    return source.charAt(0).toUpperCase() + source.slice(1);
  };

  return (
    <div
      className={cn(
        'glass rounded-xl p-4 border-l-4 transition-all hover:shadow-md',
        getUrgencyColor(task.urgency),
        isCompleted && 'opacity-60'
      )}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={() => !isCompleted && onComplete(task.id)}
          className={cn(
            'mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0',
            isCompleted
              ? 'bg-success border-success'
              : 'border-text-tertiary hover:border-primary'
          )}
          disabled={isCompleted}
        >
          {isCompleted && <CheckCircleSolidIcon className="w-4 h-4 text-white" />}
        </button>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex-1">
              <h3 className={cn(
                'font-medium text-text-primary mb-1',
                isCompleted && 'line-through'
              )}>
                {task.title}
              </h3>
              {task.description && (
                <p className="text-sm text-text-secondary line-clamp-2">
                  {task.description}
                </p>
              )}
            </div>

            {/* Source Badge */}
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-background-secondary text-xs font-medium text-text-secondary flex-shrink-0">
              <span>{getSourceIcon(task.source)}</span>
              <span>{getSourceLabel(task.source)}</span>
            </div>
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-text-tertiary">
            {/* Due Date */}
            <div className={cn(
              'flex items-center gap-1',
              isOverdue && 'text-danger font-medium'
            )}>
              <ClockIcon className="w-3.5 h-3.5" />
              <span>
                {isOverdue ? 'Overdue' : 'Due'} {formatRelativeTime(task.dueDate)}
              </span>
            </div>

            {/* Assignee */}
            {task.assignee && (
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] font-bold">
                  {task.assignee.name.charAt(0)}
                </div>
                <span>{task.assignee.name}</span>
              </div>
            )}

            {/* Completion Time */}
            {isCompleted && task.completedAt && (
              <div className="flex items-center gap-1 text-success">
                <CheckCircleSolidIcon className="w-3.5 h-3.5" />
                <span>Completed {formatRelativeTime(task.completedAt)}</span>
              </div>
            )}

            {/* Metadata Info */}
            {task.metadata?.rfpTitle && (
              <Link
                to={`/apps/rfp/${task.sourceId}`}
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                <span>→ {task.metadata.rfpTitle}</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Empty State Component
function EmptyState({ message }: { message: string }) {
  return (
    <div className="glass rounded-xl p-12 text-center">
      <div className="w-16 h-16 bg-background-secondary rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircleSolidIcon className="w-8 h-8 text-success" />
      </div>
      <p className="text-text-secondary text-lg">{message}</p>
    </div>
  );
}
