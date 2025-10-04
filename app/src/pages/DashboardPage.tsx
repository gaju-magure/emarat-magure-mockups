import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AppLayout } from '../components/layout/AppLayout';
import {
  ChartBarIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  CurrencyDollarIcon,
  UserPlusIcon,
  BuildingOfficeIcon,
  ArrowTrendingUpIcon,
  ShieldExclamationIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

export function DashboardPage() {
  const { user } = useAuth();

  const features = [
    {
      id: 'magvision',
      title: 'MagVisionIQ Dashboard',
      description: 'Store analytics, sales, inventory & operations',
      icon: ChartBarIcon,
      path: '/magvision',
      color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20',
      roles: ['Store Manager', 'Operations'],
    },
    {
      id: 'insights',
      title: 'Emarat Insights',
      description: 'AI-powered conversational analytics',
      icon: SparklesIcon,
      path: '/insights',
      color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20',
      roles: [],
    },
    {
      id: 'helpdesk',
      title: 'Employee Helpdesk',
      description: 'AI assistant for HR queries & support',
      icon: ChatBubbleLeftRightIcon,
      path: '/helpdesk',
      color: 'text-green-600 bg-green-50 dark:bg-green-900/20',
      roles: [],
    },
    {
      id: 'attendance',
      title: 'Time & Attendance',
      description: 'Facial recognition check-in/out system',
      icon: ClockIcon,
      path: '/attendance',
      color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20',
      roles: [],
    },
    {
      id: 'reconciliation',
      title: 'Document Reconciliation',
      description: 'AI-powered invoice processing',
      icon: CurrencyDollarIcon,
      path: '/reconciliation',
      color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20',
      roles: ['Finance Manager', 'Admin'],
    },
    {
      id: 'hiring',
      title: 'AI-Powered Hiring',
      description: 'Intelligent recruitment pipeline',
      icon: UserPlusIcon,
      path: '/hiring',
      color: 'text-cyan-600 bg-cyan-50 dark:bg-cyan-900/20',
      roles: ['HR Manager', 'Admin'],
    },
    {
      id: 'vendors',
      title: 'Vendor Onboarding',
      description: 'Document AI for vendor management',
      icon: BuildingOfficeIcon,
      path: '/vendors',
      color: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20',
      roles: ['Procurement Specialist', 'Finance Manager', 'Admin'],
    },
    {
      id: 'forecasting',
      title: 'Demand Forecasting',
      description: 'Predictive analytics for planning',
      icon: ArrowTrendingUpIcon,
      path: '/forecasting',
      color: 'text-pink-600 bg-pink-50 dark:bg-pink-900/20',
      roles: ['Store Manager', 'Operations', 'Finance Manager'],
    },
    {
      id: 'compliance',
      title: 'Safety & Compliance',
      description: 'Computer vision for security monitoring',
      icon: ShieldExclamationIcon,
      path: '/compliance',
      color: 'text-red-600 bg-red-50 dark:bg-red-900/20',
      roles: ['Store Manager', 'Safety Officer', 'Admin'],
    },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.name}!
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Access all your AI-powered tools in one place
          </p>
        </div>

        {/* User Info Card */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Your Profile
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Email</span>
              <p className="mt-1 font-medium text-gray-900 dark:text-white">{user?.email}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Role</span>
              <p className="mt-1 font-medium text-gray-900 dark:text-white">{user?.role}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Department</span>
              <p className="mt-1 font-medium text-gray-900 dark:text-white">
                {user?.department}
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Employee ID</span>
              <p className="mt-1 font-medium text-gray-900 dark:text-white">{user?.id}</p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            AI Features & Tools
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              const hasAccess =
                feature.roles.length === 0 || feature.roles.includes(user?.role || '');

              return (
                <Link
                  key={feature.id}
                  to={feature.path}
                  className={`group relative overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900 ${
                    !hasAccess ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  onClick={(e) => {
                    if (!hasAccess) e.preventDefault();
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-lg ${feature.color}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {feature.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
                      {!hasAccess && (
                        <span className="mt-2 inline-block text-xs text-amber-600 dark:text-amber-400">
                          Requires: {feature.roles.join(', ')}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
