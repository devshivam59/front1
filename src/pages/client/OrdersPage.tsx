import { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { getOrders, placeOrder } from '../../api/orders';
import { searchInstruments } from '../../api/instruments';
import type { Order } from '../../types';

interface NewOrderForm {
  instrument_id: string;
  side: 'BUY' | 'SELL';
  qty: number;
  price?: number;
  order_type: 'MARKET' | 'LIMIT';
  product: 'CNC' | 'MIS';
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [open, setOpen] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [symbolQuery, setSymbolQuery] = useState('');
  const [suggestions, setSuggestions] = useState<{ id: string; label: string }[]>([]);
  const { register, handleSubmit, reset, setValue } = useForm<NewOrderForm>({
    defaultValues: { side: 'BUY', order_type: 'LIMIT', product: 'CNC' }
  });

  const fetchOrders = () => {
    getOrders()
      .then(setOrders)
      .catch((error) => console.error('Failed to load orders', error));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (!symbolQuery) {
      setSuggestions([]);
      return;
    }
    const timeout = setTimeout(() => {
      searchInstruments(symbolQuery)
        .then((data) => setSuggestions(data.map((instrument) => ({ id: instrument.id, label: instrument.tradingsymbol }))))
        .catch((error) => console.error('Instrument search failed', error));
    }, 300);
    return () => clearTimeout(timeout);
  }, [symbolQuery]);

  const onSubmit = handleSubmit(async (values) => {
    try {
      await placeOrder(values);
      setOpen(false);
      reset();
      setSubmitError(null);
      fetchOrders();
    } catch (error) {
      console.error('Failed to place order', error);
      setSubmitError('Order placement failed. Please verify details and try again.');
    }
  });

  return (
    <Stack spacing={3}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Orders
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)' }}>
            Review open and completed orders, manage execution, and raise new orders quickly.
          </Typography>
        </Box>
        <Button variant="contained" onClick={() => setOpen(true)}>
          New Order
        </Button>
      </Box>
      <Card>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Instrument</TableCell>
                <TableCell>Side</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Placed</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.instrument_id}</TableCell>
                  <TableCell>
                    <Chip label={order.side} color={order.side === 'BUY' ? 'success' : 'error'} variant="outlined" />
                  </TableCell>
                  <TableCell>{order.qty}</TableCell>
                  <TableCell>{order.price ?? 'Market'}</TableCell>
                  <TableCell>
                    <Chip label={order.status} color={order.status === 'OPEN' ? 'info' : 'default'} variant="outlined" />
                  </TableCell>
                  <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
                </TableRow>
              ))}
              {!orders.length && (
                <TableRow>
                  <TableCell colSpan={7}>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center' }}>
                      No orders yet. Place your first trade to see it listed here.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Raise new order</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            {submitError && <Alert severity="error">{submitError}</Alert>}
            <TextField
              label="Instrument symbol"
              value={symbolQuery}
              onChange={(event) => setSymbolQuery(event.target.value)}
              helperText="Start typing to search instruments"
              fullWidth
            />
            {suggestions.length > 0 && (
              <Card variant="outlined">
                <CardContent>
                  <Stack spacing={1}>
                    {suggestions.map((suggestion) => (
                      <Button
                        key={suggestion.id}
                        variant="text"
                        onClick={() => {
                          setValue('instrument_id', suggestion.id, { shouldDirty: true, shouldTouch: true });
                          setSymbolQuery(suggestion.label);
                          setSuggestions([]);
                        }}
                      >
                        {suggestion.label}
                      </Button>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            )}
            <TextField label="Instrument ID" {...register('instrument_id')} required fullWidth />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField select label="Side" {...register('side')} fullWidth>
                  <MenuItem value="BUY">Buy</MenuItem>
                  <MenuItem value="SELL">Sell</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField select label="Product" {...register('product')} fullWidth>
                  <MenuItem value="CNC">Delivery (CNC)</MenuItem>
                  <MenuItem value="MIS">Intraday (MIS)</MenuItem>
                </TextField>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField label="Quantity" type="number" {...register('qty', { valueAsNumber: true })} fullWidth />
              </Grid>
              <Grid item xs={6}>
                <TextField select label="Order Type" {...register('order_type')} fullWidth>
                  <MenuItem value="MARKET">Market</MenuItem>
                  <MenuItem value="LIMIT">Limit</MenuItem>
                </TextField>
              </Grid>
            </Grid>
            <TextField label="Price" type="number" {...register('price', { valueAsNumber: true })} fullWidth />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={onSubmit}>
            Submit order
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default OrdersPage;
