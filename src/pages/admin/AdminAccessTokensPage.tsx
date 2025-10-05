import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography
} from '@mui/material';

const AdminAccessTokensPage = () => {
  const [description, setDescription] = useState('');
  const [token, setToken] = useState<string>('');

  const handleGenerate = () => {
    const generated = crypto.randomUUID();
    setToken(generated);
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Access tokens
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)' }}>
          Generate scoped tokens for integrations, APIs, and automation clients.
        </Typography>
      </Box>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Description"
                placeholder="OMS integration"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Token" value={token} fullWidth InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={handleGenerate}>
                Generate new token
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default AdminAccessTokensPage;
