/**
 * Governance Screen
 * Audit logs, compliance status, and documents
 */

import { Shield, FileText, Activity, CheckCircle } from 'lucide-react';
import { PageHeader } from '@/shared/components/PageHeader';
import { DataTable } from '@/shared/components/DataTable';
import { ComplianceMetricCard } from '@/shared/components/ComplianceMetricCard';
import { DocumentCard } from '@/shared/components/DocumentCard';
import { AuditLog, ComplianceDocument, ComplianceMetric } from '@/shared/types/screen-data-models';

const COMPLIANCE_METRICS: ComplianceMetric[] = [
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

const AUDIT_LOGS: AuditLog[] = [
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

const COMPLIANCE_DOCUMENTS: ComplianceDocument[] = [
  { name: 'AI Ethics Policy', date: '2025-01-15', status: 'Current' },
  { name: 'Data Privacy Guidelines', date: '2025-03-10', status: 'Current' },
  { name: 'Model Audit Checklist', date: '2024-12-05', status: 'Under Review' },
  { name: 'Security Standards', date: '2025-02-20', status: 'Current' },
];

export function GovernanceScreen() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 md:p-6 lg:p-8 space-y-6">
        {/* Page Header */}
        <PageHeader
          title="Governance & Compliance"
          subtitle="Monitor compliance status and audit trails"
        />

        {/* Compliance Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {COMPLIANCE_METRICS.map((metric, idx) => (
            <ComplianceMetricCard
              key={idx}
              label={metric.label}
              status={metric.status}
              score={metric.score}
              icon={metric.icon}
            />
          ))}
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

          <DataTable<AuditLog>
            columns={[
              {
                header: 'Action',
                accessor: 'action',
                cellClassName: 'text-sm text-text-primary font-medium',
              },
              {
                header: 'App',
                accessor: 'app',
                cellClassName: 'text-sm text-text-secondary',
              },
              {
                header: 'User',
                accessor: 'user',
                cellClassName: 'text-sm text-text-secondary',
              },
              {
                header: 'Timestamp',
                accessor: 'timestamp',
                cellClassName: 'text-sm text-text-tertiary',
              },
              {
                header: 'Type',
                accessor: (log) => {
                  const typeConfig = ACTION_TYPE_CONFIG[log.type];
                  return (
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${typeConfig.bgClass} ${typeConfig.textClass}`}
                    >
                      {log.type}
                    </span>
                  );
                },
              },
            ]}
            data={AUDIT_LOGS}
            keyExtractor={(log) => log.id}
          />
        </div>

        {/* Compliance Documents */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Compliance Documents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {COMPLIANCE_DOCUMENTS.map((doc, idx) => (
              <DocumentCard key={idx} document={doc} onClick={() => {/* TODO: Open document */}} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
