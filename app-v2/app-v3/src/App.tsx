/**
 * Main App Component
 * Demo showing theme and language toggles working
 */

import { ThemeToggle } from '@/shared/components/ThemeToggle';
import { LanguageToggle } from '@/shared/components/LanguageToggle';
import { useLanguage } from '@/core/hooks/useLanguage';
import { useTheme } from '@/core/hooks/useTheme';
import brandConfig from '@/config/brand.config';

export default function App() {
  const { t, language } = useLanguage();
  const { mode } = useTheme();

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Header with toggles */}
      <header className="border-b border-border bg-background-elevated">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src={brandConfig.logo}
              alt={brandConfig.name}
              className="h-10 w-auto"
            />
            <h1 className="text-xl font-semibold text-text-primary">
              {brandConfig.name === 'emarat' ? 'Emarat AI' : brandConfig.name}
            </h1>
          </div>

          {/* Theme & Language Toggles */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>
      </header>

      {/* Main Content - Demo */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Welcome Card */}
          <div className="card">
            <h2 className="text-2xl font-semibold text-text-primary mb-2">
              {t('nav.home')} - App V3
            </h2>
            <p className="text-text-secondary">
              Mobile-first, theme-injectable, language-injectable rebuild
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

          {/* Navigation Preview Card */}
          <div className="card">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Navigation Preview
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {['nav.insights', 'nav.home', 'nav.apps', 'nav.tasks', 'nav.governance'].map((key) => (
                <button
                  key={key}
                  className="
                    px-4 py-2 rounded-md
                    bg-primary text-white
                    hover:bg-primary-600
                    transition-colors
                    text-sm font-medium
                  "
                >
                  {t(key)}
                </button>
              ))}
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
      </main>
    </div>
  );
}
