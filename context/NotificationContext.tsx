// src/contexts/NotificationContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import toast from 'react-hot-toast';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface NotificationContextType {
  showNotification: (message: string, type?: NotificationType) => void;
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showWarning: (message: string) => void;
  showInfo: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const showNotification = (message: string, type: NotificationType = 'info') => {
    switch (type) {
      case 'success':
        toast.success(message, {
          duration: 4000,
          position: 'top-right',
          style: {
            background: '#10B981',
            color: '#ffffff',
          },
        });
        break;
      case 'error':
        toast.error(message, {
          duration: 6000,
          position: 'top-right',
          style: {
            background: '#EF4444',
            color: '#ffffff',
          },
        });
        break;
      case 'warning':
        toast(message, {
          duration: 5000,
          position: 'top-right',
          icon: '⚠️',
          style: {
            background: '#F59E0B',
            color: '#ffffff',
          },
        });
        break;
      case 'info':
      default:
        toast(message, {
          duration: 4000,
          position: 'top-right',
          icon: 'ℹ️',
          style: {
            background: '#3B82F6',
            color: '#ffffff',
          },
        });
        break;
    }
  };

  const showSuccess = (message: string) => showNotification(message, 'success');
  const showError = (message: string) => showNotification(message, 'error');
  const showWarning = (message: string) => showNotification(message, 'warning');
  const showInfo = (message: string) => showNotification(message, 'info');

  const value: NotificationContextType = {
    showNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export default NotificationContext;