/**
 * Customer Insights App Detail
 * Full-screen overlay with customer data analysis
 * Refactored to use shared components (Phase 5 Second Pass)
 */

import { Users, TrendingUp, Target, DollarSign, PieChart } from 'lucide-react';
import { AppDetailHeader } from '@/shared/components/AppDetailHeader';
import { StatsGrid } from '@/shared/components/StatsGrid';
import { InsightCard } from '@/shared/components/InsightCard';
import { ContentCard } from '@/shared/components/ContentCard';
import { StatusPill } from '@/shared/components/StatusPill';
import { StatItem, InsightItem } from '@/shared/types/app-details';
import { CustomerSegment, BehavioralTrend } from '@/shared/types/data-models';

interface CustomerInsightsDetailProps {
  onClose: () => void;
}

const STATS: StatItem[] = [
  { label: 'Total Customers', value: '284K', change: '+12%', icon: Users },
  { label: 'Avg. Lifetime Value', value: 'AED 3,420', change: '+8%', icon: DollarSign },
  { label: 'Retention Rate', value: '87%', change: '+3%', icon: Target },
  { label: 'Monthly Growth', value: '4.2%', change: '+1.1%', icon: TrendingUp },
];

const CUSTOMER_SEGMENTS: CustomerSegment[] = [
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

const INSIGHTS: InsightItem[] = [
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

const BEHAVIOR_TRENDS: BehavioralTrend[] = [
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
      <AppDetailHeader
        title="Customer Insights"
        subtitle="AI-powered customer behavior analysis and segmentation"
        status="Planned"
        onClose={onClose}
      />

      {/* Content */}
      <div className="container mx-auto px-4 py-6 space-y-6">
        <StatsGrid stats={STATS} />

        {/* Customer Segments Visualization */}
        <ContentCard
          title="Customer Segmentation"
          action={
            <select className="px-3 py-2 rounded-lg bg-background-secondary border border-border text-text-primary text-sm">
              <option>All Locations</option>
              <option>Dubai</option>
              <option>Abu Dhabi</option>
              <option>Sharjah</option>
            </select>
          }
        >

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
            {CUSTOMER_SEGMENTS.map((segment, idx) => {
              // TAILWIND FIX: Use explicit class mapping instead of dynamic interpolation
              const SEGMENT_COLOR_CLASSES: Record<string, string> = {
                success: 'bg-success',
                info: 'bg-info',
                warning: 'bg-warning',
                accent: 'bg-accent',
              };
              const progressBarClass = SEGMENT_COLOR_CLASSES[segment.color] || 'bg-accent';

              return (
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
                    <StatusPill
                      label={segment.growth}
                      variant="success"
                    />
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
                        className={`h-full ${progressBarClass}`}
                        style={{ width: `${segment.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ContentCard>

        {/* Behavior Trends */}
        <ContentCard title="Behavioral Trends">
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
        </ContentCard>

        {/* AI Insights */}
        <ContentCard title="AI-Powered Insights">
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
