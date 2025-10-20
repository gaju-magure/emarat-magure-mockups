/**
 * Demand Forecasting App Detail
 * Full-screen overlay with forecasting dashboard and charts
 */

import { ArrowLeft, TrendingUp, Target, BarChart3, AlertCircle } from 'lucide-react';

interface DemandForecastingDetailProps {
  onClose: () => void;
}

const STATS = [
  { label: 'Forecast Accuracy', value: '91%', change: '+6%', icon: Target },
  { label: 'Products Tracked', value: '342', change: '+28', icon: BarChart3 },
  { label: 'Avg. Variance', value: '4.2%', change: '-1.8%', icon: TrendingUp },
  { label: 'Stock Optimization', value: 'AED 1.8M', change: '+15%', icon: TrendingUp },
];

const FORECAST_DATA = [
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

const INSIGHTS = [
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
                  Demand Forecasting
                </h1>
                <p className="text-sm text-text-secondary">
                  AI-powered demand prediction and inventory optimization
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-success-bg text-success-text border border-success-border">
                Live
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

        {/* Forecast Chart Placeholder */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary">
              7-Day Demand Forecast
            </h2>
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
        </div>

        {/* Forecast Table */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Product Forecasts - Next 7 Days
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-border">
                  <th className="pb-3 text-xs font-medium text-text-tertiary uppercase">
                    Product
                  </th>
                  <th className="pb-3 text-xs font-medium text-text-tertiary uppercase">
                    Category
                  </th>
                  <th className="pb-3 text-xs font-medium text-text-tertiary uppercase">
                    Current Demand
                  </th>
                  <th className="pb-3 text-xs font-medium text-text-tertiary uppercase">
                    Forecasted
                  </th>
                  <th className="pb-3 text-xs font-medium text-text-tertiary uppercase">
                    Change
                  </th>
                  <th className="pb-3 text-xs font-medium text-text-tertiary uppercase">
                    Confidence
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {FORECAST_DATA.map((item, idx) => (
                  <tr key={idx} className="hover:bg-background-secondary transition-colors">
                    <td className="py-4 text-sm font-medium text-text-primary">
                      {item.product}
                    </td>
                    <td className="py-4">
                      <span className="px-2 py-1 rounded text-xs font-medium bg-background-tertiary text-text-secondary">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-text-secondary">
                      {item.currentDemand}
                    </td>
                    <td className="py-4 text-sm font-medium text-text-primary">
                      {item.forecastedDemand}
                    </td>
                    <td className="py-4">
                      <span className={`flex items-center gap-1 text-sm font-medium ${
                        item.trend === 'up' ? 'text-success' : 'text-danger'
                      }`}>
                        <TrendingUp className={`h-4 w-4 ${
                          item.trend === 'down' ? 'rotate-180' : ''
                        }`} />
                        {item.change}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 max-w-[100px] h-2 bg-background-tertiary rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              item.confidence >= 90
                                ? 'bg-success'
                                : item.confidence >= 85
                                ? 'bg-warning'
                                : 'bg-danger'
                            }`}
                            style={{ width: `${item.confidence}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-text-primary">
                          {item.confidence}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Insights */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            AI Insights & Recommendations
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
