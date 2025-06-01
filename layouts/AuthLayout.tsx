// src/layouts/AuthLayout.tsx
import React, { ReactNode } from 'react';
import { 
  Box, 
  Container, 
  Paper, 
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material';

interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ 
  children, 
  title = "DocFlow", 
  subtitle = "Document Management System" 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(2),
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={24}
          sx={{
            padding: theme.spacing(4),
            borderRadius: theme.spacing(2),
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant={isMobile ? 'h4' : 'h3'}
              component="h1"
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                mb: 1,
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 3 }}
            >
              {subtitle}
            </Typography>
          </Box>

          {/* Content */}
          <Box>{children}</Box>

          {/* Footer */}
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="caption" color="text.secondary">
              © 2025 DocFlow. All rights reserved.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AuthLayout;