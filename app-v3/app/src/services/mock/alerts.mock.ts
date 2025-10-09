/**
 * Mock Alerts Data
 *
 * AI-powered priority alerts for demo purposes
 * Simulates real-time alerts from procurement AI system
 */

import type { Alert } from '@/types/alert.types';

/**
 * Mock alerts data
 * Top 3 most important alerts shown on Jarvis home
 */
export const MOCK_ALERTS: Alert[] = [
  {
    id: 'alert-001',
    type: 'urgent',
    category: 'rfp',
    title: 'RFP Deadline in 2 Hours',
    description:
      'Vendor evaluation for "IT Infrastructure Upgrade - Project Alpha" requires immediate attention. 3 proposals pending review.',
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    action: {
      label: 'Review Now',
      href: '/apps/rfp/project-alpha',
    },
    metadata: {
      confidence: 0.95,
      source: 'RFP Management System',
      entityId: 'rfp-12345',
      priority: 10,
    },
    seen: false,
    dismissed: false,
  },
  {
    id: 'alert-002',
    type: 'warning',
    category: 'forecast',
    title: 'Demand Forecast Anomaly Detected',
    description:
      'Q3 demand forecast shows unexpected +24% spike in Category B materials. Recommend reviewing supplier capacity.',
    timestamp: new Date(Date.now() - 7200000), // 2 hours ago
    action: {
      label: 'View Forecast',
      href: '/apps/forecast/q3-analysis',
    },
    metadata: {
      confidence: 0.87,
      source: 'Demand Forecasting AI',
      priority: 8,
    },
    seen: false,
    dismissed: false,
  },
  {
    id: 'alert-003',
    type: 'info',
    category: 'opportunity',
    title: 'Cost Savings Opportunity',
    description:
      'AI identified 12% potential savings on Office Supplies category by consolidating 3 vendors. Estimated annual savings: AED 45,000.',
    timestamp: new Date(Date.now() - 10800000), // 3 hours ago
    action: {
      label: 'See Details',
      href: '/apps/insights/cost-optimization',
    },
    metadata: {
      confidence: 0.92,
      source: 'Cost Optimization AI',
      priority: 7,
    },
    seen: true,
    dismissed: false,
  },
  {
    id: 'alert-004',
    type: 'urgent',
    category: 'compliance',
    title: 'Compliance Review Required',
    description:
      'Contract renewal for "Facilities Management Services" needs compliance verification before auto-renewal in 5 days.',
    timestamp: new Date(Date.now() - 14400000), // 4 hours ago
    action: {
      label: 'Start Review',
      href: '/apps/compliance/contract-review',
    },
    metadata: {
      confidence: 0.98,
      source: 'Compliance Monitoring',
      entityId: 'contract-789',
      priority: 9,
    },
    seen: true,
    dismissed: false,
  },
  {
    id: 'alert-005',
    type: 'warning',
    category: 'deadline',
    title: 'Pending Approvals',
    description:
      '7 purchase orders awaiting your approval. Total value: AED 285,000. Average wait time: 18 hours.',
    timestamp: new Date(Date.now() - 21600000), // 6 hours ago
    action: {
      label: 'Review Queue',
      href: '/apps/approvals',
    },
    metadata: {
      confidence: 1.0,
      source: 'Approval System',
      priority: 7,
    },
    seen: true,
    dismissed: false,
  },
  {
    id: 'alert-006',
    type: 'info',
    category: 'anomaly',
    title: 'Unusual Spending Pattern',
    description:
      'Department XYZ spent 45% more than usual this month on IT equipment. May need budget adjustment review.',
    timestamp: new Date(Date.now() - 86400000), // 1 day ago
    action: {
      label: 'Investigate',
      href: '/apps/analytics/spending-anomalies',
    },
    metadata: {
      confidence: 0.81,
      source: 'Spending Analytics',
      priority: 6,
    },
    seen: true,
    dismissed: false,
  },
];

/**
 * Get top N priority alerts
 */
export function getTopAlerts(limit: number = 3): Alert[] {
  return MOCK_ALERTS.filter((alert) => !alert.dismissed)
    .sort((a, b) => {
      // Sort by priority (high to low), then by timestamp (recent first)
      const priorityDiff = (b.metadata?.priority || 0) - (a.metadata?.priority || 0);
      if (priorityDiff !== 0) return priorityDiff;

      const timeA = new Date(a.timestamp).getTime();
      const timeB = new Date(b.timestamp).getTime();
      return timeB - timeA;
    })
    .slice(0, limit);
}

/**
 * Get alerts by category
 */
export function getAlertsByCategory(category: Alert['category']): Alert[] {
  return MOCK_ALERTS.filter((alert) => alert.category === category && !alert.dismissed);
}

/**
 * Get alerts by type
 */
export function getAlertsByType(type: Alert['type']): Alert[] {
  return MOCK_ALERTS.filter((alert) => alert.type === type && !alert.dismissed);
}

/**
 * Get unread alerts count
 */
export function getUnreadAlertsCount(): number {
  return MOCK_ALERTS.filter((alert) => !alert.seen && !alert.dismissed).length;
}
