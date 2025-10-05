import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Grid, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TimelineIcon from '@mui/icons-material/Timeline';
import SavingsIcon from '@mui/icons-material/Savings';
import StatCard from '../../components/StatCard';
import { getWallet, getWalletTransactions } from '../../api/wallet';
import type { WalletSummary } from '../../types';

const WalletPage = () => {
  const [wallet, setWallet] = useState<WalletSummary | null>(null);
  const [transactions, setTransactions] = useState<Array<{ id: string; amount: number; type: string; note?: string; createdAt: string }>>([]);

  useEffect(() => {
    getWallet()
      .then(setWallet)
      .catch((error) => console.error('Failed to load wallet', error));
    getWalletTransactions()
      .then(setTransactions)
      .catch((error) => console.error('Failed to load wallet transactions', error));
  }, []);

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Wallet & Margin
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)' }}>
          Track available funds, margin utilization, and capital allocation.
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StatCard title="Balance" value={`₹${(wallet?.balance ?? 0).toLocaleString()}`} change="Net of charges" icon={<AccountBalanceWalletIcon />} />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard title="Margin" value={`₹${(wallet?.margin ?? 0).toLocaleString()}`} change="Intraday exposure" icon={<TimelineIcon />} />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard title="Collateral" value={`₹${(wallet?.collateral ?? 0).toLocaleString()}`} change="Pledged securities" icon={<SavingsIcon />} />
        </Grid>
      </Grid>
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Transactions
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Note</TableCell>
                <TableCell>Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.id}</TableCell>
                  <TableCell>{transaction.amount.toFixed(2)}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.note ?? '-'}</TableCell>
                  <TableCell>{new Date(transaction.createdAt).toLocaleString()}</TableCell>
                </TableRow>
              ))}
              {!transactions.length && (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center' }}>
                      No wallet transactions yet.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default WalletPage;
