import { Box } from '@mui/material';
import AppHeader from '@/components/navigation/AppHeader';
import AppSidebar from '@/components/navigation/AppSidebar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppHeader />
      <AppSidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {children}
      </Box>
    </Box>
  );
}