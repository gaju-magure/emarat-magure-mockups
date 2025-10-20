/**
 * Invoice Reconciliation App Detail
 * Full-screen overlay with invoice matching workspace
 * Refactored to use shared components (Phase 5 Second Pass)
 */

import { CheckCircle, AlertCircle, FileText, TrendingUp } from 'lucide-react';
import { AppDetailHeader } from '@/shared/components/AppDetailHeader';
import { StatsGrid } from '@/shared/components/StatsGrid';
import { InsightCard } from '@/shared/components/InsightCard';
import { ContentCard } from '@/shared/components/ContentCard';
import { DataTable, Column } from '@/shared/components/DataTable';
import { ConfidenceBar } from '@/shared/components/ConfidenceBar';
import { StatusPill } from '@/shared/components/StatusPill';
import { StatItem, InsightItem } from '@/shared/types/app-details';
import { Invoice } from '@/shared/types/data-models';
import { getPillVariant } from '@/shared/utils/status';

interface InvoiceReconciliationDetailProps {
  onClose: () => void;
}

const STATS: StatItem[] = [
  { label: 'Invoices Processed', value: '1,247', change: '+18%', icon: FileText },
  { label: 'Match Rate', value: '94%', change: '+5%', icon: CheckCircle },
  { label: 'Time Saved', value: '340h', change: '+22%', icon: TrendingUp },
  { label: 'Pending Review', value: '23', change: '-12%', icon: AlertCircle },
];

const RECENT_INVOICES: Invoice[] = [
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

const INSIGHTS: InsightItem[] = [
  {
    title: 'High Match Rate',
    type: 'success',
    icon: CheckCircle,
    message: '94% of invoices are automatically matched, saving 340 hours of manual work this month.',
  },
  {
    title: '23 Invoices Need Review',
    type: 'info',
    icon: AlertCircle,
    message: 'Low confidence matches require manual verification. Priority: 3 high-value invoices over AED 50K.',
  },
];

export function InvoiceReconciliationDetail({ onClose }: InvoiceReconciliationDetailProps) {
  // Define table columns with type safety
  const columns: Column<Invoice>[] = [
    {
      header: 'Invoice ID',
      accessor: 'id',
      cellClassName: 'text-sm font-medium text-text-primary',
    },
    {
      header: 'Vendor',
      accessor: 'vendor',
      cellClassName: 'text-sm text-text-secondary',
    },
    {
      header: 'Amount',
      accessor: 'amount',
      cellClassName: 'text-sm font-medium text-text-primary',
    },
    {
      header: 'Confidence',
      accessor: (invoice) => <ConfidenceBar value={invoice.confidence} />,
    },
    {
      header: 'Status',
      accessor: (invoice) => (
        <StatusPill
          label={invoice.status}
          variant={getPillVariant(invoice.status)}
        />
      ),
    },
    {
      header: 'Date',
      accessor: 'date',
      cellClassName: 'text-sm text-text-tertiary',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-background-primary overflow-y-auto">
      <AppDetailHeader
        title="Invoice Reconciliation"
        subtitle="AI-powered invoice matching and reconciliation"
        status="Live"
        onClose={onClose}
      />

      {/* Content */}
      <div className="container mx-auto px-4 py-6 space-y-6">
        <StatsGrid stats={STATS} />

        {/* Recent Invoices Table */}
        <ContentCard title="Recent Invoices">
          <DataTable
            columns={columns}
            data={RECENT_INVOICES}
            keyExtractor={(invoice) => invoice.id}
          />
        </ContentCard>

        {/* AI Insights */}
        <ContentCard title="AI Insights">
          <div className="space-y-3">
            {INSIGHTS.map((insight, idx) => (
              <InsightCard key={idx} insight={insight} />
            ))}
          </div>
        </ContentCard>
      </div>
    </div>
  );
}
