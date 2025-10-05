import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { ResponsiveContainer, BarChart, Bar, Tooltip, CartesianGrid, XAxis, YAxis } from 'recharts';
import { getHoldings, getPositions } from '../../api/portfolio';
import type { Holding, Position } from '../../types';

const PortfolioPage = () => {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    getHoldings()
      .then(setHoldings)
      .catch((error) => console.error('Failed to load holdings', error));
    getPositions()
      .then(setPositions)
      .catch((error) => console.error('Failed to load positions', error));
  }, []);

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Portfolio analytics
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)' }}>
          See concentration, mark-to-market gains, and overnight exposure.
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Holdings
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Instrument</TableCell>
                    <TableCell>Qty</TableCell>
                    <TableCell>Avg Price</TableCell>
                    <TableCell>P&L</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {holdings.map((holding) => (
                    <TableRow key={holding.instrument_id}>
                      <TableCell>{holding.instrument_id}</TableCell>
                      <TableCell>{holding.qty}</TableCell>
                      <TableCell>{holding.avg_price.toFixed(2)}</TableCell>
                      <TableCell>
                        <Chip
                          label={(holding.pnl ?? 0).toFixed(2)}
                          color={(holding.pnl ?? 0) >= 0 ? 'success' : 'error'}
                          variant="outlined"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                  {!holdings.length && (
                    <TableRow>
                      <TableCell colSpan={4}>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center' }}>
                          No holdings yet. Execute delivery trades to populate this view.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Exposure by instrument
              </Typography>
              <Box sx={{ height: 320 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={positions}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" />
                    <XAxis dataKey="instrument_id" stroke="rgba(255,255,255,0.54)" />
                    <YAxis stroke="rgba(255,255,255,0.54)" />
                    <Tooltip contentStyle={{ backgroundColor: '#111827', borderRadius: 12 }} />
                    <Bar dataKey="qty" fill="#38b6ff" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default PortfolioPage;
