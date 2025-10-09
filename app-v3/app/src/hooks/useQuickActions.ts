/**
 * useQuickActions Hook
 *
 * Provides role-based quick actions for users
 * Actions are customized based on user role and permissions
 */

import { useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  DocumentPlusIcon,
  CheckCircleIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  CogIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';

export interface QuickAction {
  id: string;
  label: string;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: number;
  /** Which roles can see this action */
  roles: string[];
  /** Primary action (highlighted) */
  primary?: boolean;
}

/**
 * All available quick actions
 */
const ALL_ACTIONS: QuickAction[] = [
  {
    id: 'new-rfp',
    label: 'Start RFP',
    description: 'Create new RFP evaluation',
    icon: DocumentPlusIcon,
    href: '/apps/rfp/new',
    roles: ['manager', 'admin', 'analyst'],
    primary: true,
  },
  {
    id: 'review-tasks',
    label: 'Review Tasks',
    description: 'Pending tasks',
    icon: CheckCircleIcon,
    href: '/tasks',
    badge: 5,
    roles: ['manager', 'admin', 'analyst', 'user'],
  },
  {
    id: 'view-analytics',
    label: 'Analytics',
    description: 'Procurement insights',
    icon: ChartBarIcon,
    href: '/apps/analytics',
    roles: ['manager', 'admin', 'analyst'],
  },
  {
    id: 'governance',
    label: 'Governance',
    description: 'AI model oversight',
    icon: ShieldCheckIcon,
    href: '/governance',
    roles: ['admin'],
  },
  {
    id: 'approvals',
    label: 'Approvals',
    description: 'Pending approvals',
    icon: ClipboardDocumentListIcon,
    href: '/apps/approvals',
    badge: 7,
    roles: ['manager', 'admin'],
  },
  {
    id: 'team',
    label: 'Team',
    description: 'Manage team',
    icon: UserGroupIcon,
    href: '/team',
    roles: ['manager', 'admin'],
  },
  {
    id: 'settings',
    label: 'Settings',
    description: 'Preferences',
    icon: CogIcon,
    href: '/settings',
    roles: ['manager', 'admin', 'analyst', 'user'],
  },
  {
    id: 'new-request',
    label: 'New Request',
    description: 'Submit request',
    icon: PlusCircleIcon,
    href: '/requests/new',
    roles: ['user'],
    primary: true,
  },
];

export interface UseQuickActionsResult {
  /** Quick actions for current user */
  actions: QuickAction[];
  /** Primary actions (highlighted) */
  primaryActions: QuickAction[];
  /** All actions count */
  totalCount: number;
}

/**
 * useQuickActions Hook
 *
 * @example
 * ```tsx
 * function QuickActions() {
 *   const { actions } = useQuickActions();
 *
 *   return (
 *     <div className="grid grid-cols-2 gap-4">
 *       {actions.map(action => (
 *         <ActionButton key={action.id} action={action} />
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */
export function useQuickActions(): UseQuickActionsResult {
  const { user } = useAuth();

  const actions = useMemo(() => {
    if (!user) return [];

    // Filter actions based on user role
    return ALL_ACTIONS.filter((action) =>
      action.roles.includes(user.role || 'user')
    );
  }, [user]);

  const primaryActions = useMemo(() => {
    return actions.filter((action) => action.primary);
  }, [actions]);

  return {
    actions,
    primaryActions,
    totalCount: actions.length,
  };
}
