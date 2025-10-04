import { AppLayout } from '../../components/layout/AppLayout';

export function InsightsPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Emarat Insights
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            AI-powered conversational analytics
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-12 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <p className="text-gray-600 dark:text-gray-400">
            Feature coming soon - F2: Emarat Insights (24 screens)
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
