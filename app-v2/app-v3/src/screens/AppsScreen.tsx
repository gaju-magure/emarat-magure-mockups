/**
 * Apps Gallery Screen
 * Browse all AI apps with filtering and status
 */

import { useState } from 'react';
import { FileText, BarChart3, TrendingUp, FileSearch, Users, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { InvoiceReconciliationDetail } from './app-details/InvoiceReconciliationDetail';
import { RFPEvaluationDetail } from './app-details/RFPEvaluationDetail';
import { DemandForecastingDetail } from './app-details/DemandForecastingDetail';
import { ContractReviewDetail } from './app-details/ContractReviewDetail';
import { CustomerInsightsDetail } from './app-details/CustomerInsightsDetail';

const APP_CATEGORIES = ['All', 'Live', 'In Development', 'Planned'];

const APPS = [
  {
    id: 1,
    name: 'Invoice Reconciliation',
    description: 'Automated invoice matching and reconciliation',
    icon: FileText,
    status: 'Live',
    users: 45,
    accuracy: '94%',
    savings: 'AED 480K',
  },
  {
    id: 2,
    name: 'RFP Evaluation',
    description: 'Intelligent RFP scoring and ranking system',
    icon: FileSearch,
    status: 'Live',
    users: 12,
    accuracy: '89%',
    savings: 'AED 320K',
  },
  {
    id: 3,
    name: 'Demand Forecasting',
    description: 'Predictive analytics for demand planning',
    icon: TrendingUp,
    status: 'In Development',
    users: 8,
    accuracy: '91%',
    savings: 'TBD',
  },
  {
    id: 4,
    name: 'Contract Review',
    description: 'AI-powered contract analysis and risk detection',
    icon: FileText,
    status: 'In Development',
    users: 5,
    accuracy: '87%',
    savings: 'TBD',
  },
  {
    id: 5,
    name: 'Customer Insights',
    description: 'Customer behavior analysis and segmentation',
    icon: Users,
    status: 'Planned',
    users: 0,
    accuracy: 'N/A',
    savings: 'TBD',
  },
  {
    id: 6,
    name: 'Sales Analytics',
    description: 'Real-time sales performance tracking',
    icon: BarChart3,
    status: 'Planned',
    users: 0,
    accuracy: 'N/A',
    savings: 'TBD',
  },
];

const STATUS_CONFIG = {
  Live: {
    icon: CheckCircle,
    color: 'success',
    bgClass: 'bg-success-bg',
    textClass: 'text-success-text',
    borderClass: 'border-success-border',
  },
  'In Development': {
    icon: Clock,
    color: 'warning',
    bgClass: 'bg-warning-bg',
    textClass: 'text-warning-text',
    borderClass: 'border-warning-border',
  },
  Planned: {
    icon: AlertCircle,
    color: 'info',
    bgClass: 'bg-info-bg',
    textClass: 'text-info-text',
    borderClass: 'border-info-border',
  },
};

export function AppsScreen() {
  const [selectedAppId, setSelectedAppId] = useState<number | null>(null);

  const handleAppClick = (appId: number) => {
    // Only open detail screens for apps 1-5 (apps with detail screens)
    if (appId >= 1 && appId <= 5) {
      setSelectedAppId(appId);
    }
  };

  const handleCloseDetail = () => {
    setSelectedAppId(null);
  };

  // Render detail screen based on selected app
  const renderDetailScreen = () => {
    switch (selectedAppId) {
      case 1:
        return <InvoiceReconciliationDetail onClose={handleCloseDetail} />;
      case 2:
        return <RFPEvaluationDetail onClose={handleCloseDetail} />;
      case 3:
        return <DemandForecastingDetail onClose={handleCloseDetail} />;
      case 4:
        return <ContractReviewDetail onClose={handleCloseDetail} />;
      case 5:
        return <CustomerInsightsDetail onClose={handleCloseDetail} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="h-full overflow-y-auto">
        <div className="p-4 md:p-6 lg:p-8 space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-text-primary">
            AI Apps Gallery
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Browse and explore all AI applications
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {APP_CATEGORIES.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                category === 'All'
                  ? 'bg-primary text-white'
                  : 'bg-background-secondary text-text-secondary hover:bg-background-tertiary hover:text-text-primary'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {APPS.map((app) => {
            const Icon = app.icon;
            const statusConfig = STATUS_CONFIG[app.status as keyof typeof STATUS_CONFIG];
            const StatusIcon = statusConfig.icon;

            return (
              <div
                key={app.id}
                onClick={() => handleAppClick(app.id)}
                className="card p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group"
              >
                {/* App Icon & Status */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig.bgClass} ${statusConfig.textClass} border ${statusConfig.borderClass}`}
                  >
                    <StatusIcon className="h-3 w-3" />
                    {app.status}
                  </div>
                </div>

                {/* App Info */}
                <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors">
                  {app.name}
                </h3>
                <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                  {app.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
                  <div>
                    <div className="text-xs text-text-tertiary mb-1">Users</div>
                    <div className="text-sm font-semibold text-text-primary">
                      {app.users}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-text-tertiary mb-1">Accuracy</div>
                    <div className="text-sm font-semibold text-text-primary">
                      {app.accuracy}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-text-tertiary mb-1">Savings</div>
                    <div className="text-sm font-semibold text-accent">
                      {app.savings}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>

    {/* App Detail Modal */}
    {selectedAppId && renderDetailScreen()}
  </>
  );
}
