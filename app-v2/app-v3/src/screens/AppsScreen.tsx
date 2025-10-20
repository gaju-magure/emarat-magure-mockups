/**
 * Apps Gallery Screen
 * Browse all AI apps with filtering and status
 */

import { useState } from 'react';
import { FileText, BarChart3, TrendingUp, FileSearch, Users, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { FilterTabs } from '@/shared/components/FilterTabs';
import { PageHeader } from '@/shared/components/PageHeader';
import { AppCard } from '@/shared/components/AppCard';
import { InvoiceReconciliationDetail } from './app-details/InvoiceReconciliationDetail';
import { RFPEvaluationDetail } from './app-details/RFPEvaluationDetail';
import { DemandForecastingDetail } from './app-details/DemandForecastingDetail';
import { ContractReviewDetail } from './app-details/ContractReviewDetail';
import { CustomerInsightsDetail } from './app-details/CustomerInsightsDetail';
import { App } from '@/shared/types/screen-data-models';

const APP_CATEGORIES = ['All', 'Live', 'In Development', 'Planned'];

const APPS: App[] = [
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
  const [activeFilter, setActiveFilter] = useState('All');

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
        <PageHeader
          title="AI Apps Gallery"
          subtitle="Browse and explore all AI applications"
        />

        {/* Filter Tabs */}
        <FilterTabs
          items={APP_CATEGORIES}
          activeItem={activeFilter}
          onChange={setActiveFilter}
        />

        {/* Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {APPS.map((app) => (
            <AppCard
              key={app.id}
              app={app}
              statusConfig={STATUS_CONFIG[app.status as keyof typeof STATUS_CONFIG]}
              onClick={handleAppClick}
            />
          ))}
        </div>
      </div>
    </div>

    {/* App Detail Modal */}
    {selectedAppId && renderDetailScreen()}
  </>
  );
}
