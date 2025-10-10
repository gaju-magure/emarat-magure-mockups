/**
 * App Component - Main Application Entry Point
 *
 * Sets up routing and provides application context
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ClientProvider } from '@/contexts/ClientContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { MainLayout } from '@/components/layout/MainLayout';
import { LeftSidebar } from '@/components/layout/LeftSidebar';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';

// Pages
import { JarvisHomePage } from '@/pages/JarvisHomePage';
import { AppsPage } from '@/pages/AppsPage';

// 404 Page
function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <div className="space-y-4">
        <h1 className="text-6xl font-bold text-text-primary">404</h1>
        <h2 className="text-2xl font-semibold text-text-secondary">Page Not Found</h2>
        <p className="text-text-tertiary max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a
          href="/"
          className="inline-block mt-6 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}

// Placeholder pages for routes that don't exist yet
function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-text-primary">{title}</h1>
        <p className="text-text-tertiary max-w-md">
          This page is under construction and will be available soon.
        </p>
        <a
          href="/"
          className="inline-block mt-6 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}

function App() {
  return (
    <ClientProvider>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                {/* Main App Routes - with layout */}
                <Route
                  path="/*"
                  element={
                    <MainLayout
                      leftSidebar={<LeftSidebar />}
                      bottomNav={<MobileBottomNav />}
                    >
                      <Routes>
                        {/* Jarvis Home */}
                        <Route path="/" element={<JarvisHomePage />} />

                        {/* Apps */}
                        <Route path="/apps" element={<AppsPage />} />
                        <Route path="/apps/rfp" element={<PlaceholderPage title="RFP Evaluation" />} />
                        <Route path="/apps/rfp/:id" element={<PlaceholderPage title="RFP Details" />} />
                        <Route path="/apps/tasks" element={<PlaceholderPage title="Task Dashboard" />} />
                        <Route path="/apps/analytics" element={<PlaceholderPage title="Analytics" />} />
                        <Route path="/apps/governance" element={<PlaceholderPage title="Governance & Compliance" />} />
                        <Route path="/apps/contracts" element={<PlaceholderPage title="Contract Management" />} />
                        <Route path="/apps/budget" element={<PlaceholderPage title="Budget Planning" />} />
                        <Route path="/apps/vendors" element={<PlaceholderPage title="Vendor Management" />} />

                        {/* Settings */}
                        <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
                        <Route path="/settings/profile" element={<PlaceholderPage title="Profile Settings" />} />
                        <Route path="/settings/preferences" element={<PlaceholderPage title="Preferences" />} />

                        {/* Profile */}
                        <Route path="/profile" element={<PlaceholderPage title="Profile" />} />

                        {/* 404 */}
                        <Route path="*" element={<NotFoundPage />} />
                      </Routes>
                    </MainLayout>
                  }
                />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ClientProvider>
  );
}

export default App;
