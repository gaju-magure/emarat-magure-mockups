/**
 * Mock Insights Data
 *
 * AI-powered insights for the Jarvis home feed
 * Various types: metrics, alerts, achievements, suggestions
 */

import type { Insight } from '@/types/insight.types';

/**
 * Mock insights data
 */
export const MOCK_INSIGHTS: Insight[] = [
  // Metric insights
  {
    id: 'insight-001',
    type: 'metric',
    title: 'Procurement Efficiency Up',
    content: 'Average RFP completion time reduced by 18% this quarter. AI-assisted evaluations are accelerating decision-making.',
    timestamp: new Date(Date.now() - 3600000),
    metadata: {
      trend: 'up',
      value: 18,
      unit: '%',
      color: 'success',
    },
    action: {
      label: 'View Report',
      href: '/apps/analytics/efficiency',
    },
    seen: false,
  },
  {
    id: 'insight-002',
    type: 'metric',
    title: 'Cost Savings Target Exceeded',
    content: 'Year-to-date savings reached AED 2.4M, surpassing annual target by 15%. Smart vendor consolidation driving results.',
    timestamp: new Date(Date.now() - 7200000),
    metadata: {
      trend: 'up',
      value: 2400000,
      unit: 'AED',
      color: 'success',
    },
    action: {
      label: 'See Breakdown',
      href: '/apps/analytics/savings',
    },
    seen: false,
  },

  // Achievement insights
  {
    id: 'insight-003',
    type: 'achievement',
    title: '🎯 Milestone Reached!',
    content: 'Completed 100 AI-assisted RFP evaluations. Your team is 40% more efficient than industry average.',
    timestamp: new Date(Date.now() - 10800000),
    metadata: {
      color: 'primary',
    },
    seen: true,
  },
  {
    id: 'insight-004',
    type: 'achievement',
    title: '⭐ Compliance Streak',
    content: '90 consecutive days with 100% compliance rate. Outstanding governance practices!',
    timestamp: new Date(Date.now() - 86400000),
    metadata: {
      color: 'success',
    },
    seen: true,
  },

  // Suggestion insights
  {
    id: 'insight-005',
    type: 'suggestion',
    title: 'Optimize Vendor Portfolio',
    content: 'AI recommends consolidating 5 low-volume vendors in Office Supplies category. Potential savings: AED 65K/year.',
    timestamp: new Date(Date.now() - 14400000),
    metadata: {
      value: 65000,
      unit: 'AED',
      color: 'info',
    },
    action: {
      label: 'Review Suggestion',
      href: '/apps/insights/vendor-optimization',
    },
    seen: true,
  },
  {
    id: 'insight-006',
    type: 'suggestion',
    title: 'Forecast Adjustment Recommended',
    content: 'Historical data suggests increasing Q4 IT equipment budget by 12% based on seasonal trends.',
    timestamp: new Date(Date.now() - 18000000),
    metadata: {
      trend: 'up',
      value: 12,
      unit: '%',
      color: 'warning',
    },
    action: {
      label: 'View Details',
      href: '/apps/forecast/q4-adjustment',
    },
    seen: true,
  },

  // Alert insights
  {
    id: 'insight-007',
    type: 'alert',
    title: 'Contract Renewal Upcoming',
    content: '3 major contracts expiring within 60 days. Early renewal negotiations could secure better terms.',
    timestamp: new Date(Date.now() - 21600000),
    metadata: {
      value: 3,
      unit: 'contracts',
      color: 'warning',
    },
    action: {
      label: 'View Contracts',
      href: '/apps/contracts/expiring',
    },
    seen: true,
  },
  {
    id: 'insight-008',
    type: 'alert',
    title: 'Supplier Performance Alert',
    content: 'Vendor "TechCorp Solutions" delivery time increased 25% last month. Consider performance review.',
    timestamp: new Date(Date.now() - 172800000), // 2 days ago
    metadata: {
      trend: 'down',
      value: 25,
      unit: '%',
      color: 'danger',
    },
    action: {
      label: 'Review Vendor',
      href: '/apps/vendors/techcorp',
    },
    seen: true,
  },

  // More varied insights
  {
    id: 'insight-009',
    type: 'metric',
    title: 'Team Productivity',
    content: 'Your team processed 142 tasks this week, 23% above average. Excellent collaboration!',
    timestamp: new Date(Date.now() - 259200000), // 3 days ago
    metadata: {
      trend: 'up',
      value: 23,
      unit: '%',
      color: 'success',
    },
    seen: true,
  },
  {
    id: 'insight-010',
    type: 'suggestion',
    title: 'Training Opportunity',
    content: 'New AI features available for advanced analytics. 15-minute tutorial could boost your efficiency.',
    timestamp: new Date(Date.now() - 345600000), // 4 days ago
    metadata: {
      color: 'info',
    },
    action: {
      label: 'Start Tutorial',
      href: '/training/advanced-analytics',
    },
    seen: true,
  },
];

/**
 * Get recent insights
 */
export function getRecentInsights(limit?: number): Insight[] {
  const insights = MOCK_INSIGHTS.filter((i) => !i.dismissed).sort((a, b) => {
    const timeA = new Date(a.timestamp).getTime();
    const timeB = new Date(b.timestamp).getTime();
    return timeB - timeA;
  });

  return limit ? insights.slice(0, limit) : insights;
}

/**
 * Get insights by type
 */
export function getInsightsByType(type: Insight['type']): Insight[] {
  return MOCK_INSIGHTS.filter((i) => i.type === type && !i.dismissed);
}

/**
 * Get unread insights count
 */
export function getUnreadInsightsCount(): number {
  return MOCK_INSIGHTS.filter((i) => !i.seen && !i.dismissed).length;
}
