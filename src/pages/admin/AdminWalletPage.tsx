import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { creditWallet, debitWallet } from '../../api/wallet';

const AdminWalletPage = () => {
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [note, setNote] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleWallet = async (action: 'credit' | 'debit') => {
    if (!userId || !amount) return;
    const payload = { user_id: userId, amount, note };
    try {
      if (action === 'credit') {
        await creditWallet(payload);
        setMessage(`Credited ₹${amount} to ${userId}`);
      } else {
        await debitWallet(payload);
        setMessage(`Debited ₹${amount} from ${userId}`);
      }
    } catch (error) {
      setMessage('Operation failed. Please verify user ID or permissions.');
    }
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Wallet operations
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)' }}>
          Credit or debit user wallets instantly with full audit trails.
        </Typography>
      </Box>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField label="User ID" value={userId} onChange={(event) => setUserId(event.target.value)} fullWidth />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Amount"
                type="number"
                value={amount}
                onChange={(event) => setAmount(Number(event.target.value))}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField label="Note" value={note} onChange={(event) => setNote(event.target.value)} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button variant="contained" color="primary" onClick={() => handleWallet('credit')}>
                  Credit
                </Button>
                <Button variant="outlined" color="error" onClick={() => handleWallet('debit')}>
                  Debit
                </Button>
              </Stack>
            </Grid>
          </Grid>
          {message && (
            <Alert severity="info" sx={{ mt: 3 }}>
              {message}
            </Alert>
          )}
        </CardContent>
      </Card>
    </Stack>
  );
};

export default AdminWalletPage;
