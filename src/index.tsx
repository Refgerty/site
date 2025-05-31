import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Web Vitals for performance monitoring
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

// Report Web Vitals
function reportWebVitals(onPerfEntry?: (metric: any) => void) {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    getCLS(onPerfEntry);
    getFID(onPerfEntry);
    getFCP(onPerfEntry);
    getLCP(onPerfEntry);
    getTTFB(onPerfEntry);
  }
}

// Send performance metrics to Google Analytics
function sendToAnalytics(metric: any) {
  // Google Analytics 4 event
  if (window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }
}

// Get the root element
const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element not found');
}

// Create React root
const root = createRoot(container);

// Service Worker registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const installingWorker = registration.installing;
          if (installingWorker) {
            installingWorker.addEventListener('statechange', () => {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  // New content is available, prompt user to refresh
                  window.dispatchEvent(new Event('sw-update-available'));
                } else {
                  // Content is cached for offline use
                  console.log('Content is cached for offline use.');
                }
              }
            });
          }
        });
      })
      .catch((error) => {
        console.log('SW registration failed: ', error);
      });
  });
}

// PWA Install Event
let deferredPrompt: any;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = e;
  
  // Dispatch custom event to show install prompt
  window.dispatchEvent(new Event('pwa-install-available'));
});

// Handle PWA install
window.addEventListener('pwa-install-prompt', async () => {
  if (deferredPrompt) {
    // Show the prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    // Track the user's response
    if (window.gtag) {
      window.gtag('event', 'pwa_install_prompt', {
        event_category: 'PWA',
        event_label: outcome,
      });
    }
    
    console.log(`User response to the install prompt: ${outcome}`);
    
    // Clear the deferredPrompt
    deferredPrompt = null;
  }
});

// Track PWA installation
window.addEventListener('appinstalled', () => {
  console.log('PWA was installed');
  
  if (window.gtag) {
    window.gtag('event', 'pwa_installed', {
      event_category: 'PWA',
    });
  }
});

// Handle network status changes
window.addEventListener('online', () => {
  console.log('Back online');
  window.dispatchEvent(new Event('network-online'));
});

window.addEventListener('offline', () => {
  console.log('Gone offline');
  window.dispatchEvent(new Event('network-offline'));
});

// Global error handling
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  
  // Track JavaScript errors in Google Analytics
  if (window.gtag) {
    window.gtag('event', 'exception', {
      description: event.error?.stack || event.error?.message || 'Unknown error',
      fatal: false,
    });
  }
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  
  // Track promise rejections in Google Analytics
  if (window.gtag) {
    window.gtag('event', 'exception', {
      description: event.reason?.stack || event.reason?.message || 'Unhandled promise rejection',
      fatal: false,
    });
  }
});

// Track page visibility for analytics
document.addEventListener('visibilitychange', () => {
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      visibility_state: document.visibilityState,
    });
  }
});

// Initialize the application
function initializeApp() {
  // Remove loading screen
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    loadingScreen.style.opacity = '0';
    loadingScreen.style.transition = 'opacity 0.3s ease';
    setTimeout(() => {
      loadingScreen.remove();
    }, 300);
  }

  // Show the fallback content for JavaScript disabled users
  document.body.classList.remove('no-js');

  // Render the React app
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Check if DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

// Report Web Vitals
reportWebVitals(sendToAnalytics);

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export default App;