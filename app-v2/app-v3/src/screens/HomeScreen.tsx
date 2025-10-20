/**
 * Home Screen (Dashboard)
 * KPIs, active pilots, and quick actions
 */

import { TrendingUp, TrendingDown, Activity, Zap } from 'lucide-react';

const KPI_DATA = [
  {
    label: 'Active AI Apps',
    value: '12',
    change: '+3',
    trend: 'up',
    icon: Activity,
  },
  {
    label: 'Cost Savings',
    value: 'AED 2.4M',
    change: '+18%',
    trend: 'up',
    icon: TrendingUp,
  },
  {
    label: 'Tasks Automated',
    value: '847',
    change: '+24%',
    trend: 'up',
    icon: Zap,
  },
  {
    label: 'Avg Response Time',
    value: '1.2s',
    change: '-32%',
    trend: 'down',
    icon: TrendingDown,
  },
];

const ACTIVE_PILOTS = [
  {
    name: 'Invoice Reconciliation',
    status: 'Live',
    users: 45,
    accuracy: '94%',
  },
  {
    name: 'RFP Evaluation',
    status: 'Live',
    users: 12,
    accuracy: '89%',
  },
  {
    name: 'Demand Forecasting',
    status: 'Testing',
    users: 8,
    accuracy: '91%',
  },
];

export function HomeScreen() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 md:p-6 lg:p-8 space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-text-primary">
            Dashboard
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Overview of your AI initiatives and performance
          </p>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {KPI_DATA.map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <div
                key={idx}
                className="card p-4 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded ${
                      kpi.trend === 'up'
                        ? 'bg-success-bg text-success-text'
                        : 'bg-info-bg text-info-text'
                    }`}
                  >
                    {kpi.change}
                  </span>
                </div>
                <div className="text-2xl font-bold text-text-primary mb-1">
                  {kpi.value}
                </div>
                <div className="text-sm text-text-secondary">{kpi.label}</div>
              </div>
            );
          })}
        </div>

        {/* Active Pilots */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Active AI Pilots
          </h2>
          <div className="space-y-3">
            {ACTIVE_PILOTS.map((pilot, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 rounded-lg bg-background-secondary hover:bg-background-tertiary transition-colors duration-200"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium text-text-primary">
                      {pilot.name}
                    </h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        pilot.status === 'Live'
                          ? 'bg-success-bg text-success-text border border-success-border'
                          : 'bg-warning-bg text-warning-text border border-warning-border'
                      }`}
                    >
                      {pilot.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-sm text-text-secondary">
                    <span>{pilot.users} users</span>
                    <span className="text-text-tertiary">•</span>
                    <span>{pilot.accuracy} accuracy</span>
                  </div>
                </div>
                <button className="text-accent hover:text-accent-hover text-sm font-medium transition-colors">
                  View →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: '🚀', label: 'Launch New App', color: 'accent' },
            { icon: '📊', label: 'View Analytics', color: 'primary' },
            { icon: '⚙️', label: 'Settings', color: 'text-tertiary' },
            { icon: '📝', label: 'Documentation', color: 'text-tertiary' },
          ].map((action, idx) => (
            <button
              key={idx}
              className="card p-4 hover:shadow-lg transition-all duration-200 group text-left"
            >
              <div className="text-3xl mb-2">{action.icon}</div>
              <div className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors">
                {action.label}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
