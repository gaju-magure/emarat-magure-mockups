/**
 * RFP Evaluation App Detail
 * Full-screen overlay with proposal scoring workspace
 */

import { ArrowLeft, TrendingUp, Users, Award, Clock } from 'lucide-react';

interface RFPEvaluationDetailProps {
  onClose: () => void;
}

const STATS = [
  { label: 'Active RFPs', value: '8', change: '+2', icon: Award },
  { label: 'Proposals Reviewed', value: '47', change: '+12', icon: Users },
  { label: 'Avg. Review Time', value: '3.2h', change: '-24%', icon: Clock },
  { label: 'Score Accuracy', value: '96%', change: '+8%', icon: TrendingUp },
];

const PROPOSALS = [
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

export function RFPEvaluationDetail({ onClose }: RFPEvaluationDetailProps) {
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
                  RFP Evaluation
                </h1>
                <p className="text-sm text-text-secondary">
                  AI-powered proposal scoring and ranking
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-warning-bg text-warning-text border border-warning-border">
                In Development
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

        {/* Proposals Ranking */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary">
              Proposal Rankings - RFP-2025-034
            </h2>
            <span className="text-sm text-text-tertiary">
              4 proposals submitted
            </span>
          </div>

          <div className="space-y-4">
            {PROPOSALS.map((proposal, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg border border-border bg-background-secondary hover:bg-background-tertiary transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-accent">
                        #{idx + 1}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-text-primary">
                        {proposal.vendor}
                      </div>
                      <div className="text-sm text-text-tertiary">
                        Submitted: {proposal.submittedDate} • {proposal.amount}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-text-primary mb-1">
                      {proposal.totalScore}
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      proposal.status === 'Recommended'
                        ? 'bg-success-bg text-success-text'
                        : proposal.status === 'Under Review'
                        ? 'bg-warning-bg text-warning-text'
                        : proposal.status === 'Shortlisted'
                        ? 'bg-info-bg text-info-text'
                        : 'bg-danger-bg text-danger-text'
                    }`}>
                      {proposal.status}
                    </span>
                  </div>
                </div>

                {/* Criteria Scores */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {Object.entries(proposal.criteria).map(([key, score]) => (
                    <div key={key}>
                      <div className="text-xs text-text-tertiary uppercase mb-1">
                        {key}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-background-tertiary rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              score >= 90
                                ? 'bg-success'
                                : score >= 80
                                ? 'bg-warning'
                                : 'bg-danger'
                            }`}
                            style={{ width: `${score}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-text-primary w-8">
                          {score}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            AI Evaluation Insights
          </h2>
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-success-bg border border-success-border">
              <div className="flex items-start gap-3">
                <Award className="h-5 w-5 text-success mt-0.5" />
                <div>
                  <div className="font-medium text-success-text mb-1">
                    Clear Winner Identified
                  </div>
                  <div className="text-sm text-text-secondary">
                    Emirates Tech Solutions scores highest across all criteria with 92/100 overall. Strong technical capability (95) and proven experience (94) make this the recommended vendor.
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-warning-bg border border-warning-border">
              <div className="flex items-start gap-3">
                <TrendingUp className="h-5 w-5 text-warning mt-0.5" />
                <div>
                  <div className="font-medium text-warning-text mb-1">
                    Price vs. Quality Analysis
                  </div>
                  <div className="text-sm text-text-secondary">
                    Dubai Digital Systems offers the highest price (AED 1.42M) but lowest score (74). Al Manara Consulting provides best value at AED 980K with 79 score.
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-info-bg border border-info-border">
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-info mt-0.5" />
                <div>
                  <div className="font-medium text-info-text mb-1">
                    Review Recommendation
                  </div>
                  <div className="text-sm text-text-secondary">
                    Gulf Innovation Partners (87 score) is under final review. Strong commercial terms (92) but lower experience score (82) requires stakeholder discussion.
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
