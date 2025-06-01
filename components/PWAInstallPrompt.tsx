// src/components/pwa/PWAInstallPrompt.tsx
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import {
  InstallMobile as InstallIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      
      // Save the event so it can be triggered later
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show custom install dialog after a delay
      setTimeout(() => {
        setShowDialog(true);
      }, 2000);
    };

    const handleAppInstalled = () => {
      console.log('PWA was installed');
      setDeferredPrompt(null);
      setShowDialog(false);
      
      // Track installation in analytics
      if (window.gtag) {
        window.gtag('event', 'pwa_installed', {
          event_category: 'PWA',
        });
      }
    };

    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    // Listen for the appinstalled event
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    // Track user choice in analytics
    if (window.gtag) {
      window.gtag('event', 'pwa_install_prompt_response', {
        event_category: 'PWA',
        event_label: outcome,
      });
    }

    console.log(`User response to the install prompt: ${outcome}`);

    // Reset the deferredPrompt
    setDeferredPrompt(null);
    setShowDialog(false);
  };

  const handleDismiss = () => {
    setShowDialog(false);
    
    // Track dismissal in analytics
    if (window.gtag) {
      window.gtag('event', 'pwa_install_prompt_dismissed', {
        event_category: 'PWA',
      });
    }

    // Show again after some time if user dismisses
    setTimeout(() => {
      if (deferredPrompt) {
        setShowDialog(true);
      }
    }, 24 * 60 * 60 * 1000); // 24 hours
  };

  if (!deferredPrompt || !showDialog) {
    return null;
  }

  return (
    <Dialog
      open={showDialog}
      onClose={handleDismiss}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pb: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <InstallIcon />
          <Typography variant="h6" component="span">
            Install DocFlow
          </Typography>
        </Box>
        <IconButton
          onClick={handleDismiss}
          sx={{ color: 'white' }}
          size="small"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Install DocFlow for a better experience:
        </Typography>
        
        <Box component="ul" sx={{ pl: 2, mb: 0 }}>
          <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
            🚀 Faster loading times
          </Typography>
          <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
            📱 Works offline
          </Typography>
          <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
            🔔 Push notifications
          </Typography>
          <Typography component="li" variant="body2">
            📋 Access from home screen
          </Typography>
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={handleDismiss}
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
          Not Now
        </Button>
        <Button
          onClick={handleInstall}
          variant="contained"
          sx={{
            backgroundColor: 'white',
            color: 'primary.main',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
            },
          }}
        >
          Install
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PWAInstallPrompt;