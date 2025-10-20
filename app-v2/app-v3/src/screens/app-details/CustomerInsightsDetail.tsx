/**
 * Customer Insights App Detail
 * Full-screen overlay with customer data analysis
 */

import { ArrowLeft, Users, TrendingUp, Target, DollarSign, PieChart } from 'lucide-react';

interface CustomerInsightsDetailProps {
  onClose: () => void;
}

const STATS = [
  { label: 'Total Customers', value: '284K', change: '+12%', icon: Users },
  { label: 'Avg. Lifetime Value', value: 'AED 3,420', change: '+8%', icon: DollarSign },
  { label: 'Retention Rate', value: '87%', change: '+3%', icon: Target },
  { label: 'Monthly Growth', value: '4.2%', change: '+1.1%', icon: TrendingUp },
];

const CUSTOMER_SEGMENTS = [
  {
    name: 'Premium Frequent Users',
    size: 42800,
    percentage: 15,
    avgSpend: 'AED 580/month',
    visits: '12-15/month',
    primaryProducts: 'Premium Fuel, Car Wash, Cafe',
    growth: '+18%',
    color: 'success',
  },
  {
    name: 'Regular Commuters',
    size: 113600,
    percentage: 40,
    avgSpend: 'AED 320/month',
    visits: '8-10/month',
    primaryProducts: 'Regular Fuel, Convenience Items',
    growth: '+8%',
    color: 'info',
  },
  {
    name: 'Occasional Visitors',
    size: 85200,
    percentage: 30,
    avgSpend: 'AED 180/month',
    visits: '3-5/month',
    primaryProducts: 'Fuel, Snacks',
    growth: '+5%',
    color: 'warning',
  },
  {
    name: 'New Customers',
    size: 42600,
    percentage: 15,
    avgSpend: 'AED 95/month',
    visits: '1-2/month',
    primaryProducts: 'Fuel',
    growth: '+32%',
    color: 'accent',
  },
];

const INSIGHTS = [
  {
    title: 'Premium Segment Growing Fast',
    type: 'success',
    icon: TrendingUp,
    message: 'Premium Frequent Users segment grew 18% this quarter, contributing 45% of total revenue despite being only 15% of customer base. Recommend targeted loyalty programs.',
  },
  {
    title: 'High Churn Risk Identified',
    type: 'warning',
    icon: Target,
    message: '8,400 customers (3%) showing churn indicators: decreased visit frequency and lower spend. AI recommends personalized re-engagement campaigns within 2 weeks.',
  },
  {
    title: 'Cross-Sell Opportunity',
    type: 'info',
    icon: DollarSign,
    message: '62% of Regular Commuters have never used car wash services. Targeted promotions could increase car wash revenue by estimated AED 1.2M annually.',
  },
];

const BEHAVIOR_TRENDS = [
  {
    trend: 'Peak Hours',
    insight: 'Highest traffic: 7-9 AM (38%) and 5-7 PM (42%)',
    recommendation: 'Optimize staffing during peak hours',
  },
  {
    trend: 'Preferred Payment',
    insight: 'Digital payments: 72% (up from 58% last year)',
    recommendation: 'Introduce mobile app loyalty rewards',
  },
  {
    trend: 'Location Preference',
    insight: 'Highway stations: 65% of premium customers',
    recommendation: 'Expand premium services at highway locations',
  },
  {
    trend: 'Product Bundling',
    insight: 'Fuel + Cafe purchases: 34% (strong correlation)',
    recommendation: 'Create combo offers to increase basket size',
  },
];

export function CustomerInsightsDetail({ onClose }: CustomerInsightsDetailProps) {
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
                  Customer Insights
                </h1>
                <p className="text-sm text-text-secondary">
                  AI-powered customer behavior analysis and segmentation
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-info-bg text-info-text border border-info-border">
                Planned
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

        {/* Customer Segments Visualization */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary">
              Customer Segmentation
            </h2>
            <select className="px-3 py-2 rounded-lg bg-background-secondary border border-border text-text-primary text-sm">
              <option>All Locations</option>
              <option>Dubai</option>
              <option>Abu Dhabi</option>
              <option>Sharjah</option>
            </select>
          </div>

          {/* Simplified pie chart visualization */}
          <div className="mb-6 h-64 bg-background-secondary rounded-lg flex items-center justify-center border border-border">
            <div className="text-center">
              <PieChart className="h-12 w-12 text-accent mx-auto mb-2" />
              <div className="text-sm text-text-tertiary">
                Customer segment distribution
              </div>
              <div className="text-xs text-text-tertiary mt-1">
                Interactive pie chart showing 4 customer segments
              </div>
            </div>
          </div>

          {/* Segment Details */}
          <div className="space-y-3">
            {CUSTOMER_SEGMENTS.map((segment, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg border border-border bg-background-secondary"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-semibold text-text-primary mb-1">
                      {segment.name}
                    </div>
                    <div className="text-sm text-text-tertiary">
                      {segment.size.toLocaleString()} customers ({segment.percentage}%)
                    </div>
                  </div>
                  <span className="text-xs font-medium text-success px-2 py-1 bg-success-bg rounded">
                    {segment.growth}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <div className="text-xs text-text-tertiary mb-1">Avg. Spend</div>
                    <div className="text-sm font-medium text-text-primary">
                      {segment.avgSpend}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-text-tertiary mb-1">Visit Frequency</div>
                    <div className="text-sm font-medium text-text-primary">
                      {segment.visits}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-text-tertiary mb-1">Primary Products</div>
                    <div className="text-sm font-medium text-text-primary">
                      {segment.primaryProducts}
                    </div>
                  </div>
                </div>

                {/* Progress bar for segment size */}
                <div className="mt-3">
                  <div className="h-2 bg-background-tertiary rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-${segment.color}`}
                      style={{ width: `${segment.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Behavior Trends */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Behavioral Trends
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BEHAVIOR_TRENDS.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg border border-border bg-background-secondary"
              >
                <div className="font-medium text-text-primary mb-2">
                  {item.trend}
                </div>
                <div className="text-sm text-text-secondary mb-2">
                  {item.insight}
                </div>
                <div className="text-xs text-accent font-medium">
                  → {item.recommendation}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            AI-Powered Insights
          </h2>
          <div className="space-y-3">
            {INSIGHTS.map((insight, idx) => {
              const Icon = insight.icon;
              const colorClass =
                insight.type === 'success' ? 'success' :
                insight.type === 'warning' ? 'warning' : 'info';

              return (
                <div key={idx} className={`p-4 rounded-lg bg-${colorClass}-bg border border-${colorClass}-border`}>
                  <div className="flex items-start gap-3">
                    <Icon className={`h-5 w-5 text-${colorClass} mt-0.5`} />
                    <div>
                      <div className={`font-medium text-${colorClass}-text mb-1`}>
                        {insight.title}
                      </div>
                      <div className="text-sm text-text-secondary">
                        {insight.message}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
