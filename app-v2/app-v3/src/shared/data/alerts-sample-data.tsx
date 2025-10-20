/**
 * Sample Data for Alerts Panel
 * Realistic UAE business context
 */

import { MessageSquare, Sparkles, CheckCircle, Target } from 'lucide-react';
import { Alert, Activity, QuickStat } from '@/shared/types/alerts-data-models';

export const SAMPLE_ALERTS: Alert[] = [
  {
    id: '1',
    type: 'error',
    title: 'Invoice Mismatch Detected',
    message: 'Batch #4521 has 3 invoices with discrepancies exceeding AED 10,000',
    time: '5 min ago',
    read: false,
    priority: 'high',
    actionUrl: '/apps/invoice-reconciliation',
  },
  {
    id: '2',
    type: 'warning',
    title: 'RFP Evaluation Deadline',
    message: 'Tender #RFP-2025-089 evaluation due in 2 hours',
    time: '12 min ago',
    read: false,
    priority: 'high',
  },
  {
    id: '3',
    type: 'success',
    title: 'Contract Review Complete',
    message: 'AI completed review of ADNOC supply agreement - 0 high-risk clauses',
    time: '1 hour ago',
    read: true,
    priority: 'medium',
  },
  {
    id: '4',
    type: 'info',
    title: 'Model Update Deployed',
    message: 'Demand forecasting accuracy improved to 98.5%',
    time: '3 hours ago',
    read: true,
    priority: 'low',
  },
];

export const SAMPLE_ACTIVITIES: Activity[] = [
  {
    id: '1',
    icon: '🤖',
    action: 'Analyzed 247 invoices',
    user: 'Emarat AI',
    time: '5 min ago',
    type: 'ai',
    details: 'Invoice Reconciliation batch completed',
  },
  {
    id: '2',
    icon: '👤',
    action: 'Reviewed RFP proposal',
    user: 'Ahmed Al Mazrouei',
    time: '12 min ago',
    type: 'user',
  },
  {
    id: '3',
    icon: '⚙️',
    action: 'Batch import completed',
    user: 'System',
    time: '18 min ago',
    type: 'system',
  },
  {
    id: '4',
    icon: '🤖',
    action: 'Identified contract risks',
    user: 'Emarat AI',
    time: '25 min ago',
    type: 'ai',
    details: '3 high-risk clauses flagged in legal documents',
  },
  {
    id: '5',
    icon: '👤',
    action: 'Updated demand forecast',
    user: 'Fatima Hassan',
    time: '32 min ago',
    type: 'user',
  },
  {
    id: '6',
    icon: '🤖',
    action: 'Processed vendor payments',
    user: 'Emarat AI',
    time: '45 min ago',
    type: 'ai',
    details: 'AED 2.4M in payments validated',
  },
];

export const SAMPLE_QUICK_STATS: QuickStat[] = [
  {
    label: 'Active Chats',
    value: '12',
    change: 3,
    trend: 'up',
    icon: <MessageSquare className="h-4 w-4" />,
    color: 'primary',
  },
  {
    label: 'AI Actions Today',
    value: '247',
    change: 18,
    trend: 'up',
    icon: <Sparkles className="h-4 w-4" />,
    color: 'accent',
  },
  {
    label: 'Tasks Completed',
    value: '8/15',
    change: 53,
    trend: 'neutral',
    icon: <CheckCircle className="h-4 w-4" />,
    color: 'success',
  },
  {
    label: 'AI Accuracy',
    value: '98.5%',
    change: 0.3,
    trend: 'up',
    icon: <Target className="h-4 w-4" />,
    color: 'accent',
  },
];
