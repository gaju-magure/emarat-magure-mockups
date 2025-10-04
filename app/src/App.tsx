import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
import { TwoFactorPage } from './pages/auth/TwoFactorPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage';
import { SessionExpiredPage } from './pages/auth/SessionExpiredPage';
import { AccountLockedPage } from './pages/auth/AccountLockedPage';

// Protected Pages
import { DashboardPage } from './pages/DashboardPage';
import { MenuPage } from './pages/MenuPage';
import { InsightsPage } from './pages/features/InsightsPage';
import { HelpdeskPage } from './pages/features/HelpdeskPage';
import { AttendancePage } from './pages/features/AttendancePage';
import { MagVisionPage } from './pages/features/MagVisionPage';
import { ReconciliationPage } from './pages/features/ReconciliationPage';
import { HiringPage } from './pages/features/HiringPage';
import { VendorsPage } from './pages/features/VendorsPage';
import { ForecastingPage } from './pages/features/ForecastingPage';
import { CompliancePage } from './pages/features/CompliancePage';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/2fa" element={<TwoFactorPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/session-expired" element={<SessionExpiredPage />} />
              <Route path="/account-locked" element={<AccountLockedPage />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/menu"
                element={
                  <ProtectedRoute>
                    <MenuPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/insights"
                element={
                  <ProtectedRoute>
                    <InsightsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/helpdesk"
                element={
                  <ProtectedRoute>
                    <HelpdeskPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/attendance"
                element={
                  <ProtectedRoute>
                    <AttendancePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/magvision/*"
                element={
                  <ProtectedRoute>
                    <MagVisionPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reconciliation"
                element={
                  <ProtectedRoute>
                    <ReconciliationPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/hiring"
                element={
                  <ProtectedRoute>
                    <HiringPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/vendors"
                element={
                  <ProtectedRoute>
                    <VendorsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/forecasting"
                element={
                  <ProtectedRoute>
                    <ForecastingPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/compliance"
                element={
                  <ProtectedRoute>
                    <CompliancePage />
                  </ProtectedRoute>
                }
              />

              {/* Default redirect */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
