/**
 * Main App Component
 * Uses responsive layout with header and navigation
 */

import { Layout } from '@/shared/layouts/Layout';
import { useLanguage } from '@/core/hooks/useLanguage';
import { useTheme } from '@/core/hooks/useTheme';
import brandConfig from '@/config/brand.config';

export default function App() {
  const { t, language } = useLanguage();
  const { mode } = useTheme();

  return (
    <Layout defaultView="home">
      {/* Demo Content - Will be replaced with actual screens in Phase 3 */}
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Welcome Card */}
        <div className="card">
          <h2 className="text-2xl font-semibold text-text-primary mb-2">
            {t('nav.home')} - Phase 2 Complete
          </h2>
          <p className="text-text-secondary">
            Responsive layout with header and navigation working
          </p>
        </div>

        {/* Status Card */}
        <div className="card space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">
            Current Settings
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-background-secondary rounded-md border border-border">
              <div className="text-sm text-text-tertiary mb-1">Theme Mode</div>
              <div className="text-lg font-medium text-text-primary capitalize">
                {mode}
              </div>
            </div>

            <div className="p-4 bg-background-secondary rounded-md border border-border">
              <div className="text-sm text-text-tertiary mb-1">Language</div>
              <div className="text-lg font-medium text-text-primary uppercase">
                {language} ({language === 'en' ? 'English' : 'العربية'})
              </div>
            </div>

            <div className="p-4 bg-background-secondary rounded-md border border-border">
              <div className="text-sm text-text-tertiary mb-1">Client</div>
              <div className="text-lg font-medium text-text-primary capitalize">
                {brandConfig.name}
              </div>
            </div>

            <div className="p-4 bg-background-secondary rounded-md border border-border">
              <div className="text-sm text-text-tertiary mb-1">Primary Color</div>
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded border border-border"
                  style={{ backgroundColor: brandConfig.colors.primary }}
                />
                <span className="text-sm font-mono text-text-primary">
                  {brandConfig.colors.primary}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Semantic Colors Demo */}
        <div className="card">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Semantic Colors
          </h3>
          <div className="space-y-2">
            <div className="p-3 bg-success-bg border border-success-border rounded-md">
              <span className="text-success-text font-medium">Success State</span>
            </div>
            <div className="p-3 bg-warning-bg border border-warning-border rounded-md">
              <span className="text-warning-text font-medium">Warning State</span>
            </div>
            <div className="p-3 bg-danger-bg border border-danger-border rounded-md">
              <span className="text-danger-text font-medium">Danger State</span>
            </div>
            <div className="p-3 bg-info-bg border border-info-border rounded-md">
              <span className="text-info-text font-medium">Info State</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
