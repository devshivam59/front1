import { Box, Button, Divider, Typography } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Insights';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import StorageIcon from '@mui/icons-material/Storage';
import SecurityIcon from '@mui/icons-material/Security';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SidebarNav from '../components/SidebarNav';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { icon: <PeopleAltIcon />, label: 'Users', path: '/admin' },
  { icon: <StorageIcon />, label: 'Instruments', path: '/admin/instruments' },
  { icon: <AccountBalanceWalletIcon />, label: 'Wallet Ops', path: '/admin/wallet' },
  { icon: <DashboardIcon />, label: 'System', path: '/admin/system' },
  { icon: <SecurityIcon />, label: 'Access Tokens', path: '/admin/access-tokens' }
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Box
        component="aside"
        sx={{
          width: 280,
          px: 3,
          py: 4,
          borderRight: '1px solid rgba(56,182,255,0.2)',
          background: 'rgba(6,8,14,0.95)',
          backdropFilter: 'blur(18px)',
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column'
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 4 }}>
          SkyTrade Admin
        </Typography>
        <SidebarNav items={navItems} basePath="/admin" />
        <Box sx={{ flexGrow: 1 }} />
        <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.08)' }} />
        <Button variant="outlined" color="secondary" fullWidth sx={{ mb: 1 }} onClick={() => navigate('/app')}>
          Back to client
        </Button>
        <Button variant="contained" color="primary" fullWidth onClick={logout}>
          Log out
        </Button>
      </Box>
      <Box component="main" sx={{ flex: 1, p: { xs: 2, md: 4 } }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
