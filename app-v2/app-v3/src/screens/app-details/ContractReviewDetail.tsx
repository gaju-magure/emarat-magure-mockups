/**
 * Contract Review App Detail
 * Full-screen overlay with contract analysis interface
 * Two-tab layout: Chat with dedicated agent + Workspace
 */

import { FileText, AlertTriangle, CheckCircle, Shield, Clock } from 'lucide-react';
import { AppTabLayout } from '@/shared/components/AppTabLayout';
import { AgentChat } from '@/shared/components/AgentChat';
import { StatsGrid } from '@/shared/components/StatsGrid';
import { InsightCard } from '@/shared/components/InsightCard';
import { ContentCard } from '@/shared/components/ContentCard';
import { DataTable, Column } from '@/shared/components/DataTable';
import { StatusPill } from '@/shared/components/StatusPill';
import { FlaggedClauseCard } from '@/shared/components/FlaggedClauseCard';
import { StatItem, InsightItem } from '@/shared/types/app-details';
import { Contract, FlaggedClause } from '@/shared/types/data-models';
import { getPillVariant } from '@/shared/utils/status';

interface ContractReviewDetailProps {
  onClose: () => void;
}

const STATS: StatItem[] = [
  { label: 'Contracts Reviewed', value: '127', change: '+23', icon: FileText },
  { label: 'Risk Issues Found', value: '34', change: '-12%', icon: AlertTriangle },
  { label: 'Avg. Review Time', value: '18min', change: '-42%', icon: Clock },
  { label: 'Compliance Rate', value: '96%', change: '+4%', icon: Shield },
];

const RECENT_CONTRACTS: Contract[] = [
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

const FLAGGED_CLAUSES: FlaggedClause[] = [
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

const INSIGHTS: InsightItem[] = [
  {
    title: 'Contract Overview',
    type: 'info',
    icon: FileText,
    message: 'This is a standard maintenance service agreement valued at AED 850K for 24-month term. The contract covers preventive and corrective maintenance for 12 Emarat service stations across Dubai and Sharjah.',
  },
  {
    title: 'Key Risk Areas',
    type: 'warning',
    icon: AlertTriangle,
    message: '5 clauses flagged: 2 Medium risk (payment terms, IP rights), 1 High risk (liability cap). High-risk liability clause requires immediate attention before contract execution.',
  },
  {
    title: 'Recommendation',
    type: 'success',
    icon: CheckCircle,
    message: 'Contract can proceed to legal review after addressing the liability cap clause. Other issues are minor and can be resolved during negotiation phase. Overall risk assessment: Medium.',
  },
];

export function ContractReviewDetail({ onClose }: ContractReviewDetailProps) {
  // Define table columns with type safety
  const columns: Column<Contract>[] = [
    {
      header: 'Contract ID',
      accessor: 'id',
      cellClassName: 'text-sm font-medium text-text-primary',
    },
    {
      header: 'Title',
      accessor: (contract) => (
        <div>
          <div className="text-sm font-medium text-text-primary">
            {contract.title}
          </div>
          <div className="text-xs text-text-tertiary">
            {contract.vendor}
          </div>
        </div>
      ),
    },
    {
      header: 'Value',
      accessor: 'value',
      cellClassName: 'text-sm font-medium text-text-primary',
    },
    {
      header: 'Risk Score',
      accessor: (contract) => (
        <StatusPill
          label={contract.riskScore}
          variant={getPillVariant(contract.riskScore)}
        />
      ),
    },
    {
      header: 'Issues',
      accessor: (contract) => (
        <span className="text-sm font-medium text-text-primary">
          {contract.issues}
        </span>
      ),
    },
    {
      header: 'Status',
      accessor: (contract) => (
        <StatusPill
          label={contract.status}
          variant={getPillVariant(contract.status)}
        />
      ),
    },
    {
      header: 'Date',
      accessor: 'date',
      cellClassName: 'text-sm text-text-tertiary',
    },
  ];

  // Chat tab content
  const chatContent = (
    <AgentChat
      agentName="Contract Review"
      agentDescription="I can help you analyze contracts, identify risk clauses, and suggest revisions."
      placeholder="Ask about contract clauses, risk assessment, or compliance..."
    />
  );

  // Workspace tab content
  const workspaceContent = (
    <div className="h-full overflow-y-auto">
      <div className="container mx-auto px-4 py-6 space-y-6">
        <StatsGrid stats={STATS} />

        {/* Recent Contracts Table */}
        <ContentCard title="Recent Contract Reviews">
          <DataTable
            columns={columns}
            data={RECENT_CONTRACTS}
            keyExtractor={(contract) => contract.id}
          />
        </ContentCard>

        {/* Flagged Clauses - Current Contract */}
        <ContentCard
          title="Flagged Clauses - CNT-2025-088"
          subtitle="Station Maintenance Service Agreement"
        >
          <div className="space-y-3">
            {FLAGGED_CLAUSES.map((clause, idx) => (
              <FlaggedClauseCard key={idx} {...clause} />
            ))}
          </div>
        </ContentCard>

        {/* AI Summary */}
        <ContentCard title="AI-Generated Summary">
          <div className="space-y-3">
            {INSIGHTS.map((insight, idx) => (
              <InsightCard key={idx} insight={insight} />
            ))}
          </div>
        </ContentCard>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 bg-background-primary">
      <AppTabLayout chatContent={chatContent} workspaceContent={workspaceContent} onClose={onClose} />
    </div>
  );
}
