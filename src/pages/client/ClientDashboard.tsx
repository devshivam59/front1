import { useEffect, useMemo, useState } from 'react';
import { Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { ResponsiveContainer, LineChart, Line, Tooltip, CartesianGrid, XAxis, YAxis, Area, AreaChart } from 'recharts';
import StatCard from '../../components/StatCard';
import { getDailyPnl } from '../../api/portfolio';
import { getWallet } from '../../api/wallet';
import { getOrders } from '../../api/orders';
import type { Order, WalletSummary } from '../../types';

const ClientDashboard = () => {
  const [pnl, setPnl] = useState<{ date: string; realized: number }[]>([]);
  const [wallet, setWallet] = useState<WalletSummary | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    getDailyPnl()
      .then(setPnl)
      .catch((error) => console.error('Failed to load pnl', error));
    getWallet()
      .then(setWallet)
      .catch((error) => console.error('Failed to load wallet', error));
    getOrders()
      .then(setOrders)
      .catch((error) => console.error('Failed to load orders', error));
  }, []);

  const latestPnL = useMemo(() => (pnl.length ? pnl[pnl.length - 1].realized : 0), [pnl]);

  return (
    <Stack spacing={4}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Trading overview
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)' }}>
          Monitor performance, risk, and execution metrics in real-time.
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <StatCard title="Account Equity" value={`₹${(wallet?.balance ?? 0).toLocaleString()}`} change="Today +₹12,400" icon={<TrendingUpIcon />} />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard title="Available Margin" value={`₹${(wallet?.margin ?? 0).toLocaleString()}`} change="74% utilised" icon={<AccountBalanceWalletIcon />} />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard title="Open Orders" value={orders.length} change="Pending executions" icon={<ShowChartIcon />} />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard title="Realized P&L" value={`₹${latestPnL.toLocaleString()}`} change="Last sync" icon={<AssessmentIcon />} />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Daily Realized P&L
              </Typography>
              <Box sx={{ height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={pnl}>
                    <defs>
                      <linearGradient id="colorPnl" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#38b6ff" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#38b6ff" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" />
                    <XAxis dataKey="date" stroke="rgba(255,255,255,0.54)" />
                    <YAxis stroke="rgba(255,255,255,0.54)" />
                    <Tooltip contentStyle={{ backgroundColor: '#111827', borderRadius: 12 }} />
                    <Area type="monotone" dataKey="realized" stroke="#38b6ff" fillOpacity={1} fill="url(#colorPnl)" />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Execution velocity
              </Typography>
              <Box sx={{ height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={orders.slice(0, 10)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" />
                    <XAxis dataKey="createdAt" hide />
                    <YAxis hide />
                    <Tooltip contentStyle={{ backgroundColor: '#111827', borderRadius: 12 }} labelFormatter={() => 'Order'} />
                    <Line type="monotone" dataKey="qty" stroke="#64ffda" strokeWidth={3} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default ClientDashboard;
