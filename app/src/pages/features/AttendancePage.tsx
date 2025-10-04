import { AppLayout } from '../../components/layout/AppLayout';

export function AttendancePage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Time & Attendance
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Facial recognition check-in/out system
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-12 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <p className="text-gray-600 dark:text-gray-400">
            Feature coming soon - F9: Time & Attendance (33 screens)
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
