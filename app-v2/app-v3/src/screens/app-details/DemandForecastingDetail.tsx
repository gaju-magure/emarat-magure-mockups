/**
 * Demand Forecasting App Detail
 * Full-screen overlay with forecasting dashboard and charts
 * Refactored to use shared components (Phase 5 Second Pass)
 */

import { TrendingUp, Target, BarChart3, AlertCircle } from 'lucide-react';
import { AppDetailHeader } from '@/shared/components/AppDetailHeader';
import { StatsGrid } from '@/shared/components/StatsGrid';
import { InsightCard } from '@/shared/components/InsightCard';
import { ContentCard } from '@/shared/components/ContentCard';
import { DataTable, Column } from '@/shared/components/DataTable';
import { ConfidenceBar } from '@/shared/components/ConfidenceBar';
import { StatusPill } from '@/shared/components/StatusPill';
import { StatItem, InsightItem } from '@/shared/types/app-details';
import { ForecastItem } from '@/shared/types/data-models';

interface DemandForecastingDetailProps {
  onClose: () => void;
}

const STATS: StatItem[] = [
  { label: 'Forecast Accuracy', value: '91%', change: '+6%', icon: Target },
  { label: 'Products Tracked', value: '342', change: '+28', icon: BarChart3 },
  { label: 'Avg. Variance', value: '4.2%', change: '-1.8%', icon: TrendingUp },
  { label: 'Stock Optimization', value: 'AED 1.8M', change: '+15%', icon: TrendingUp },
];

const FORECAST_DATA: ForecastItem[] = [
  {
    product: 'Premium Unleaded 95',
    category: 'Fuel',
    currentDemand: '45,200 L/day',
    forecastedDemand: '48,500 L/day',
    change: '+7.3%',
    confidence: 94,
    trend: 'up',
  },
  {
    product: 'Diesel',
    category: 'Fuel',
    currentDemand: '32,100 L/day',
    forecastedDemand: '30,800 L/day',
    change: '-4.0%',
    confidence: 89,
    trend: 'down',
  },
  {
    product: 'Coffee (Emarat Cafe)',
    category: 'Retail',
    currentDemand: '1,240 cups/day',
    forecastedDemand: '1,450 cups/day',
    change: '+16.9%',
    confidence: 86,
    trend: 'up',
  },
  {
    product: 'Car Wash Service',
    category: 'Services',
    currentDemand: '180 services/day',
    forecastedDemand: '195 services/day',
    change: '+8.3%',
    confidence: 92,
    trend: 'up',
  },
];

const INSIGHTS: InsightItem[] = [
  {
    title: 'Weekend Surge Expected',
    type: 'success',
    icon: TrendingUp,
    message: 'Premium fuel demand forecast to increase 12% this weekend due to national holiday travel. Recommend stock increase at highway locations.',
  },
  {
    title: 'Seasonal Pattern Detected',
    type: 'info',
    icon: BarChart3,
    message: 'Coffee sales show consistent 15-20% increase during morning hours (6-9 AM). AI suggests optimizing staffing schedules.',
  },
  {
    title: 'Low Stock Alert',
    type: 'warning',
    icon: AlertCircle,
    message: '3 locations may face stock shortages for Diesel within 48 hours based on current forecast. Immediate replenishment recommended.',
  },
];

export function DemandForecastingDetail({ onClose }: DemandForecastingDetailProps) {
  // Define table columns with type safety
  const columns: Column<ForecastItem>[] = [
    {
      header: 'Product',
      accessor: 'product',
      cellClassName: 'text-sm font-medium text-text-primary',
    },
    {
      header: 'Category',
      accessor: (item) => (
        <StatusPill
          label={item.category}
          variant="neutral"
        />
      ),
    },
    {
      header: 'Current Demand',
      accessor: 'currentDemand',
      cellClassName: 'text-sm text-text-secondary',
    },
    {
      header: 'Forecasted',
      accessor: 'forecastedDemand',
      cellClassName: 'text-sm font-medium text-text-primary',
    },
    {
      header: 'Change',
      accessor: (item) => (
        <span className={`flex items-center gap-1 text-sm font-medium ${
          item.trend === 'up' ? 'text-success' : 'text-danger'
        }`}>
          <TrendingUp className={`h-4 w-4 ${
            item.trend === 'down' ? 'rotate-180' : ''
          }`} />
          {item.change}
        </span>
      ),
    },
    {
      header: 'Confidence',
      accessor: (item) => <ConfidenceBar value={item.confidence} />,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-background-primary overflow-y-auto">
      <AppDetailHeader
        title="Demand Forecasting"
        subtitle="AI-powered demand prediction and inventory optimization"
        status="Live"
        onClose={onClose}
      />

      {/* Content */}
      <div className="container mx-auto px-4 py-6 space-y-6">
        <StatsGrid stats={STATS} />

        {/* Forecast Chart Placeholder */}
        <ContentCard title="7-Day Demand Forecast">
          <div className="flex items-center justify-between mb-4">
            <div></div>
            <select className="px-3 py-2 rounded-lg bg-background-secondary border border-border text-text-primary text-sm">
              <option>All Products</option>
              <option>Fuel</option>
              <option>Retail</option>
              <option>Services</option>
            </select>
          </div>

          {/* Simplified chart visualization */}
          <div className="h-64 bg-background-secondary rounded-lg flex items-center justify-center border border-border">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-accent mx-auto mb-2" />
              <div className="text-sm text-text-tertiary">
                Forecast chart visualization
              </div>
              <div className="text-xs text-text-tertiary mt-1">
                Interactive chart with historical vs. forecasted data
              </div>
            </div>
          </div>
        </ContentCard>

        {/* Forecast Table */}
        <ContentCard title="Product Forecasts - Next 7 Days">
          <DataTable
            columns={columns}
            data={FORECAST_DATA}
            keyExtractor={(item) => item.product}
          />
        </ContentCard>

        {/* AI Insights */}
        <ContentCard title="AI Insights & Recommendations">
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
