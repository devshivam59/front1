import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await login({ email, password });
    } catch (err) {
      setError('Unable to log in. Please check your credentials.');
    }
  };

  return (
    <Stack alignItems="center" justifyContent="center" sx={{ minHeight: '100vh', p: 2 }}>
      <Card sx={{ maxWidth: 420, width: '100%' }}>
        <CardContent>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            Welcome back
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)', mb: 4 }}>
            Sign in with your SkyTrade credentials to access your trading cockpit.
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={3}>
              {error && <Alert severity="error">{error}</Alert>}
              <TextField
                label="Email address"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                fullWidth
                required
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                fullWidth
                required
              />
              <Button type="submit" variant="contained" size="large" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Sign in'}
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default LoginPage;
