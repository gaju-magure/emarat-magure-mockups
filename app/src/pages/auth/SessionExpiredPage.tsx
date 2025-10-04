import { useLanguage } from '../../contexts/LanguageContext';

export function SessionExpiredPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-secondary px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Icon and Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-warning rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-semibold text-text-primary">
            {t('auth.sessionExpired')}
          </h2>
          <p className="mt-2 text-text-secondary">
            {t('auth.sessionExpiredMessage')}
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-background-elevated rounded-lg shadow-sm border border-border-default p-8">
          <div className="space-y-6">
            {/* Info Message */}
            <div className="bg-warning-bg border-l-4 border-warning-border rounded p-4">
              <p className="text-sm text-warning-text">
                For your security, we've logged you out after 30 minutes of inactivity.
                Please sign in again to continue.
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <a
                href="/login"
                className="block w-full py-3 px-4 bg-primary hover:bg-primary-600 text-white font-medium text-center rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-elevated"
              >
                Sign In Again
              </a>

              <p className="text-center text-sm text-text-tertiary">
                All your work has been saved
              </p>
            </div>

            {/* Security Tips */}
            <div className="pt-4 border-t border-border-default">
              <p className="text-xs font-medium text-text-primary mb-2">{t('auth.securityTips')}</p>
              <ul className="text-xs text-text-tertiary space-y-1">
                <li>• {t('auth.tipRegular')}</li>
                <li>• {t('auth.tipPassword')}</li>
                <li>• {t('auth.tipActivity')}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-text-tertiary">
            Need help?{' '}
            <a
              href="/support"
              className="text-primary hover:text-primary-600 transition-colors"
            >
              Contact IT Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
