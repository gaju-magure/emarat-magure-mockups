import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../contexts/AuthContext';
import { ThemeToggle } from '../../components/molecules/ThemeToggle';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginPage() {
  const navigate = useNavigate();
  const { login, loginWithSSO, isLoading } = useAuth();
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const fillDemoCredentials = (email: string) => {
    setValue('email', email);
    setValue('password', 'demo123');
  };

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError('');
      await login(data.email);
      // Navigate to dashboard after successful login
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    }
  };

  const handleSSOLogin = async (provider: 'microsoft' | 'google') => {
    try {
      setError('');
      await loginWithSSO(provider);
      // Navigate to dashboard after successful SSO login
      navigate('/dashboard');
    } catch (err) {
      setError(`SSO login with ${provider} failed. Please try again.`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-secondary px-4 sm:px-6 lg:px-8">
      {/* Theme Toggle - Top Right */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div className="flex justify-center mb-8 mt-4">
            <img
              src="/emarat-logo.svg"
              alt="Emarat Logo"
              className="h-24 w-auto"
            />
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-background-elevated rounded-lg shadow-sm border border-border-default p-8">
          {error && (
            <div className="mb-6 p-4 bg-danger-bg border-l-4 border-danger-border rounded">
              <p className="text-sm text-danger-text">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                Email Address
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

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-text-primary"
                >
                  Password
                </label>
                <a
                  href="/forgot-password"
                  className="text-sm text-primary hover:text-primary-600 transition-colors"
                >
                  Forgot password?
                </a>
              </div>
              <input
                {...register('password')}
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-background-secondary border border-border-default rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              />
              {errors.password && (
                <p className="mt-2 text-sm text-danger-text">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-primary bg-background-secondary border-border-default rounded focus:ring-2 focus:ring-primary transition-colors"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-text-secondary">
                Remember me for 30 days
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-primary hover:bg-primary-600 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-elevated disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border-default"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-background-elevated text-text-tertiary">
                Or continue with
              </span>
            </div>
          </div>

          {/* SSO Options */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => handleSSOLogin('microsoft')}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-background-secondary hover:bg-background-tertiary border border-border-default rounded-lg text-text-primary font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 23 23" fill="none">
                <rect x="0" y="0" width="11" height="11" fill="#F25022" />
                <rect x="12" y="0" width="11" height="11" fill="#7FBA00" />
                <rect x="0" y="12" width="11" height="11" fill="#00A4EF" />
                <rect x="12" y="12" width="11" height="11" fill="#FFB900" />
              </svg>
              Sign in with Microsoft
            </button>

            <button
              type="button"
              onClick={() => handleSSOLogin('google')}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-background-secondary hover:bg-background-tertiary border border-border-default rounded-lg text-text-primary font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </button>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="bg-background-elevated rounded-lg shadow-sm border border-border-default p-6">
          <h3 className="text-sm font-semibold text-text-primary mb-3">
            Demo Credentials (Click to use)
          </h3>
          <div className="space-y-2 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => fillDemoCredentials('sarah@emarat.ae')}
                className="bg-background-secondary hover:bg-background-tertiary rounded p-2 transition-colors text-left border border-transparent hover:border-primary"
              >
                <p className="font-medium text-text-primary">Store Manager</p>
                <p className="text-text-tertiary">sarah@emarat.ae</p>
              </button>
              <button
                type="button"
                onClick={() => fillDemoCredentials('fatima@emarat.ae')}
                className="bg-background-secondary hover:bg-background-tertiary rounded p-2 transition-colors text-left border border-transparent hover:border-primary"
              >
                <p className="font-medium text-text-primary">HR Manager</p>
                <p className="text-text-tertiary">fatima@emarat.ae</p>
              </button>
              <button
                type="button"
                onClick={() => fillDemoCredentials('ali@emarat.ae')}
                className="bg-background-secondary hover:bg-background-tertiary rounded p-2 transition-colors text-left border border-transparent hover:border-primary"
              >
                <p className="font-medium text-text-primary">Attendant</p>
                <p className="text-text-tertiary">ali@emarat.ae</p>
              </button>
              <button
                type="button"
                onClick={() => fillDemoCredentials('rashid@emarat.ae')}
                className="bg-background-secondary hover:bg-background-tertiary rounded p-2 transition-colors text-left border border-transparent hover:border-primary"
              >
                <p className="font-medium text-text-primary">Finance Manager</p>
                <p className="text-text-tertiary">rashid@emarat.ae</p>
              </button>
              <button
                type="button"
                onClick={() => fillDemoCredentials('layla@emarat.ae')}
                className="bg-background-secondary hover:bg-background-tertiary rounded p-2 transition-colors text-left border border-transparent hover:border-primary"
              >
                <p className="font-medium text-text-primary">Retail Employee</p>
                <p className="text-text-tertiary">layla@emarat.ae</p>
              </button>
              <button
                type="button"
                onClick={() => fillDemoCredentials('mohammed@emarat.ae')}
                className="bg-background-secondary hover:bg-background-tertiary rounded p-2 transition-colors text-left border border-transparent hover:border-primary"
              >
                <p className="font-medium text-text-primary">Procurement</p>
                <p className="text-text-tertiary">mohammed@emarat.ae</p>
              </button>
            </div>
            <div className="pt-2 border-t border-border-default space-y-2">
              <p className="text-text-tertiary flex items-center gap-2">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Click any user above to auto-fill credentials
              </p>
              <p className="text-text-tertiary text-xs bg-info-bg border-l-2 border-info-border rounded px-2 py-1">
                <strong>Demo Mode:</strong> SSO buttons work as mock logins. 2FA is currently disabled in demo mode.
              </p>
            </div>
          </div>
        </div>

        {/* Demo Testing Links */}
        <div className="bg-background-elevated rounded-lg shadow-sm border border-border-default p-6">
          <h3 className="text-sm font-semibold text-text-primary mb-3">
            Demo Testing - Direct Screen Access
          </h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <a
              href="/2fa"
              className="px-3 py-2 bg-background-secondary hover:bg-background-tertiary border border-border-default rounded text-text-primary text-center transition-colors"
            >
              🔐 Test 2FA Screen
            </a>
            <a
              href="/forgot-password"
              className="px-3 py-2 bg-background-secondary hover:bg-background-tertiary border border-border-default rounded text-text-primary text-center transition-colors"
            >
              🔑 Test Forgot Password
            </a>
            <a
              href="/reset-password"
              className="px-3 py-2 bg-background-secondary hover:bg-background-tertiary border border-border-default rounded text-text-primary text-center transition-colors"
            >
              ♻️ Test Reset Password
            </a>
            <a
              href="/session-expired"
              className="px-3 py-2 bg-background-secondary hover:bg-background-tertiary border border-border-default rounded text-text-primary text-center transition-colors"
            >
              ⏰ Test Session Expired
            </a>
            <a
              href="/account-locked"
              className="px-3 py-2 bg-background-secondary hover:bg-background-tertiary border border-border-default rounded text-text-primary text-center transition-colors"
            >
              🔒 Test Account Locked
            </a>
            <a
              href="/dashboard"
              className="px-3 py-2 bg-primary hover:bg-primary-600 border border-primary rounded text-white text-center transition-colors font-medium"
            >
              📊 Dashboard
            </a>
          </div>
          <p className="text-text-tertiary text-xs mt-3 pt-3 border-t border-border-default">
            💡 These links let you test each authentication screen independently
          </p>
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
