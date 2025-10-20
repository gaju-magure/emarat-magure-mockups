/**
 * Governance Screen
 * Audit logs, compliance status, and documents
 */

import { Shield, FileText, Activity, CheckCircle } from 'lucide-react';

const COMPLIANCE_METRICS = [
  {
    label: 'Data Privacy',
    status: 'Compliant',
    score: 98,
    icon: Shield,
  },
  {
    label: 'Model Audits',
    status: 'Compliant',
    score: 95,
    icon: Activity,
  },
  {
    label: 'Documentation',
    status: 'Review Needed',
    score: 87,
    icon: FileText,
  },
  {
    label: 'Access Controls',
    status: 'Compliant',
    score: 100,
    icon: CheckCircle,
  },
];

const AUDIT_LOGS = [
  {
    id: 1,
    action: 'Model deployed to production',
    app: 'Invoice Reconciliation',
    user: 'Sara Ahmed',
    timestamp: '2025-10-20 14:32',
    type: 'Deployment',
  },
  {
    id: 2,
    action: 'Data access requested',
    app: 'Customer Insights',
    user: 'Mohammed Ali',
    timestamp: '2025-10-20 12:15',
    type: 'Access',
  },
  {
    id: 3,
    action: 'Model training completed',
    app: 'RFP Evaluation',
    user: 'System',
    timestamp: '2025-10-20 09:47',
    type: 'Training',
  },
  {
    id: 4,
    action: 'Audit report generated',
    app: 'All Apps',
    user: 'Fatima Hassan',
    timestamp: '2025-10-19 16:22',
    type: 'Report',
  },
  {
    id: 5,
    action: 'Security review initiated',
    app: 'Demand Forecasting',
    user: 'Ahmed Khalid',
    timestamp: '2025-10-19 11:05',
    type: 'Security',
  },
];

const ACTION_TYPE_CONFIG: Record<string, { bgClass: string; textClass: string }> = {
  Deployment: {
    bgClass: 'bg-success-bg',
    textClass: 'text-success-text',
  },
  Access: {
    bgClass: 'bg-info-bg',
    textClass: 'text-info-text',
  },
  Training: {
    bgClass: 'bg-primary/10',
    textClass: 'text-primary',
  },
  Report: {
    bgClass: 'bg-text-tertiary/10',
    textClass: 'text-text-tertiary',
  },
  Security: {
    bgClass: 'bg-warning-bg',
    textClass: 'text-warning-text',
  },
};

export function GovernanceScreen() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 md:p-6 lg:p-8 space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-text-primary">
            Governance & Compliance
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Monitor compliance status and audit trails
          </p>
        </div>

        {/* Compliance Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {COMPLIANCE_METRICS.map((metric, idx) => {
            const Icon = metric.icon;
            const isCompliant = metric.status === 'Compliant';

            return (
              <div
                key={idx}
                className={`card p-4 border-l-4 ${
                  isCompliant ? 'border-l-success' : 'border-l-warning'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isCompliant ? 'bg-success/10' : 'bg-warning/10'
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 ${
                        isCompliant ? 'text-success' : 'text-warning'
                      }`}
                    />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-text-primary">
                      {metric.score}%
                    </div>
                    <div
                      className={`text-xs font-medium ${
                        isCompliant ? 'text-success' : 'text-warning'
                      }`}
                    >
                      {metric.status}
                    </div>
                  </div>
                </div>
                <div className="text-sm font-medium text-text-secondary">
                  {metric.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Audit Log Table */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary">
              Recent Audit Logs
            </h2>
            <button className="text-accent hover:text-accent-hover text-sm font-medium transition-colors">
              View All →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-border">
                  <th className="pb-3 text-xs font-medium text-text-tertiary uppercase">
                    Action
                  </th>
                  <th className="pb-3 text-xs font-medium text-text-tertiary uppercase">
                    App
                  </th>
                  <th className="pb-3 text-xs font-medium text-text-tertiary uppercase">
                    User
                  </th>
                  <th className="pb-3 text-xs font-medium text-text-tertiary uppercase">
                    Timestamp
                  </th>
                  <th className="pb-3 text-xs font-medium text-text-tertiary uppercase">
                    Type
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {AUDIT_LOGS.map((log) => {
                  const typeConfig = ACTION_TYPE_CONFIG[log.type];

                  return (
                    <tr key={log.id} className="hover:bg-background-secondary transition-colors">
                      <td className="py-4 text-sm text-text-primary font-medium">
                        {log.action}
                      </td>
                      <td className="py-4 text-sm text-text-secondary">
                        {log.app}
                      </td>
                      <td className="py-4 text-sm text-text-secondary">
                        {log.user}
                      </td>
                      <td className="py-4 text-sm text-text-tertiary">
                        {log.timestamp}
                      </td>
                      <td className="py-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${typeConfig.bgClass} ${typeConfig.textClass}`}
                        >
                          {log.type}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Compliance Documents */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Compliance Documents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { name: 'AI Ethics Policy', date: '2025-01-15', status: 'Current' },
              { name: 'Data Privacy Guidelines', date: '2025-03-10', status: 'Current' },
              { name: 'Model Audit Checklist', date: '2024-12-05', status: 'Under Review' },
              { name: 'Security Standards', date: '2025-02-20', status: 'Current' },
            ].map((doc, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 rounded-lg bg-background-secondary hover:bg-background-tertiary transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-accent" />
                  <div>
                    <div className="text-sm font-medium text-text-primary">
                      {doc.name}
                    </div>
                    <div className="text-xs text-text-tertiary">
                      Updated: {doc.date}
                    </div>
                  </div>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    doc.status === 'Current'
                      ? 'bg-success-bg text-success-text'
                      : 'bg-warning-bg text-warning-text'
                  }`}
                >
                  {doc.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
