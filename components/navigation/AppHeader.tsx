import { AppBar, Toolbar, IconButton, Avatar } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function AppHeader() {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <div>DocFlow</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
        </div>
      </Toolbar>
    </AppBar>
  );
}