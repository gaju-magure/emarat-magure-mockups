import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordPage() {
  const { requestPasswordReset, isLoading } = useAuth();
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setError('');
      await requestPasswordReset(data.email);
      setSubmitted(true);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-secondary px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Success State */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-success rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                </svg>
              </div>
            </div>
            <h2 className="text-3xl font-semibold text-text-primary">
              {t('auth.resetLinkSent')}
            </h2>
            <p className="mt-2 text-text-secondary">
              {t('auth.checkEmail')}
            </p>
            <p className="mt-1 font-medium text-text-primary">
              {getValues('email')}
            </p>
          </div>

          <div className="bg-background-elevated rounded-lg shadow-sm border border-border-default p-8">
            <div className="space-y-6">
              <div className="bg-info-bg border-l-4 border-info-border rounded p-4">
                <p className="text-sm text-info-text">
                  Click the link in the email to reset your password. The link will expire in 1 hour.
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href="/login"
                  className="block w-full py-3 px-4 bg-primary hover:bg-primary-600 text-white font-medium text-center rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-elevated"
                >
                  {t('auth.backToLogin')}
                </a>

                <button
                  onClick={() => setSubmitted(false)}
                  className="block w-full text-sm text-primary hover:text-primary-600 transition-colors"
                >
                  Didn't receive the email? Try again
                </button>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-text-tertiary">
              Check your spam folder or{' '}
              <a
                href="/support"
                className="text-primary hover:text-primary-600 transition-colors"
              >
                contact support
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-secondary px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo and Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-semibold text-text-primary">
            {t('auth.forgotPasswordTitle')}
          </h2>
          <p className="mt-2 text-text-secondary">
            {t('auth.forgotPasswordSubtitle')}
          </p>
        </div>

        {/* Form */}
        <div className="bg-background-elevated rounded-lg shadow-sm border border-border-default p-8">
          {error && (
            <div className="mb-6 p-4 bg-danger-bg border-l-4 border-danger-border rounded">
              <p className="text-sm text-danger-text">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                {t('auth.email')}
              </label>
              <input
                {...register('email')}
                type="email"
                id="email"
                placeholder="you@emarat.ae"
                className="w-full px-4 py-3 bg-background-secondary border border-border-default rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-danger-text">{errors.email.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-primary hover:bg-primary-600 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-elevated disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('auth.sendResetLink')}
            </button>

            <div className="text-center">
              <a
                href="/login"
                className="text-sm text-primary hover:text-primary-600 transition-colors inline-flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                {t('auth.backToLogin')}
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
