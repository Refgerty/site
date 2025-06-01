// src/pages/DashboardPage.tsx
import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  LinearProgress,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import {
  Description as DocumentIcon,
  Assignment as WorkflowIcon,
  People as UsersIcon,
  TrendingUp as TrendingUpIcon,
  CloudUpload as UploadIcon,
  Pending as PendingIcon,
  CheckCircle as CompletedIcon,
  MoreVert as MoreIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

interface DashboardStats {
  totalDocuments: number;
  activeWorkflows: number;
  totalUsers: number;
  monthlyGrowth: number;
}

interface RecentActivity {
  id: string;
  type: 'upload' | 'workflow' | 'approval';
  title: string;
  user: string;
  timestamp: string;
  status: 'pending' | 'completed';
}

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  // Mock data - replace with real API calls
  const stats: DashboardStats = {
    totalDocuments: 1247,
    activeWorkflows: 23,
    totalUsers: 89,
    monthlyGrowth: 12.5,
  };

  const recentActivities: RecentActivity[] = [
    {
      id: '1',
      type: 'upload',
      title: 'Project_Proposal_2025.pdf',
      user: 'John Doe',
      timestamp: '2 hours ago',
      status: 'completed',
    },
    {
      id: '2',
      type: 'workflow',
      title: 'Document Review Process',
      user: 'Jane Smith',
      timestamp: '4 hours ago',
      status: 'pending',
    },
    {
      id: '3',
      type: 'approval',
      title: 'Budget Approval',
      user: 'Mike Johnson',
      timestamp: '6 hours ago',
      status: 'completed',
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'upload':
        return <UploadIcon />;
      case 'workflow':
        return <WorkflowIcon />;
      case 'approval':
        return <PendingIcon />;
      default:
        return <DocumentIcon />;
    }
  };

  const getStatusChip = (status: string) => {
    return (
      <Chip
        label={status}
        size="small"
        color={status === 'completed' ? 'success' : 'warning'}
        icon={status === 'completed' ? <CompletedIcon /> : <PendingIcon />}
      />
    );
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome back, {user?.name || 'User'}! 👋
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's what's happening with your documents today.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <DocumentIcon />
                </Avatar>
                <Box>
                  <Typography variant="h5" component="div">
                    {stats.totalDocuments.toLocaleString()}
                  </Typography>
                  <Typography color="text.secondary">
                    Total Documents
                  </Typography>
                </Box>
              </Box>
              <LinearProgress
                variant="determinate"
                value={75}
                sx={{ mt: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar sx={{ bgcolor: 'warning.main', mr: 2 }}>
                  <WorkflowIcon />
                </Avatar>
                <Box>
                  <Typography variant="h5" component="div">
                    {stats.activeWorkflows}
                  </Typography>
                  <Typography color="text.secondary">
                    Active Workflows
                  </Typography>
                </Box>
              </Box>
              <LinearProgress
                variant="determinate"
                value={60}
                color="warning"
                sx={{ mt: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar sx={{ bgcolor: 'success.main', mr: 2 }}>
                  <UsersIcon />
                </Avatar>
                <Box>
                  <Typography variant="h5" component="div">
                    {stats.totalUsers}
                  </Typography>
                  <Typography color="text.secondary">
                    Team Members
                  </Typography>
                </Box>
              </Box>
              <LinearProgress
                variant="determinate"
                value={90}
                color="success"
                sx={{ mt: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar sx={{ bgcolor: 'info.main', mr: 2 }}>
                  <TrendingUpIcon />
                </Avatar>
                <Box>
                  <Typography variant="h5" component="div">
                    +{stats.monthlyGrowth}%
                  </Typography>
                  <Typography color="text.secondary">
                    Monthly Growth
                  </Typography>
                </Box>
              </Box>
              <LinearProgress
                variant="determinate"
                value={stats.monthlyGrowth * 4}
                color="info"
                sx={{ mt: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Activity */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <List>
              {recentActivities.map((activity) => (
                <ListItem key={activity.id} divider>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'grey.100', color: 'text.primary' }}>
                      {getActivityIcon(activity.type)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={activity.title}
                    secondary={`${activity.user} • ${activity.timestamp}`}
                  />
                  <ListItemSecondaryAction>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {getStatusChip(activity.status)}
                      <IconButton edge="end">
                        <MoreIcon />
                      </IconButton>
                    </Box>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Button variant="outlined">
                View All Activity
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Card variant="outlined">
                <CardContent sx={{ pb: 1 }}>
                  <Typography variant="h6" component="div">
                    Upload Documents
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Add new documents to the system
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" variant="contained" startIcon={<UploadIcon />}>
                    Upload
                  </Button>
                </CardActions>
              </Card>

              <Card variant="outlined">
                <CardContent sx={{ pb: 1 }}>
                  <Typography variant="h6" component="div">
                    Create Workflow
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Set up automated processes
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" variant="contained" startIcon={<WorkflowIcon />}>
                    Create
                  </Button>
                </CardActions>
              </Card>

              <Card variant="outlined">
                <CardContent sx={{ pb: 1 }}>
                  <Typography variant="h6" component="div">
                    Manage Users
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Add or edit team members
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" variant="outlined" startIcon={<UsersIcon />}>
                    Manage
                  </Button>
                </CardActions>
              </Card>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;