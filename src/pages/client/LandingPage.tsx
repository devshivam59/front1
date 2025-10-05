import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import SecurityIcon from '@mui/icons-material/Security';
import TimelineIcon from '@mui/icons-material/Timeline';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', py: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
              Trade smarter with SkyTrade
            </Typography>
            <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.6)', mb: 4 }}>
              Institutional-grade trading, risk analytics, and seamless execution in a single, modern interface.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button size="large" variant="contained" onClick={() => navigate('/login')}>
                Launch Trading Terminal
              </Button>
              <Button size="large" variant="outlined" color="secondary" onClick={() => navigate('/register')}>
                Create Account
              </Button>
            </Box>
            <Box sx={{ mt: 6, display: 'grid', gap: 3, gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
              {[{ icon: <ShowChartIcon />, title: 'Advanced Charts', desc: 'Real-time quotes and charting with 25+ indicators.' },
                { icon: <SecurityIcon />, title: 'Secure Access', desc: 'Bank-grade security with granular admin controls.' },
                { icon: <TimelineIcon />, title: 'Live P&L', desc: 'Live portfolio and risk monitoring with alerts.' }].map((feature) => (
                <Box key={feature.title} sx={{ p: 3, borderRadius: 3, background: 'rgba(17,24,39,0.8)', border: '1px solid rgba(56,182,255,0.2)' }}>
                  <Box sx={{ color: 'primary.main', mb: 1 }}>{feature.icon}</Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                    {feature.desc}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                borderRadius: 4,
                p: 4,
                background: 'linear-gradient(160deg, rgba(56,182,255,0.18), rgba(100,255,218,0.08))',
                border: '1px solid rgba(56,182,255,0.3)',
                boxShadow: '0 30px 80px rgba(2,6,23,0.55)',
                position: 'relative'
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                Live performance snapshot
              </Typography>
              <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
                {[{ label: 'Equity', value: '₹12,45,000', change: '+4.5%' }, { label: 'Day P&L', value: '+₹23,400', change: '+2.1%' }, { label: 'Margin Available', value: '₹6,80,000', change: '72%' }, { label: 'Open Positions', value: '12', change: '5 Long / 7 Short' }].map(
                  (stat) => (
                    <Box key={stat.label} sx={{ background: 'rgba(11,17,29,0.85)', borderRadius: 3, p: 3, border: '1px solid rgba(100,255,218,0.2)' }}>
                      <Typography variant="caption" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                        {stat.label}
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700, mt: 1 }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'secondary.light' }}>
                        {stat.change}
                      </Typography>
                    </Box>
                  )
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingPage;
