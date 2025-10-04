import { useState } from 'react';
import {
  ChartBarIcon,
  CubeIcon,
  UserGroupIcon,
  CloudIcon,
  BellAlertIcon,
  ArrowTrendingUpIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

export function DashboardHome() {
  const [loading] = useState(false);

  // Mock data for dashboard - representing what Sarah (Store Manager) sees
  const dashboardData = {
    sales: {
      yesterday: 45230,
      target: 44000,
      percentOfTarget: 103,
      status: 'success' as const,
    },
    inventory: {
      alertCount: 3,
      status: 'warning' as const,
      alerts: [
        { item: 'Bottled Water', stock: 15, criticality: 'high' },
        { item: 'Energy Drinks', stock: 22, criticality: 'medium' },
        { item: 'Marlboro Red', stock: 8, criticality: 'high' },
      ],
    },
    staffing: {
      scheduled: 6,
      total: 7,
      status: 'warning' as const,
    },
    weather: {
      temp: 38,
      condition: 'Hot',
      recommendation: 'Stock cold drinks',
    },
  };

  const overnightEvents = [
    {
      time: '11:05 PM',
      type: 'security',
      title: 'Unauthorized zone entry detected',
      status: 'Reviewed - False alarm (cleaning staff)',
      icon: ExclamationTriangleIcon,
      severity: 'warning',
    },
    {
      time: '10:30 PM',
      type: 'sales',
      title: 'Evening sales target exceeded',
      status: '105% of target achieved',
      icon: CheckCircleIcon,
      severity: 'success',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Good morning, Sarah! ☀️
        </h2>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Here's your station overview for today - Friday, Oct 4, 2025
        </p>
      </div>

      {loading ? (
        <LoadingState />
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Sales Card */}
            <SummaryCard
              title="Yesterday's Sales"
              value={`AED ${dashboardData.sales.yesterday.toLocaleString()}`}
              subtitle={`${dashboardData.sales.percentOfTarget}% of target`}
              status={dashboardData.sales.status}
              icon={ChartBarIcon}
              iconColor="text-primary"
              trend="+3%"
            />

            {/* Inventory Card */}
            <SummaryCard
              title="Inventory Status"
              value={`${dashboardData.inventory.alertCount} alerts`}
              subtitle="Low stock items need attention"
              status={dashboardData.inventory.status}
              icon={CubeIcon}
              iconColor="text-success"
            />

            {/* Staffing Card */}
            <SummaryCard
              title="Today's Staffing"
              value={`${dashboardData.staffing.scheduled}/${dashboardData.staffing.total} scheduled`}
              subtitle="1 position open"
              status={dashboardData.staffing.status}
              icon={UserGroupIcon}
              iconColor="text-primary"
            />

            {/* Weather Card */}
            <SummaryCard
              title="Weather Forecast"
              value={`${dashboardData.weather.temp}°C`}
              subtitle={dashboardData.weather.recommendation}
              status="info"
              icon={CloudIcon}
              iconColor="text-success"
            />
          </div>

          {/* What Happened Overnight */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-4 flex items-center gap-2">
              <ClockIcon className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                What happened overnight?
              </h3>
            </div>

            <div className="space-y-4">
              {overnightEvents.map((event, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800"
                >
                  <event.icon
                    className={`h-6 w-6 ${
                      event.severity === 'success'
                        ? 'text-success'
                        : event.severity === 'warning'
                        ? 'text-yellow-500'
                        : 'text-red-500'
                    }`}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {event.time}
                      </span>
                      <span className="text-xs uppercase text-gray-400">
                        {event.type}
                      </span>
                    </div>
                    <h4 className="mt-1 font-medium text-gray-900 dark:text-white">
                      {event.title}
                    </h4>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {event.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inventory Alerts - Action Required */}
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-6 shadow-sm dark:border-yellow-900 dark:bg-yellow-950">
            <div className="mb-4 flex items-center gap-2">
              <BellAlertIcon className="h-6 w-6 text-yellow-600 dark:text-yellow-500" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Inventory Alerts - Action Required
              </h3>
            </div>

            <div className="space-y-3">
              {dashboardData.inventory.alerts.map((alert, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border border-yellow-300 bg-white p-4 dark:border-yellow-800 dark:bg-gray-900"
                >
                  <div className="flex items-center gap-3">
                    <ExclamationTriangleIcon
                      className={`h-5 w-5 ${
                        alert.criticality === 'high'
                          ? 'text-red-500'
                          : 'text-yellow-500'
                      }`}
                    />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {alert.item}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Low stock: {alert.stock} units remaining
                      </p>
                    </div>
                  </div>
                  <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors">
                    Review
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-3">
              <button className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors">
                View AI Recommendations
              </button>
              <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors">
                All Inventory
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <QuickActionButton
              icon={ChartBarIcon}
              label="Sales Report"
              description="View today's performance"
            />
            <QuickActionButton
              icon={CubeIcon}
              label="Inventory Management"
              description="Check stock levels"
            />
            <QuickActionButton
              icon={UserGroupIcon}
              label="Staff Schedule"
              description="View team roster"
            />
            <QuickActionButton
              icon={ArrowTrendingUpIcon}
              label="AI Insights"
              description="Get recommendations"
            />
          </div>

          {/* Footer Stats */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Yesterday's Performance Snapshot
            </h3>
            <div className="grid gap-4 md:grid-cols-4">
              <StatItem label="Footfall" value="342 customers" change="+8%" />
              <StatItem label="Avg Wait Time" value="4.2 min" change="-1.5 min" changeType="positive" />
              <StatItem label="Fuel Sales" value="4,280L" change="+12%" />
              <StatItem label="Store Sales" value="AED 8,420" change="+15%" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Summary Card Component
interface SummaryCardProps {
  title: string;
  value: string;
  subtitle: string;
  status: 'success' | 'warning' | 'error' | 'info';
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  trend?: string;
}

function SummaryCard({
  title,
  value,
  subtitle,
  status,
  icon: Icon,
  iconColor,
  trend,
}: SummaryCardProps) {
  const statusColors = {
    success: 'border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950',
    warning: 'border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950',
    error: 'border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950',
    info: 'border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950',
  };

  const statusIndicators = {
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  };

  return (
    <div
      className={`relative overflow-hidden rounded-lg border p-6 shadow-sm transition-all hover:shadow-md ${statusColors[status]}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {subtitle}
          </p>
          {trend && (
            <p className="mt-2 text-xs font-medium text-success">
              {trend} vs last week
            </p>
          )}
        </div>
        <Icon className={`h-8 w-8 ${iconColor}`} />
      </div>
      <div className={`absolute bottom-0 left-0 h-1 w-full ${statusIndicators[status]}`} />
    </div>
  );
}

// Quick Action Button Component
interface QuickActionButtonProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description: string;
}

function QuickActionButton({ icon: Icon, label, description }: QuickActionButtonProps) {
  return (
    <button className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-4 text-left transition-all hover:border-primary hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-primary">
      <Icon className="h-6 w-6 text-success" />
      <div>
        <h4 className="font-medium text-gray-900 dark:text-white">{label}</h4>
        <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </button>
  );
}

// Stat Item Component
interface StatItemProps {
  label: string;
  value: string;
  change: string;
  changeType?: 'positive' | 'negative';
}

function StatItem({ label, value, change, changeType }: StatItemProps) {
  const changeColor = changeType === 'positive' || change.startsWith('+')
    ? 'text-success'
    : change.startsWith('-')
    ? 'text-success'
    : 'text-gray-500';

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
      <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
      <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{value}</p>
      <p className={`mt-1 text-xs font-medium ${changeColor}`}>{change}</p>
    </div>
  );
}

// Loading State Component
function LoadingState() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-40 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800"
          />
        ))}
      </div>
      <div className="h-64 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
      <div className="h-64 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
    </div>
  );
}
