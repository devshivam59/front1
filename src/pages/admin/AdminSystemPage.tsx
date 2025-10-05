import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Grid, LinearProgress, Stack, Typography } from '@mui/material';
import InsightsIcon from '@mui/icons-material/Insights';
import TimelineIcon from '@mui/icons-material/Timeline';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import StatCard from '../../components/StatCard';
import { getAdminOrders, getAdminTrades, getSystemStats } from '../../api/admin';

const AdminSystemPage = () => {
  const [stats, setStats] = useState<{ totalUsers: number; activeOrders: number; tradesToday: number; serverLoad: number } | null>(
    null
  );
  const [ordersCount, setOrdersCount] = useState<number>(0);
  const [tradesCount, setTradesCount] = useState<number>(0);

  useEffect(() => {
    getSystemStats()
      .then(setStats)
      .catch((error) => console.error('Failed to load stats', error));
    getAdminOrders()
      .then((data) => setOrdersCount(data.length))
      .catch((error) => console.error('Failed to load orders', error));
    getAdminTrades()
      .then((data) => setTradesCount(data.length))
      .catch((error) => console.error('Failed to load trades', error));
  }, []);

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          System telemetry
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)' }}>
          Monitor backend health, execution loads, and trading activity in real-time.
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StatCard title="Total users" value={stats?.totalUsers ?? 0} icon={<InsightsIcon />} />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard title="Active orders" value={stats?.activeOrders ?? 0} icon={<TimelineIcon />} />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard title="Trades today" value={stats?.tradesToday ?? 0} icon={<ShowChartIcon />} />
        </Grid>
      </Grid>
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Server load
          </Typography>
          <LinearProgress variant="determinate" value={stats?.serverLoad ?? 0} sx={{ height: 12, borderRadius: 6 }} />
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mt: 1 }}>
            {stats?.serverLoad ?? 0}% utilisation across trading clusters
          </Typography>
        </CardContent>
      </Card>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Orders processed
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                {ordersCount}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                Total orders processed in the system
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Trades executed
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                {tradesCount}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                Total trades executed across all venues
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default AdminSystemPage;
