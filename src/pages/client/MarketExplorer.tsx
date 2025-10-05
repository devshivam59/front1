import { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import BoltIcon from '@mui/icons-material/Bolt';
import { searchInstruments } from '../../api/instruments';
import { getQuote } from '../../api/market';
import type { Instrument, Quote } from '../../types';

const MarketExplorer = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Instrument[]>([]);
  const [quotes, setQuotes] = useState<Record<string, Quote>>({});

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    const timeout = setTimeout(() => {
      searchInstruments(query)
        .then(setResults)
        .catch((error) => console.error('Instrument search failed', error));
    }, 400);
    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    const loadQuotes = async () => {
      const entries = await Promise.all(
        results.slice(0, 5).map(async (instrument) => {
          try {
            const quote = await getQuote(instrument.id);
            return [instrument.id, quote] as const;
          } catch (error) {
            console.error('Failed to fetch quote', error);
            return [instrument.id, undefined] as const;
          }
        })
      );
      setQuotes(Object.fromEntries(entries.filter((entry): entry is [string, Quote] => Boolean(entry[1]))));
    };

    if (results.length) {
      loadQuotes();
    }
  }, [results]);

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Market Explorer
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)' }}>
          Search across exchanges, track quotes in real-time, and push instruments into watchlists instantly.
        </Typography>
      </Box>
      <Card>
        <CardContent>
          <TextField
            placeholder="Search instruments, symbols, ISIN..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              sx: { borderRadius: 3 }
            }}
          />
        </CardContent>
      </Card>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="h6">Search results</Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                  {results.length} instruments
                </Typography>
              </Stack>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Symbol</TableCell>
                    <TableCell>Exchange</TableCell>
                    <TableCell>Segment</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {results.map((instrument) => (
                    <TableRow key={instrument.id}>
                      <TableCell>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Avatar sx={{ bgcolor: 'rgba(56,182,255,0.2)', color: 'primary.main' }}>
                            {instrument.tradingsymbol[0]}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                              {instrument.tradingsymbol}
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                              {instrument.name}
                            </Typography>
                          </Box>
                        </Stack>
                      </TableCell>
                      <TableCell>{instrument.exchange}</TableCell>
                      <TableCell>{instrument.segment}</TableCell>
                      <TableCell>{instrument.type}</TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          <Button variant="outlined" size="small" startIcon={<BoltIcon />}>
                            Trade
                          </Button>
                          <IconButton color="secondary">
                            <PlaylistAddIcon />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Live quotes
              </Typography>
              <Stack spacing={2}>
                {Object.values(quotes).map((quote) => (
                  <Box key={quote.instrument_id} sx={{ p: 2, borderRadius: 3, background: 'rgba(15,23,42,0.75)', border: '1px solid rgba(148,163,184,0.18)' }}>
                    <Typography variant="subtitle2">{quote.instrument_id}</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      {quote.ltp.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'secondary.light' }}>
                      Bid {quote.bid.toFixed(2)} / Ask {quote.ask.toFixed(2)}
                    </Typography>
                  </Box>
                ))}
                {!Object.values(quotes).length && (
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                    Search to view live quotes summary.
                  </Typography>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default MarketExplorer;
