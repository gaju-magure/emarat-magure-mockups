/**
 * AlertsPanel Component
 * Right sidebar with alerts, activity feed, and quick stats
 */

import { AlertCircle, CheckCircle, Info, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { Alert, Activity, QuickStat } from '@/shared/types/alerts-data-models';
import { SAMPLE_ALERTS, SAMPLE_ACTIVITIES, SAMPLE_QUICK_STATS } from '@/shared/data/alerts-sample-data';

interface AlertsPanelProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const alertIcons = {
  error: <AlertCircle className="h-4 w-4" />,
  warning: <AlertTriangle className="h-4 w-4" />,
  success: <CheckCircle className="h-4 w-4" />,
  info: <Info className="h-4 w-4" />,
};

const alertColors = {
  error: 'text-danger border-danger/30 bg-danger/5',
  warning: 'text-warning border-warning/30 bg-warning/5',
  success: 'text-success border-success/30 bg-success/5',
  info: 'text-info border-info/30 bg-info/5',
};

const statColors = {
  primary: 'text-primary bg-primary/10',
  accent: 'text-accent bg-accent/10',
  success: 'text-success bg-success/10',
  warning: 'text-warning bg-warning/10',
};

export function AlertsPanel({ isOpen = true, onClose }: AlertsPanelProps) {
  return (
    <>
      {/* Desktop: Fixed Right Panel */}
      <aside className="hidden lg:flex flex-col w-80 h-full border-l border-glow bg-background-elevated backdrop-blur-glass-sm shadow-float-md overflow-hidden">
        <AlertsPanelContent />
      </aside>

      {/* Mobile/Tablet: Drawer */}
      {isOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <aside className="lg:hidden fixed top-0 right-0 bottom-0 w-full max-w-sm bg-background-elevated backdrop-blur-glass-lg border-l border-glow shadow-float-xl z-50 animate-slide-in-right overflow-hidden">
            <AlertsPanelContent onClose={onClose} />
          </aside>
        </>
      )}
    </>
  );
}

function AlertsPanelContent({ onClose }: { onClose?: () => void }) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-glow">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-text-primary">Alerts & Info</h2>
            <p className="text-xs text-text-tertiary">Items requiring immediate attention</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 rounded-full bg-danger/10 text-danger text-xs font-medium animate-glow-pulse">
              {SAMPLE_ALERTS.filter(a => !a.read && a.priority === 'high').length} Urgent
            </span>
            {onClose && (
              <button
                onClick={onClose}
                className="lg:hidden w-8 h-8 rounded-lg hover:bg-background-tertiary transition-colors"
                aria-label="Close"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Section 1: Urgent Alerts */}
        <div className="p-4 space-y-3 border-b border-glow">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-text-primary">Urgent Alerts</h3>
            <button className="text-xs text-danger hover:text-danger/80 transition-colors font-medium">
              Action Required
            </button>
          </div>
          {SAMPLE_ALERTS.slice(0, 4).map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>

        {/* Section 2: Live Activity */}
        <div className="p-4 space-y-3 border-b border-glow">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-text-primary">Live Activity</h3>
            <div className="flex items-center gap-1 text-xs text-accent">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-glow-pulse"></span>
              <span>Live</span>
            </div>
          </div>
          {SAMPLE_ACTIVITIES.slice(0, 5).map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>

        {/* Section 3: Critical Metrics */}
        <div className="p-4 space-y-3">
          <h3 className="text-sm font-semibold text-text-primary mb-3">Critical Metrics</h3>
          {SAMPLE_QUICK_STATS.map((stat, idx) => (
            <StatCard key={idx} stat={stat} />
          ))}
        </div>
      </div>
    </div>
  );
}

function AlertCard({ alert }: { alert: Alert }) {
  return (
    <div
      className={`
        p-3 rounded-lg border glass-light
        hover:glass-medium hover:shadow-glow-sm hover:-translate-y-0.5
        transition-all duration-300 cursor-pointer
        ${alertColors[alert.type]}
        ${!alert.read ? 'border-l-2' : ''}
      `}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {alertIcons[alert.type]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="text-sm font-medium text-text-primary">{alert.title}</h4>
            {!alert.read && (
              <span className="flex-shrink-0 w-2 h-2 rounded-full bg-primary" />
            )}
          </div>
          <p className="text-xs text-text-secondary mb-2 line-clamp-2">{alert.message}</p>
          <span className="text-xs text-text-tertiary">{alert.time}</span>
        </div>
      </div>
    </div>
  );
}

function ActivityCard({ activity }: { activity: Activity }) {
  const typeColors = {
    ai: 'bg-accent/10 text-accent',
    user: 'bg-primary/10 text-primary',
    system: 'bg-text-tertiary/10 text-text-secondary',
  };

  return (
    <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-background-tertiary transition-colors">
      <span className={`text-xl flex-shrink-0 w-8 h-8 rounded-lg ${typeColors[activity.type]} flex items-center justify-center`}>
        {activity.icon}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-text-primary font-medium">{activity.action}</p>
        <p className="text-xs text-text-secondary">{activity.user}</p>
        <p className="text-xs text-text-tertiary mt-1">{activity.time}</p>
      </div>
    </div>
  );
}

function StatCard({ stat }: { stat: QuickStat }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg glass-light border border-glow hover:glass-medium hover:shadow-glow-sm transition-all duration-300">
      <div className={`w-10 h-10 rounded-lg ${statColors[stat.color]} flex items-center justify-center flex-shrink-0`}>
        {stat.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-text-secondary">{stat.label}</span>
          {stat.trend !== 'neutral' && (
            <div className={`flex items-center gap-0.5 text-xs ${stat.trend === 'up' ? 'text-success' : 'text-danger'}`}>
              {stat.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              <span>{Math.abs(stat.change)}{typeof stat.change === 'number' && stat.change < 100 ? '%' : ''}</span>
            </div>
          )}
        </div>
        <p className="text-lg font-semibold text-text-primary">{stat.value}</p>
      </div>
    </div>
  );
}
