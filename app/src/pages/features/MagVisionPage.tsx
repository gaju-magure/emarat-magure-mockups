import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '../../components/layout/AppLayout';
import { DashboardHome } from './magvision/DashboardHome';
import { SalesRevenue } from './magvision/SalesRevenue';
import { AskMagVision } from './magvision/AskMagVision';
import { FootfallTracking } from './magvision/FootfallTracking';
import { ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

export function MagVisionPage() {
  return (
    <AppLayout>
      <Routes>
        {/* Default route - redirect to dashboard */}
        <Route index element={<Navigate to="/magvision" replace />} />

        {/* MagVision Dashboard Home (when clicking main MagVision link) */}
        <Route path="/" element={<DashboardHome />} />

        {/* Sub-feature routes */}
        <Route path="/ask" element={<AskMagVision />} />
        <Route path="/footfall" element={<FootfallTracking />} />
        <Route path="/sales" element={<SalesRevenue />} />
        <Route path="/inventory" element={<ComingSoon feature="Inventory Management" />} />
        <Route path="/queue" element={<ComingSoon feature="Queue Monitoring" />} />
        <Route path="/staff" element={<ComingSoon feature="Staff & Scheduling" />} />
        <Route path="/security" element={<ComingSoon feature="Security & Compliance" />} />
        <Route path="/reports" element={<ComingSoon feature="Reports" />} />
      </Routes>
    </AppLayout>
  );
}

// Coming Soon Component
function ComingSoon({ feature }: { feature: string }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {feature}
        </h2>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          AI-Powered insights and analytics
        </p>
      </div>

      <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-gray-200 bg-white p-12 dark:border-gray-800 dark:bg-gray-900">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <ArrowTrendingUpIcon className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Coming Soon
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            This feature is under development
          </p>
        </div>
      </div>
    </div>
  );
}
