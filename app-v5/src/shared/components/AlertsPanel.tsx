/**
 * AlertsPanel Component
 * Collapsible floating right panel with alerts, activity feed, and quick stats
 * Collapsed: Shows summary | Expanded: Shows full details
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
      {/* Desktop: Collapsible Floating Right Panel - Expands on hover */}
      <aside className="hidden lg:flex flex-col h-[80vh] max-h-[900px] w-20 hover:w-80 bg-background-elevated backdrop-blur-glass-lg m-4 my-auto rounded-2xl shadow-float-lg hover:shadow-float-xl transition-all duration-300 ease-out overflow-hidden group">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-danger/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />

        <AlertsPanelContent isExpanded={false} />
      </aside>

      {/* Mobile/Tablet: Drawer - Floating and always expanded */}
      {isOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <aside className="lg:hidden fixed top-16 right-3 h-[80vh] max-h-[900px] w-full max-w-sm bg-background-elevated backdrop-blur-glass-lg rounded-2xl shadow-float-xl z-50 animate-slide-in-right overflow-hidden">
            <AlertsPanelContent onClose={onClose} isExpanded={true} />
          </aside>
        </>
      )}
    </>
  );
}

function AlertsPanelContent({ onClose, isExpanded = false }: { onClose?: () => void; isExpanded?: boolean }) {
  const urgentCount = SAMPLE_ALERTS.filter(a => !a.read && a.priority === 'high').length;

  return (
    <div className="relative flex flex-col h-full">
      {/* Header */}
      <div className="relative p-4 border-b border-border-light overflow-hidden">
        <div className={`flex items-center gap-3 ${isExpanded ? 'justify-start' : 'justify-center group-hover:justify-start'}`}>
          {/* Icon indicators - visible when collapsed */}
          <div className={`flex gap-3 ${isExpanded ? 'hidden' : 'group-hover:hidden'}`}>
            {/* Urgent alerts */}
            <div className="relative w-12 h-12 rounded-full bg-danger/10 text-danger flex items-center justify-center">
              <AlertCircle className="h-5 w-5" />
              {urgentCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-danger text-white text-xs font-bold flex items-center justify-center animate-glow-pulse">
                  {urgentCount}
                </span>
              )}
            </div>
          </div>

          {/* Full header - visible when expanded */}
          <div className={`items-center justify-between w-full ${isExpanded ? 'flex' : 'hidden group-hover:flex'}`}>
            <div>
              <h2 className="text-base font-bold text-text-primary whitespace-nowrap">Alerts & Info</h2>
              <p className="text-xs text-text-tertiary whitespace-nowrap">Immediate attention required</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full bg-danger/10 text-danger text-xs font-medium animate-glow-pulse whitespace-nowrap">
                {urgentCount} Urgent
              </span>
              {onClose && (
                <button
                  onClick={onClose}
                  className="lg:hidden w-8 h-8 rounded-lg hover:bg-background-tertiary transition-colors flex items-center justify-center text-text-secondary"
                  aria-label="Close"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="relative flex-1 overflow-y-auto overflow-x-hidden">
        {/* Collapsed state - icon indicators */}
        <div className={`flex flex-col gap-6 items-center py-6 ${isExpanded ? 'hidden' : 'group-hover:hidden'}`}>
          {/* Live activity indicator */}
          <div className="relative w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center">
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-accent shadow-glow-accent animate-glow-pulse" />
            <ActivityIcon className="h-5 w-5" />
          </div>

          {/* Metrics indicator */}
          <div className="relative w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <TrendingUp className="h-5 w-5" />
          </div>
        </div>

        {/* Expanded state - full content */}
        <div className={isExpanded ? 'block' : 'hidden group-hover:block'}>
          {/* Section 1: Urgent Alerts */}
          <div className="p-3 space-y-2 border-b border-border-light">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-text-primary">Urgent Alerts</h3>
              <button className="text-xs text-danger hover:text-danger/80 transition-colors font-medium">
                Action Required
              </button>
            </div>
            {SAMPLE_ALERTS.slice(0, 3).map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>

          {/* Section 2: Live Activity */}
          <div className="p-3 space-y-2 border-b border-border-light">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-text-primary">Live Activity</h3>
              <div className="flex items-center gap-1 text-xs text-accent">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-glow-pulse"></span>
                <span>Live</span>
              </div>
            </div>
            {SAMPLE_ACTIVITIES.slice(0, 4).map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>

          {/* Section 3: Critical Metrics */}
          <div className="p-3 space-y-2">
            <h3 className="text-sm font-semibold text-text-primary mb-2">Critical Metrics</h3>
            {SAMPLE_QUICK_STATS.map((stat, idx) => (
              <StatCard key={idx} stat={stat} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AlertCard({ alert }: { alert: Alert }) {
  return (
    <div
      className={`
        p-2.5 rounded-xl border
        hover:shadow-glow-sm hover:-translate-y-0.5
        transition-all duration-200 cursor-pointer
        ${alertColors[alert.type]}
        ${!alert.read ? 'border-l-2' : ''}
      `}
    >
      <div className="flex items-start gap-2.5">
        <div className="flex-shrink-0 mt-0.5">
          {alertIcons[alert.type]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="text-sm font-medium text-text-primary line-clamp-1">{alert.title}</h4>
            {!alert.read && (
              <span className="flex-shrink-0 w-2 h-2 rounded-full bg-primary" />
            )}
          </div>
          <p className="text-xs text-text-secondary mb-1.5 line-clamp-2">{alert.message}</p>
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
    <div className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-background-tertiary transition-colors cursor-pointer">
      <span className={`text-lg flex-shrink-0 w-8 h-8 rounded-lg ${typeColors[activity.type]} flex items-center justify-center`}>
        {activity.icon}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-text-primary font-medium line-clamp-1">{activity.action}</p>
        <p className="text-xs text-text-secondary line-clamp-1">{activity.user}</p>
        <p className="text-xs text-text-tertiary mt-0.5">{activity.time}</p>
      </div>
    </div>
  );
}

function StatCard({ stat }: { stat: QuickStat }) {
  return (
    <div className="flex items-center gap-2.5 p-2.5 rounded-xl border border-border-light hover:bg-background-tertiary/50 hover:shadow-float-sm transition-all duration-200 cursor-pointer">
      <div className={`w-10 h-10 rounded-lg ${statColors[stat.color]} flex items-center justify-center flex-shrink-0`}>
        {stat.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <span className="text-xs text-text-secondary line-clamp-1">{stat.label}</span>
          {stat.trend !== 'neutral' && (
            <div className={`flex items-center gap-0.5 text-xs ${stat.trend === 'up' ? 'text-success' : 'text-danger'}`}>
              {stat.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              <span>{Math.abs(stat.change)}{typeof stat.change === 'number' && stat.change < 100 ? '%' : ''}</span>
            </div>
          )}
        </div>
        <p className="text-base font-semibold text-text-primary">{stat.value}</p>
      </div>
    </div>
  );
}


// Activity icon component helper
function ActivityIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}
