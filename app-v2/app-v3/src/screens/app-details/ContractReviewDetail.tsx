/**
 * Contract Review App Detail
 * Full-screen overlay with contract analysis interface
 */

import { ArrowLeft, FileText, AlertTriangle, CheckCircle, Shield, Clock } from 'lucide-react';

interface ContractReviewDetailProps {
  onClose: () => void;
}

const STATS = [
  { label: 'Contracts Reviewed', value: '127', change: '+23', icon: FileText },
  { label: 'Risk Issues Found', value: '34', change: '-12%', icon: AlertTriangle },
  { label: 'Avg. Review Time', value: '18min', change: '-42%', icon: Clock },
  { label: 'Compliance Rate', value: '96%', change: '+4%', icon: Shield },
];

const RECENT_CONTRACTS = [
  {
    id: 'CNT-2025-089',
    title: 'Fuel Supply Agreement - Q1 2026',
    vendor: 'Gulf Petroleum Suppliers LLC',
    date: '2025-10-18',
    riskScore: 'Low',
    issues: 2,
    status: 'Approved',
    value: 'AED 12.5M',
  },
  {
    id: 'CNT-2025-088',
    title: 'Station Maintenance Service Agreement',
    vendor: 'Emirates Facility Management',
    date: '2025-10-17',
    riskScore: 'Medium',
    issues: 5,
    status: 'Under Review',
    value: 'AED 850K',
  },
  {
    id: 'CNT-2025-087',
    title: 'IT Infrastructure Upgrade Contract',
    vendor: 'Dubai Tech Solutions',
    date: '2025-10-15',
    riskScore: 'Low',
    issues: 1,
    status: 'Approved',
    value: 'AED 2.3M',
  },
  {
    id: 'CNT-2025-086',
    title: 'Marketing Partnership Agreement',
    vendor: 'Al Manara Marketing Co.',
    date: '2025-10-14',
    riskScore: 'High',
    issues: 8,
    status: 'Revision Needed',
    value: 'AED 1.8M',
  },
];

const FLAGGED_CLAUSES = [
  {
    clause: 'Payment Terms - Section 4.2',
    risk: 'Medium',
    issue: 'Net 90 payment terms exceed standard 60-day policy',
    recommendation: 'Negotiate to align with company standard payment terms (Net 60)',
  },
  {
    clause: 'Liability Cap - Section 7.1',
    risk: 'High',
    issue: 'Liability limited to 50% of contract value - below recommended 100%',
    recommendation: 'Request increase to 100% liability cap or add performance bond requirement',
  },
  {
    clause: 'Termination Clause - Section 9.3',
    risk: 'Low',
    issue: 'Notice period of 30 days is acceptable but consider 60 days for continuity',
    recommendation: 'Optional: Negotiate extended notice period for critical services',
  },
  {
    clause: 'IP Rights - Section 5.4',
    risk: 'Medium',
    issue: 'Ownership of deliverables not explicitly stated',
    recommendation: 'Add explicit clause confirming Emarat owns all work product and deliverables',
  },
];

export function ContractReviewDetail({ onClose }: ContractReviewDetailProps) {
  return (
    <div className="fixed inset-0 z-50 bg-background-primary overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background-elevated border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-lg bg-background-secondary hover:bg-background-tertiary flex items-center justify-center transition-colors"
                aria-label="Back to gallery"
              >
                <ArrowLeft className="h-5 w-5 text-text-primary" />
              </button>
              <div>
                <h1 className="text-xl md:text-2xl font-semibold text-text-primary">
                  Contract Review
                </h1>
                <p className="text-sm text-text-secondary">
                  AI-powered contract analysis and risk assessment
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-success-bg text-success-text border border-success-border">
                Live
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            const isNegative = stat.change.startsWith('-');
            return (
              <div key={idx} className="card p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded ${
                    isNegative ? 'text-success bg-success-bg' : 'text-success bg-success-bg'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <div className="text-2xl font-bold text-text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-text-secondary">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Recent Contracts */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Recent Contract Reviews
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-border">
                  <th className="pb-3 text-xs font-medium text-text-tertiary uppercase">
                    Contract ID
                  </th>
                  <th className="pb-3 text-xs font-medium text-text-tertiary uppercase">
                    Title
                  </th>
                  <th className="pb-3 text-xs font-medium text-text-tertiary uppercase">
                    Value
                  </th>
                  <th className="pb-3 text-xs font-medium text-text-tertiary uppercase">
                    Risk Score
                  </th>
                  <th className="pb-3 text-xs font-medium text-text-tertiary uppercase">
                    Issues
                  </th>
                  <th className="pb-3 text-xs font-medium text-text-tertiary uppercase">
                    Status
                  </th>
                  <th className="pb-3 text-xs font-medium text-text-tertiary uppercase">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {RECENT_CONTRACTS.map((contract) => (
                  <tr key={contract.id} className="hover:bg-background-secondary transition-colors">
                    <td className="py-4 text-sm font-medium text-text-primary">
                      {contract.id}
                    </td>
                    <td className="py-4">
                      <div className="text-sm font-medium text-text-primary">
                        {contract.title}
                      </div>
                      <div className="text-xs text-text-tertiary">
                        {contract.vendor}
                      </div>
                    </td>
                    <td className="py-4 text-sm font-medium text-text-primary">
                      {contract.value}
                    </td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        contract.riskScore === 'Low'
                          ? 'bg-success-bg text-success-text'
                          : contract.riskScore === 'Medium'
                          ? 'bg-warning-bg text-warning-text'
                          : 'bg-danger-bg text-danger-text'
                      }`}>
                        {contract.riskScore}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className="text-sm font-medium text-text-primary">
                        {contract.issues}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        contract.status === 'Approved'
                          ? 'bg-success-bg text-success-text'
                          : contract.status === 'Under Review'
                          ? 'bg-info-bg text-info-text'
                          : 'bg-warning-bg text-warning-text'
                      }`}>
                        {contract.status}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-text-tertiary">{contract.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Flagged Clauses - Current Contract */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary">
              Flagged Clauses - CNT-2025-088
            </h2>
            <span className="text-sm text-text-tertiary">
              Station Maintenance Service Agreement
            </span>
          </div>

          <div className="space-y-3">
            {FLAGGED_CLAUSES.map((clause, idx) => {
              const riskColor =
                clause.risk === 'High' ? 'danger' :
                clause.risk === 'Medium' ? 'warning' : 'info';

              return (
                <div key={idx} className="p-4 rounded-lg border border-border bg-background-secondary">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className={`h-5 w-5 text-${riskColor}`} />
                      <div className="font-medium text-text-primary">
                        {clause.clause}
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium bg-${riskColor}-bg text-${riskColor}-text`}>
                      {clause.risk} Risk
                    </span>
                  </div>
                  <div className="ml-7 space-y-2">
                    <div className="text-sm text-text-secondary">
                      <span className="font-medium text-text-primary">Issue:</span> {clause.issue}
                    </div>
                    <div className="text-sm text-text-secondary">
                      <span className="font-medium text-text-primary">Recommendation:</span> {clause.recommendation}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Summary */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            AI-Generated Summary
          </h2>
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-info-bg border border-info-border">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-info mt-0.5" />
                <div>
                  <div className="font-medium text-info-text mb-1">
                    Contract Overview
                  </div>
                  <div className="text-sm text-text-secondary">
                    This is a standard maintenance service agreement valued at AED 850K for 24-month term. The contract covers preventive and corrective maintenance for 12 Emarat service stations across Dubai and Sharjah.
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-warning-bg border border-warning-border">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                <div>
                  <div className="font-medium text-warning-text mb-1">
                    Key Risk Areas
                  </div>
                  <div className="text-sm text-text-secondary">
                    5 clauses flagged: 2 Medium risk (payment terms, IP rights), 1 High risk (liability cap). High-risk liability clause requires immediate attention before contract execution.
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-success-bg border border-success-border">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                <div>
                  <div className="font-medium text-success-text mb-1">
                    Recommendation
                  </div>
                  <div className="text-sm text-text-secondary">
                    Contract can proceed to legal review after addressing the liability cap clause. Other issues are minor and can be resolved during negotiation phase. Overall risk assessment: Medium.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
