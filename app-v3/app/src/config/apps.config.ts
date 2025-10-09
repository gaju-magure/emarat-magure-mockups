/**
 * Apps Configuration
 *
 * Defines all applications available in the platform
 * Each app has metadata, navigation, and feature flags
 */

import {
  DocumentTextIcon,
  ClipboardDocumentCheckIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  DocumentMagnifyingGlassIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

export interface App {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  category: 'core' | 'analytics' | 'management' | 'settings';
  size: 'large' | 'medium' | 'small';
  badge?: number;
  color: 'primary' | 'success' | 'warning' | 'info' | 'secondary';
  features: string[];
  roles?: string[]; // Which roles can access this app
}

export const APPS: App[] = [
  // Core Apps (Large size - highlighted)
  {
    id: 'rfp-evaluation',
    name: 'RFP Evaluation',
    description: 'AI-powered vendor proposal analysis and comparison with smart recommendations',
    icon: DocumentTextIcon,
    href: '/apps/rfp',
    category: 'core',
    size: 'large',
    badge: 3,
    color: 'primary',
    features: [
      'AI-powered scoring',
      'Vendor comparison',
      'Proposal upload',
      'Automated analysis',
      'Decision support',
    ],
    roles: ['manager', 'admin', 'analyst'],
  },
  {
    id: 'tasks',
    name: 'Task Dashboard',
    description: 'Manage all your procurement tasks, approvals, and deadlines in one place',
    icon: ClipboardDocumentCheckIcon,
    href: '/apps/tasks',
    category: 'core',
    size: 'large',
    badge: 12,
    color: 'success',
    features: [
      'Task tracking',
      'Approval workflows',
      'Deadline reminders',
      'Team collaboration',
      'Priority management',
    ],
    roles: ['manager', 'admin', 'analyst', 'user'],
  },

  // Analytics Apps (Medium size)
  {
    id: 'analytics',
    name: 'Analytics',
    description: 'Comprehensive spending insights, trends, and forecasting',
    icon: ChartBarIcon,
    href: '/apps/analytics',
    category: 'analytics',
    size: 'medium',
    color: 'info',
    features: [
      'Spending analysis',
      'Trend visualization',
      'Cost savings tracking',
      'Custom reports',
      'Forecast models',
    ],
    roles: ['manager', 'admin', 'analyst'],
  },
  {
    id: 'governance',
    name: 'Governance & Compliance',
    description: 'Ensure compliance with policies, regulations, and audit trails',
    icon: ShieldCheckIcon,
    href: '/apps/governance',
    category: 'management',
    size: 'medium',
    badge: 2,
    color: 'warning',
    features: [
      'Compliance monitoring',
      'Audit trails',
      'Policy enforcement',
      'Risk assessment',
      'Regulatory reporting',
    ],
    roles: ['manager', 'admin'],
  },
  {
    id: 'contracts',
    name: 'Contract Management',
    description: 'Track contracts, renewals, and vendor agreements',
    icon: DocumentMagnifyingGlassIcon,
    href: '/apps/contracts',
    category: 'management',
    size: 'medium',
    badge: 5,
    color: 'secondary',
    features: [
      'Contract repository',
      'Renewal alerts',
      'Version control',
      'Expiry tracking',
      'Digital signatures',
    ],
    roles: ['manager', 'admin', 'analyst'],
  },

  // Management Apps (Medium size)
  {
    id: 'budget',
    name: 'Budget Planning',
    description: 'Plan, track, and forecast your procurement budgets',
    icon: CurrencyDollarIcon,
    href: '/apps/budget',
    category: 'analytics',
    size: 'medium',
    color: 'success',
    features: [
      'Budget allocation',
      'Spend tracking',
      'Variance analysis',
      'Forecasting',
      'Approval workflows',
    ],
    roles: ['manager', 'admin'],
  },
  {
    id: 'vendors',
    name: 'Vendor Management',
    description: 'Manage vendor relationships, performance, and onboarding',
    icon: UserGroupIcon,
    href: '/apps/vendors',
    category: 'management',
    size: 'medium',
    color: 'info',
    features: [
      'Vendor profiles',
      'Performance metrics',
      'Onboarding',
      'Contract tracking',
      'Risk assessment',
    ],
    roles: ['manager', 'admin', 'analyst'],
  },
  {
    id: 'settings',
    name: 'Settings',
    description: 'Configure your preferences, notifications, and account',
    icon: Cog6ToothIcon,
    href: '/settings',
    category: 'settings',
    size: 'medium',
    color: 'secondary',
    features: [
      'User preferences',
      'Notifications',
      'Theme settings',
      'Language options',
      'Account management',
    ],
    roles: ['manager', 'admin', 'analyst', 'user'],
  },
];

/**
 * Get apps by category
 */
export function getAppsByCategory(category: App['category']): App[] {
  return APPS.filter((app) => app.category === category);
}

/**
 * Get apps by size
 */
export function getAppsBySize(size: App['size']): App[] {
  return APPS.filter((app) => app.size === size);
}

/**
 * Get apps by role
 */
export function getAppsByRole(role: string): App[] {
  return APPS.filter((app) => !app.roles || app.roles.includes(role));
}

/**
 * Get app by ID
 */
export function getAppById(id: string): App | undefined {
  return APPS.find((app) => app.id === id);
}

/**
 * Search apps
 */
export function searchApps(query: string): App[] {
  const lowerQuery = query.toLowerCase();
  return APPS.filter(
    (app) =>
      app.name.toLowerCase().includes(lowerQuery) ||
      app.description.toLowerCase().includes(lowerQuery) ||
      app.features.some((feature) => feature.toLowerCase().includes(lowerQuery))
  );
}
