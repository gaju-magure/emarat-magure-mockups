/**
 * RFP Evaluation App Detail
 * Full-screen overlay with proposal scoring workspace
 * Two-tab layout: Chat with dedicated agent + Workspace
 */

import { TrendingUp, Users, Award, Clock } from 'lucide-react';
import { AppTabLayout } from '@/shared/components/AppTabLayout';
import { AgentChat } from '@/shared/components/AgentChat';
import { StatsGrid } from '@/shared/components/StatsGrid';
import { InsightCard } from '@/shared/components/InsightCard';
import { ContentCard } from '@/shared/components/ContentCard';
import { DataTable, Column } from '@/shared/components/DataTable';
import { StatusPill } from '@/shared/components/StatusPill';
import { ConfidenceBar } from '@/shared/components/ConfidenceBar';
import { StatItem, InsightItem } from '@/shared/types/app-details';
import { Proposal } from '@/shared/types/data-models';
import { getPillVariant } from '@/shared/utils/status';

interface RFPEvaluationDetailProps {
  onClose: () => void;
}

const STATS: StatItem[] = [
  { label: 'Active RFPs', value: '8', change: '+2', icon: Award },
  { label: 'Proposals Reviewed', value: '47', change: '+12', icon: Users },
  { label: 'Avg. Review Time', value: '3.2h', change: '-24%', icon: Clock },
  { label: 'Score Accuracy', value: '96%', change: '+8%', icon: TrendingUp },
];

const PROPOSALS: Proposal[] = [
  {
    id: 'RFP-2025-034',
    vendor: 'Emirates Tech Solutions',
    submittedDate: '2025-10-18',
    totalScore: 92,
    criteria: {
      technical: 95,
      commercial: 88,
      experience: 94,
      compliance: 92,
    },
    status: 'Recommended',
    amount: 'AED 1,250,000',
  },
  {
    id: 'RFP-2025-034',
    vendor: 'Gulf Innovation Partners',
    submittedDate: '2025-10-17',
    totalScore: 87,
    criteria: {
      technical: 90,
      commercial: 92,
      experience: 82,
      compliance: 85,
    },
    status: 'Under Review',
    amount: 'AED 1,150,000',
  },
  {
    id: 'RFP-2025-034',
    vendor: 'Al Manara Consulting',
    submittedDate: '2025-10-16',
    totalScore: 79,
    criteria: {
      technical: 78,
      commercial: 85,
      experience: 75,
      compliance: 78,
    },
    status: 'Shortlisted',
    amount: 'AED 980,000',
  },
  {
    id: 'RFP-2025-034',
    vendor: 'Dubai Digital Systems',
    submittedDate: '2025-10-15',
    totalScore: 74,
    criteria: {
      technical: 72,
      commercial: 78,
      experience: 70,
      compliance: 76,
    },
    status: 'Not Recommended',
    amount: 'AED 1,420,000',
  },
];

const INSIGHTS: InsightItem[] = [
  {
    title: 'Clear Winner Identified',
    type: 'success',
    icon: Award,
    message: 'Emirates Tech Solutions scores highest across all criteria with 92/100 overall. Strong technical capability (95) and proven experience (94) make this the recommended vendor.',
  },
  {
    title: 'Price vs. Quality Analysis',
    type: 'warning',
    icon: TrendingUp,
    message: 'Dubai Digital Systems offers the highest price (AED 1.42M) but lowest score (74). Al Manara Consulting provides best value at AED 980K with 79 score.',
  },
  {
    title: 'Review Recommendation',
    type: 'info',
    icon: Users,
    message: 'Gulf Innovation Partners (87 score) is under final review. Strong commercial terms (92) but lower experience score (82) requires stakeholder discussion.',
  },
];

export function RFPEvaluationDetail({ onClose }: RFPEvaluationDetailProps) {
  // Define table columns with type safety
  const columns: Column<Proposal>[] = [
    {
      header: 'Rank',
      accessor: (_proposal, index) => (
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <span className="text-lg font-bold text-primary">
            #{index + 1}
          </span>
        </div>
      ),
    },
    {
      header: 'Vendor',
      accessor: (proposal) => (
        <div>
          <div className="font-semibold text-text-primary">
            {proposal.vendor}
          </div>
          <div className="text-sm text-text-tertiary">
            Submitted: {proposal.submittedDate} • {proposal.amount}
          </div>
        </div>
      ),
    },
    {
      header: 'Technical',
      accessor: (proposal) => (
        <ConfidenceBar value={proposal.criteria.technical} />
      ),
    },
    {
      header: 'Commercial',
      accessor: (proposal) => (
        <ConfidenceBar value={proposal.criteria.commercial} />
      ),
    },
    {
      header: 'Experience',
      accessor: (proposal) => (
        <ConfidenceBar value={proposal.criteria.experience} />
      ),
    },
    {
      header: 'Compliance',
      accessor: (proposal) => (
        <ConfidenceBar value={proposal.criteria.compliance} />
      ),
    },
    {
      header: 'Total Score',
      accessor: (proposal) => (
        <div className="text-2xl font-bold text-text-primary">
          {proposal.totalScore}
        </div>
      ),
    },
    {
      header: 'Status',
      accessor: (proposal) => (
        <StatusPill
          label={proposal.status}
          variant={getPillVariant(proposal.status)}
        />
      ),
    },
  ];

  // Chat tab content
  const chatContent = (
    <AgentChat
      agentName="RFP Evaluation"
      agentDescription="I can help you evaluate proposals, compare vendors, and explain scoring criteria."
      placeholder="Ask about proposal rankings, vendor comparisons, or evaluation criteria..."
    />
  );

  // Workspace tab content
  const workspaceContent = (
    <div className="h-full overflow-y-auto">
      <div className="container mx-auto px-4 py-6 space-y-6">
        <StatsGrid stats={STATS} />

        {/* Proposals Ranking */}
        <ContentCard
          title="Proposal Rankings - RFP-2025-034"
          subtitle="4 proposals submitted"
        >
          <DataTable
            columns={columns}
            data={PROPOSALS}
            keyExtractor={(proposal) => proposal.id}
          />
        </ContentCard>

        {/* AI Insights */}
        <ContentCard title="AI Evaluation Insights">
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
