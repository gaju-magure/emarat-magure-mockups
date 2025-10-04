import { AppLayout } from '../../components/layout/AppLayout';

export function HelpdeskPage() {
  const breadcrumbs = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Employee Helpdesk' },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Employee Helpdesk
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            AI assistant for HR queries and support
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-12 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <p className="text-gray-600 dark:text-gray-400">
            Feature coming soon - F3: Employee Support Helpdesk (31 screens)
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
