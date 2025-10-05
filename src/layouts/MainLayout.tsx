import { Box, Button, Divider, Typography } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/SpaceDashboardRounded';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SidebarNav from '../components/SidebarNav';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { icon: <DashboardIcon />, label: 'Overview', path: '/app' },
  { icon: <ShowChartIcon />, label: 'Market', path: '/app/market' },
  { icon: <ListAltIcon />, label: 'Orders', path: '/app/orders' },
  { icon: <AssessmentIcon />, label: 'Portfolio', path: '/app/portfolio' },
  { icon: <AccountBalanceWalletIcon />, label: 'Wallet', path: '/app/wallet' },
  { icon: <PlaylistAddCheckIcon />, label: 'Watchlists', path: '/app/watchlists' }
];

const MainLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Box
        component="aside"
        sx={{
          width: 280,
          px: 3,
          py: 4,
          borderRight: '1px solid rgba(56,182,255,0.2)',
          background: 'rgba(9,13,22,0.92)',
          backdropFilter: 'blur(16px)',
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column'
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 4 }}>
          SkyTrade
        </Typography>
        <SidebarNav items={navItems} basePath="/app" />
        <Box sx={{ flexGrow: 1 }} />
        <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.08)' }} />
        <Box>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 1 }}>
            {user?.email}
          </Typography>
          {user?.roles.includes('admin') && (
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={() => navigate('/admin')}
              sx={{ mb: 1 }}
            >
              Admin Console
            </Button>
          )}
          <Button variant="contained" color="primary" fullWidth onClick={logout}>
            Log out
          </Button>
        </Box>
      </Box>
      <Box component="main" sx={{ flex: 1, p: { xs: 2, md: 4 }, maxWidth: '100%' }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
