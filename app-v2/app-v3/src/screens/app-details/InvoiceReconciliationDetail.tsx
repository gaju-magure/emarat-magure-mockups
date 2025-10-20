/**
 * Invoice Reconciliation App Detail
 * Full-screen overlay with invoice matching workspace
 */

import { ArrowLeft, CheckCircle, AlertCircle, FileText, TrendingUp } from 'lucide-react';

interface InvoiceReconciliationDetailProps {
  onClose: () => void;
}

const STATS = [
  { label: 'Invoices Processed', value: '1,247', change: '+18%', icon: FileText },
  { label: 'Match Rate', value: '94%', change: '+5%', icon: CheckCircle },
  { label: 'Time Saved', value: '340h', change: '+22%', icon: TrendingUp },
  { label: 'Pending Review', value: '23', change: '-12%', icon: AlertCircle },
];

const RECENT_INVOICES = [
  {
    id: 'INV-2847',
    vendor: 'Emirates Supplies Co.',
    amount: 'AED 45,230',
    status: 'Matched',
    confidence: 98,
    date: '2025-10-20',
  },
  {
    id: 'INV-2846',
    vendor: 'Gulf Trading LLC',
    amount: 'AED 12,650',
    status: 'Matched',
    confidence: 95,
    date: '2025-10-20',
  },
  {
    id: 'INV-2845',
    vendor: 'Al Manara Services',
    amount: 'AED 8,420',
    status: 'Review',
    confidence: 78,
    date: '2025-10-19',
  },
  {
    id: 'INV-2844',
    vendor: 'Dubai Logistics',
    amount: 'AED 67,890',
    status: 'Matched',
    confidence: 96,
    date: '2025-10-19',
  },
];

export function InvoiceReconciliationDetail({ onClose }: InvoiceReconciliationDetailProps) {
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
                  Invoice Reconciliation
                </h1>
                <p className="text-sm text-text-secondary">
                  AI-powered invoice matching and reconciliation
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
            return (
              <div key={idx} className="card p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <span className="text-xs font-medium text-success px-2 py-1 bg-success-bg rounded">
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

        {/* Recent Invoices Table */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Recent Invoices
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-border">
                  <th className="pb-3 text-xs font-medium text-text-tertiary uppercase">
                    Invoice ID
                  </th>
                  <th className="pb-3 text-xs font-medium text-text-tertiary uppercase">
                    Vendor
                  </th>
                  <th className="pb-3 text-xs font-medium text-text-tertiary uppercase">
                    Amount
                  </th>
                  <th className="pb-3 text-xs font-medium text-text-tertiary uppercase">
                    Confidence
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
                {RECENT_INVOICES.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-background-secondary transition-colors">
                    <td className="py-4 text-sm font-medium text-text-primary">
                      {invoice.id}
                    </td>
                    <td className="py-4 text-sm text-text-secondary">
                      {invoice.vendor}
                    </td>
                    <td className="py-4 text-sm font-medium text-text-primary">
                      {invoice.amount}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 max-w-[100px] h-2 bg-background-tertiary rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              invoice.confidence >= 90
                                ? 'bg-success'
                                : invoice.confidence >= 80
                                ? 'bg-warning'
                                : 'bg-danger'
                            }`}
                            style={{ width: `${invoice.confidence}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-text-primary">
                          {invoice.confidence}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          invoice.status === 'Matched'
                            ? 'bg-success-bg text-success-text'
                            : 'bg-warning-bg text-warning-text'
                        }`}
                      >
                        {invoice.status}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-text-tertiary">{invoice.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Insights */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            AI Insights
          </h2>
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-success-bg border border-success-border">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                <div>
                  <div className="font-medium text-success-text mb-1">
                    High Match Rate
                  </div>
                  <div className="text-sm text-text-secondary">
                    94% of invoices are automatically matched, saving 340 hours of manual work this month.
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-info-bg border border-info-border">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-info mt-0.5" />
                <div>
                  <div className="font-medium text-info-text mb-1">
                    23 Invoices Need Review
                  </div>
                  <div className="text-sm text-text-secondary">
                    Low confidence matches require manual verification. Priority: 3 high-value invoices over AED 50K.
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
