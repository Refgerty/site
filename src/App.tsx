import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; // ИЗМЕНЕНО: BrowserRouter → HashRouter
import { ThemeProvider, CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Импорты компонентов
import theme from './theme';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import ProtectedRoute from './components/common/ProtectedRoute';

// Импорты страниц
import DashboardPage from './pages/DashboardPage';
import DocumentsPage from './pages/documents/DocumentsPage';
import WorkflowsPage from './pages/WorkflowsPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';

// Импорты контекстов
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';

// Импорт компонентов PWA
import PWAInstallPrompt from './components/pwa/PWAInstallPrompt';
import ServiceWorkerUpdatePrompt from './components/pwa/ServiceWorkerUpdatePrompt';
import ErrorBoundary from './components/common/ErrorBoundary';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000, // 5 минут
            cacheTime: 10 * 60 * 1000, // 10 минут
        },
    },
});

function App() {
    return (
        <ErrorBoundary>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <AuthProvider>
                        <NotificationProvider>
                            {/* ИЗМЕНЕНО: BrowserRouter заменен на HashRouter */}
                            <Router basename={process.env.NODE_ENV === 'production' ? '/site' : ''}>
                                <Routes>
                                    {/* Публичные маршруты */}
                                    <Route element={<AuthLayout />}>
                                        <Route path="/login" element={<LoginPage />} />
                                        <Route path="/register" element={<RegisterPage />} />
                                    </Route>

                                    {/* Защищенные маршруты */}
                                    <Route element={<ProtectedRoute />}>
                                        <Route element={<MainLayout />}>
                                            <Route path="/" element={<DashboardPage />} />
                                            <Route path="/dashboard" element={<DashboardPage />} />
                                            <Route path="/documents" element={<DocumentsPage />} />
                                            <Route path="/workflows" element={<WorkflowsPage />} />
                                            <Route path="/settings" element={<SettingsPage />} />
                                            <Route path="/profile" element={<ProfilePage />} />
                                        </Route>
                                    </Route>

                                    {/* 404 страница */}
                                    <Route path="*" element={<NotFoundPage />} />
                                </Routes>

                                {/* PWA компоненты */}
                                <PWAInstallPrompt />
                                <ServiceWorkerUpdatePrompt />
                            </Router>
                        </NotificationProvider>
                    </AuthProvider>
                </ThemeProvider>
            </QueryClientProvider>
        </ErrorBoundary>
    );
}

export default App;