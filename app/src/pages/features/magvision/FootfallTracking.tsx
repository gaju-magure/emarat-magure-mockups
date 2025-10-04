import { useState } from 'react';
import {
  MapIcon,
  UsersIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';

export function FootfallTracking() {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [selectedZone, setSelectedZone] = useState('all');

  // Mock data
  const todayStats = {
    total: 487,
    current: 23,
    peak: 89,
    peakTime: '6:30 PM',
    avgDwell: '4.2 min',
    change: '+12%',
  };

  const zones = [
    { id: 'entrance', name: 'Entrance', count: 487, heat: 95 },
    { id: 'fuel', name: 'Fuel Pumps', count: 342, heat: 70 },
    { id: 'store', name: 'Store Area', count: 398, heat: 82 },
    { id: 'checkout', name: 'Checkout', count: 312, heat: 64 },
    { id: 'atm', name: 'ATM Area', count: 89, heat: 18 },
    { id: 'restroom', name: 'Restrooms', count: 156, heat: 32 },
  ];

  const hourlyData = [
    { hour: '6 AM', count: 12, percentage: 15 },
    { hour: '7 AM', count: 34, percentage: 43 },
    { hour: '8 AM', count: 56, percentage: 70 },
    { hour: '9 AM', count: 45, percentage: 56 },
    { hour: '10 AM', count: 38, percentage: 48 },
    { hour: '11 AM', count: 42, percentage: 53 },
    { hour: '12 PM', count: 58, percentage: 73 },
    { hour: '1 PM', count: 67, percentage: 84 },
    { hour: '2 PM', count: 52, percentage: 65 },
    { hour: '3 PM', count: 48, percentage: 60 },
    { hour: '4 PM', count: 56, percentage: 70 },
    { hour: '5 PM', count: 72, percentage: 91 },
    { hour: '6 PM', count: 89, percentage: 100 },
    { hour: '7 PM', count: 78, percentage: 88 },
    { hour: '8 PM', count: 64, percentage: 80 },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Footfall Tracking & Heat Maps
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Real-time customer movement and zone analytics
          </p>
        </div>

        {/* Period Selector */}
        <div className="flex gap-2">
          {['today', '7days', '30days'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                selectedPeriod === period
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {period === 'today' ? 'Today' : period === '7days' ? '7 Days' : '30 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={UsersIcon}
          label="Total Visitors"
          value={todayStats.total}
          change={todayStats.change}
          changeType="increase"
          color="primary"
        />
        <StatCard
          icon={UsersIcon}
          label="Current Visitors"
          value={todayStats.current}
          subtitle="Live count"
          color="success"
        />
        <StatCard
          icon={ArrowTrendingUpIcon}
          label="Peak Hour"
          value={todayStats.peak}
          subtitle={`at ${todayStats.peakTime}`}
          color="warning"
        />
        <StatCard
          icon={ClockIcon}
          label="Avg Dwell Time"
          value={todayStats.avgDwell}
          subtitle="Per visitor"
          color="info"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Heat Map Visualization */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Store Heat Map
              </h3>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span>Low</span>
                <div className="flex h-3 w-24 overflow-hidden rounded-full">
                  <div className="w-1/3 bg-blue-200"></div>
                  <div className="w-1/3 bg-yellow-300"></div>
                  <div className="w-1/3 bg-red-400"></div>
                </div>
                <span>High</span>
              </div>
            </div>

            {/* Simplified Heat Map Grid */}
            <div className="grid grid-cols-3 gap-3">
              {zones.map((zone) => (
                <button
                  key={zone.id}
                  onClick={() => setSelectedZone(zone.id)}
                  className={`group relative overflow-hidden rounded-lg border p-4 transition-all hover:scale-105 ${
                    selectedZone === zone.id
                      ? 'border-primary ring-2 ring-primary/20'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                  style={{
                    backgroundColor:
                      zone.heat > 66
                        ? 'rgba(239, 68, 68, 0.1)'
                        : zone.heat > 33
                        ? 'rgba(251, 191, 36, 0.1)'
                        : 'rgba(59, 130, 246, 0.1)',
                  }}
                >
                  <div className="flex flex-col items-center gap-2">
                    <MapIcon
                      className={`h-6 w-6 ${
                        zone.heat > 66
                          ? 'text-red-500'
                          : zone.heat > 33
                          ? 'text-yellow-500'
                          : 'text-blue-500'
                      }`}
                    />
                    <div className="text-center">
                      <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                        {zone.name}
                      </p>
                      <p className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
                        {zone.count}
                      </p>
                      <p className="text-xs text-gray-500">visits</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Zone Details */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Zone Rankings
          </h3>
          <div className="space-y-3">
            {zones
              .sort((a, b) => b.count - a.count)
              .map((zone, index) => (
                <div
                  key={zone.id}
                  className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {zone.name}
                    </p>
                    <p className="text-xs text-gray-500">{zone.count} visits</p>
                  </div>
                  <div
                    className={`rounded-full px-2 py-1 text-xs font-semibold ${
                      zone.heat > 66
                        ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                        : zone.heat > 33
                        ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    }`}
                  >
                    {zone.heat > 66 ? 'Hot' : zone.heat > 33 ? 'Warm' : 'Cool'}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Hourly Traffic Chart */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Hourly Traffic Pattern
        </h3>
        <div className="space-y-2">
          {hourlyData.map((data) => (
            <div key={data.hour} className="flex items-center gap-3">
              <span className="w-16 text-xs font-medium text-gray-600 dark:text-gray-400">
                {data.hour}
              </span>
              <div className="relative flex-1">
                <div className="h-8 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${data.percentage}%` }}
                  />
                </div>
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-700 dark:text-gray-300">
                  {data.count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Stat Card Component
interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  subtitle?: string;
  change?: string;
  changeType?: 'increase' | 'decrease';
  color: 'primary' | 'success' | 'warning' | 'info';
}

function StatCard({ icon: Icon, label, value, subtitle, change, changeType, color }: StatCardProps) {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-500',
    info: 'bg-blue-500/10 text-blue-600 dark:text-blue-500',
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400">{label}</p>
          <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          {subtitle && (
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
          )}
          {change && (
            <div className="mt-2 flex items-center gap-1">
              {changeType === 'increase' ? (
                <ArrowTrendingUpIcon className="h-4 w-4 text-success" />
              ) : (
                <ArrowTrendingDownIcon className="h-4 w-4 text-red-500" />
              )}
              <span className={`text-xs font-semibold ${changeType === 'increase' ? 'text-success' : 'text-red-500'}`}>
                {change}
              </span>
            </div>
          )}
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colorClasses[color]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
