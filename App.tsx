import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';

// Theme
import theme from './theme';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import DashboardPage from './pages/DashboardPage';
import DocumentsPage from './pages/DocumentsPage';
import WorkflowsPage from './pages/WorkflowsPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';

// Context Providers
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';

// Components
import ProtectedRoute from './components/auth/ProtectedRoute';
import PWAInstallPrompt from './components/pwa/PWAInstallPrompt';
import ServiceWorkerUpdatePrompt from './components/pwa/ServiceWorkerUpdatePrompt';

// Error Boundary
import ErrorBoundary from './components/common/ErrorBoundary';

// Create a query client instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors except 408, 429
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          if (error.response.status === 408 || error.response.status === 429) {
            return failureCount < 2;
          }
          return false;
        }
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
              <NotificationProvider>
                <Router>
                  <div className="App">
                    <Routes>
                      {/* Public Routes */}
                      <Route element={<AuthLayout />}>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                      </Route>

                      {/* Protected Routes */}
                      <Route element={<ProtectedRoute />}>
                        <Route element={<MainLayout />}>
                          <Route path="/" element={<Navigate to="/dashboard" replace />} />
                          <Route path="/dashboard" element={<DashboardPage />} />
                          <Route path="/documents" element={<DocumentsPage />} />
                          <Route path="/documents/:id" element={<DocumentsPage />} />
                          <Route path="/workflows" element={<WorkflowsPage />} />
                          <Route path="/workflows/:id" element={<WorkflowsPage />} />
                          <Route path="/settings" element={<SettingsPage />} />
                          <Route path="/profile" element={<ProfilePage />} />
                        </Route>
                      </Route>

                      {/* 404 Route */}
                      <Route path="*" element={<NotFoundPage />} />
                    </Routes>

                    {/* PWA Components */}
                    <PWAInstallPrompt />
                    <ServiceWorkerUpdatePrompt />

                    {/* Toast Notifications */}
                    <Toaster
                      position="top-right"
                      toastOptions={{
                        duration: 4000,
                        style: {
                          background: '#363636',
                          color: '#fff',
                        },
                        success: {
                          duration: 3000,
                          style: {
                            background: '#4caf50',
                          },
                        },
                        error: {
                          duration: 5000,
                          style: {
                            background: '#f44336',
                          },
                        },
                      }}
                    />
                  </div>
                </Router>
              </NotificationProvider>
            </AuthProvider>
          </ThemeProvider>
          
          {/* React Query DevTools (only in development) */}
          {process.env.NODE_ENV === 'development' && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;