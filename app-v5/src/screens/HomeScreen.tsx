/**
 * Home Screen (Dashboard)
 * KPIs, active pilots, and quick actions
 */

import { TrendingUp, TrendingDown, Activity, Zap } from 'lucide-react';
import { KPICard } from '@/shared/components/KPICard';
import { PageHeader } from '@/shared/components/PageHeader';
import { PilotCard } from '@/shared/components/PilotCard';
import { QuickActionCard } from '@/shared/components/QuickActionCard';
import { KPI, Pilot, QuickAction } from '@/shared/types/screen-data-models';

const KPI_DATA: KPI[] = [
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

const ACTIVE_PILOTS: Pilot[] = [
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

const QUICK_ACTIONS: QuickAction[] = [
  { icon: '🚀', label: 'Launch New App', color: 'accent' },
  { icon: '📊', label: 'View Analytics', color: 'primary' },
  { icon: '⚙️', label: 'Settings', color: 'text-tertiary' },
  { icon: '📝', label: 'Documentation', color: 'text-tertiary' },
];

export function HomeScreen() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 md:p-6 lg:p-8 space-y-6">
        {/* Page Header */}
        <PageHeader
          title="Dashboard"
          subtitle="Overview of your AI initiatives and performance"
        />

        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {KPI_DATA.map((kpi, idx) => (
            <KPICard
              key={idx}
              label={kpi.label}
              value={kpi.value}
              icon={kpi.icon}
              badge={{
                text: kpi.change,
                variant: kpi.trend === 'up' ? 'success' : 'info'
              }}
            />
          ))}
        </div>

        {/* Active Pilots */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Active AI Pilots
          </h2>
          <div className="space-y-3">
            {ACTIVE_PILOTS.map((pilot, idx) => (
              <PilotCard key={idx} pilot={pilot} onView={() => {/* TODO: Navigate to app detail */}} />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {QUICK_ACTIONS.map((action, idx) => (
            <QuickActionCard key={idx} action={action} onClick={() => {/* TODO: Handle action */}} />
          ))}
        </div>
      </div>
    </div>
  );
}
