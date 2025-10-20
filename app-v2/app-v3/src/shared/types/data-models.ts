/**
 * Data Models
 * TypeScript interfaces for all data structures used across detail screens
 * Single Responsibility: Define strict types for data constants
 *
 * Benefits:
 * - Type safety throughout the application
 * - IntelliSense/autocomplete support
 * - Prevents typos and runtime errors
 * - Self-documenting code
 */

// ============================================================================
// Invoice Reconciliation Data Models
// ============================================================================

export interface Invoice {
  id: string;
  vendor: string;
  amount: string;
  status: 'Matched' | 'Review';
  confidence: number;
  date: string;
}

// ============================================================================
// RFP Evaluation Data Models
// ============================================================================

export interface Proposal {
  id: string;
  vendor: string;
  submittedDate: string;
  totalScore: number;
  criteria: {
    technical: number;
    commercial: number;
    experience: number;
    compliance: number;
  };
  status: 'Recommended' | 'Under Review' | 'Shortlisted' | 'Not Recommended';
  amount: string;
}

export interface ProposalDetail {
  criterion: string;
  weight: number;
  score: number;
  maxScore: number;
  notes: string;
}

// ============================================================================
// Demand Forecasting Data Models
// ============================================================================

export interface ForecastItem {
  product: string;
  category: string;
  currentDemand: string;
  forecastedDemand: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  confidence: number;
}

export interface ForecastRecommendation {
  product: string;
  action: 'Increase Stock' | 'Reduce Stock' | 'Maintain Current' | 'Monitor Closely';
  reason: string;
  impact: 'High' | 'Medium' | 'Low';
}

// ============================================================================
// Contract Review Data Models
// ============================================================================

export interface Contract {
  id: string;
  title: string;
  vendor: string;
  date: string;
  riskScore: 'High' | 'Medium' | 'Low';
  issues: number;
  status: 'Approved' | 'Under Review' | 'Revision Needed';
  value: string;
}

export interface FlaggedClause {
  clause: string;
  risk: 'High' | 'Medium' | 'Low';
  issue: string;
  recommendation: string;
}

// ============================================================================
// Customer Insights Data Models
// ============================================================================

export interface CustomerSegment {
  name: string;
  size: number;
  percentage: number;
  avgSpend: string;
  visits: string;
  primaryProducts: string;
  growth: string;
  color: 'success' | 'info' | 'warning' | 'accent';
}

export interface BehavioralTrend {
  trend: string;
  insight: string;
  recommendation: string;
}

// ============================================================================
// Common Types & Unions
// ============================================================================

export type RiskLevel = 'High' | 'Medium' | 'Low';
export type TrendDirection = 'up' | 'down' | 'stable';
export type ContractStatus = 'Approved' | 'Under Review' | 'Revision Needed' | 'Expired' | 'Active';
export type InvoiceStatus = 'Matched' | 'Review' | 'Pending' | 'Failed';
