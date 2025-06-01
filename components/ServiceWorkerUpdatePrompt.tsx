// src/components/pwa/ServiceWorkerUpdatePrompt.tsx
import React, { useState, useEffect } from 'react';
import {
  Snackbar,
  Alert,
  Button,
  Box,
  Typography,
} from '@mui/material';
import { Update as UpdateIcon } from '@mui/icons-material';

const ServiceWorkerUpdatePrompt: React.FC = () => {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    const handleServiceWorkerUpdate = (event: Event) => {
      const swRegistration = (event as CustomEvent).detail;
      setRegistration(swRegistration);
      setShowUpdatePrompt(true);
    };

    const handleUpdateFound = () => {
      console.log('New content is available; please refresh.');
      setShowUpdatePrompt(true);
    };

    // Listen for custom service worker update events
    window.addEventListener('sw-update-available', handleServiceWorkerUpdate);
    window.addEventListener('sw-update-found', handleUpdateFound);

    // Check if there's already an update available
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((swRegistration) => {
        if (swRegistration.waiting) {
          setRegistration(swRegistration);
          setShowUpdatePrompt(true);
        }

        // Listen for updates
        swRegistration.addEventListener('updatefound', () => {
          const installingWorker = swRegistration.installing;
          if (installingWorker) {
            installingWorker.addEventListener('statechange', () => {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  // New content is available
                  setRegistration(swRegistration);
                  setShowUpdatePrompt(true);
                }
              }
            });
          }
        });
      });
    }

    return () => {
      window.removeEventListener('sw-update-available', handleServiceWorkerUpdate);
      window.removeEventListener('sw-update-found', handleUpdateFound);
    };
  }, []);

  const handleUpdate = () => {
    if (registration && registration.waiting) {
      // Send a message to the waiting service worker to skip waiting
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      
      // Listen for the controlling service worker to change
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        // Reload the page to load the new version
        window.location.reload();
      });
    } else {
      // Fallback: just reload the page
      window.location.reload();
    }

    setShowUpdatePrompt(false);

    // Track update in analytics
    if (window.gtag) {
      window.gtag('event', 'sw_update_accepted', {
        event_category: 'Service Worker',
      });
    }
  };

  const handleDismiss = () => {
    setShowUpdatePrompt(false);
    
    // Track dismissal in analytics
    if (window.gtag) {
      window.gtag('event', 'sw_update_dismissed', {
        event_category: 'Service Worker',
      });
    }

    // Show again after some time
    setTimeout(() => {
      setShowUpdatePrompt(true);
    }, 5 * 60 * 1000); // 5 minutes
  };

  return (
    <Snackbar
      open={showUpdatePrompt}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      onClose={handleDismiss}
      sx={{ maxWidth: 400 }}
    >
      <Alert
        severity="info"
        variant="filled"
        icon={<UpdateIcon />}
        sx={{
          alignItems: 'center',
          '& .MuiAlert-message': {
            width: '100%',
          },
        }}
        action={
          <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
            <Button
              color="inherit"
              size="small"
              onClick={handleDismiss}
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                '&:hover': {
                  color: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              Later
            </Button>
            <Button
              color="inherit"
              size="small"
              onClick={handleUpdate}
              variant="outlined"
              sx={{
                color: 'white',
                borderColor: 'rgba(255, 255, 255, 0.5)',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              Update
            </Button>
          </Box>
        }
      >
        <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
          New version available!
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.8 }}>
          Click "Update" to get the latest features and improvements.
        </Typography>
      </Alert>
    </Snackbar>
  );
};

export default ServiceWorkerUpdatePrompt;