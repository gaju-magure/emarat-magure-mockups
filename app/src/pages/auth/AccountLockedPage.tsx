export function AccountLockedPage() {
  const handleContactSupport = () => {
    // TODO: Open support ticket or redirect to support
    console.log('Opening support ticket...');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-secondary px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Icon and Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-danger rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-semibold text-text-primary">
            Account Locked
          </h2>
          <p className="mt-2 text-text-secondary">
            Your account has been temporarily locked
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-background-elevated rounded-lg shadow-sm border border-border-default p-8">
          <div className="space-y-6">
            {/* Warning Message */}
            <div className="bg-danger-bg border-l-4 border-danger-border rounded p-4">
              <p className="text-sm text-danger-text font-medium mb-2">
                Security Alert
              </p>
              <p className="text-sm text-danger-text">
                Your account has been locked due to multiple failed login attempts.
                This is a security measure to protect your account.
              </p>
            </div>

            {/* What Happened */}
            <div>
              <h3 className="text-sm font-medium text-text-primary mb-2">
                What happened?
              </h3>
              <p className="text-sm text-text-secondary">
                We detected 5 consecutive failed login attempts from your account.
                As a security precaution, we've temporarily locked your account for 30 minutes.
              </p>
            </div>

            {/* What to Do */}
            <div>
              <h3 className="text-sm font-medium text-text-primary mb-2">
                What should I do?
              </h3>
              <ul className="text-sm text-text-secondary space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">1.</span>
                  <span>Wait 30 minutes and try logging in again</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">2.</span>
                  <span>Use "Forgot Password" to reset your password</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">3.</span>
                  <span>Contact IT Support if you didn't attempt these logins</span>
                </li>
              </ul>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-border-default">
              <button
                onClick={handleContactSupport}
                className="w-full py-3 px-4 bg-primary hover:bg-primary-600 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-elevated"
              >
                Contact IT Support
              </button>

              <a
                href="/forgot-password"
                className="block w-full py-3 px-4 bg-background-secondary hover:bg-background-tertiary text-text-primary font-medium text-center border border-border-default rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-elevated"
              >
                Reset Password
              </a>

              <a
                href="/login"
                className="block text-center text-sm text-primary hover:text-primary-600 transition-colors"
              >
                Back to Sign In
              </a>
            </div>

            {/* Security Info */}
            <div className="bg-info-bg border-l-4 border-info-border rounded p-4">
              <p className="text-xs text-info-text">
                <strong>Security Tip:</strong> Enable two-factor authentication (2FA) for additional account protection.
              </p>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="text-center">
          <p className="text-sm text-text-tertiary mb-1">
            Urgent assistance needed?
          </p>
          <a
            href="tel:+97180063627"
            className="text-sm font-medium text-primary hover:text-primary-600 transition-colors"
          >
            Call IT Support: +971 800 63627
          </a>
        </div>
      </div>
    </div>
  );
}
