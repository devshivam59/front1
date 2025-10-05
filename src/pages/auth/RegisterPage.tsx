import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const RegisterPage = () => {
  const { register, loading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await register({ name, email, password });
    } catch (err) {
      setError('Unable to register. Please check details and try again.');
    }
  };

  return (
    <Stack alignItems="center" justifyContent="center" sx={{ minHeight: '100vh', p: 2 }}>
      <Card sx={{ maxWidth: 600, width: '100%' }}>
        <CardContent>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            Create your SkyTrade account
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)', mb: 4 }}>
            Unlock lightning fast order execution, live portfolio analytics, and institutional tools designed for serious traders.
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {error && (
                <Grid item xs={12}>
                  <Alert severity="error">{error}</Alert>
                </Grid>
              )}
              <Grid item xs={12} md={6}>
                <TextField label="Full name" value={name} onChange={(event) => setName(event.target.value)} fullWidth required />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} fullWidth required />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" size="large" fullWidth disabled={loading}>
                  {loading ? <CircularProgress size={24} /> : 'Create account'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default RegisterPage;
