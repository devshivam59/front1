import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { createWatchlist, deleteWatchlist, getWatchlists } from '../../api/watchlists';
import type { Watchlist } from '../../types';

const WatchlistsPage = () => {
  const [watchlists, setWatchlists] = useState<Watchlist[]>([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  const loadWatchlists = () => {
    getWatchlists()
      .then(setWatchlists)
      .catch((error) => console.error('Failed to load watchlists', error));
  };

  useEffect(() => {
    loadWatchlists();
  }, []);

  const handleCreate = async () => {
    await createWatchlist({ name });
    setOpen(false);
    setName('');
    loadWatchlists();
  };

  const handleDelete = async (watchlistId: string) => {
    await deleteWatchlist(watchlistId);
    loadWatchlists();
  };

  return (
    <Stack spacing={3}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Watchlists
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)' }}>
            Organize instruments by strategy, asset class, or timeframe.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
          Create watchlist
        </Button>
      </Box>
      <Grid container spacing={3}>
        {watchlists.map((watchlist) => (
          <Grid item xs={12} md={6} key={watchlist.id}>
            <Card>
              <CardContent>
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                  <Typography variant="h6">{watchlist.name}</Typography>
                  <IconButton color="error" onClick={() => handleDelete(watchlist.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Stack>
                <Stack spacing={2}>
                  {watchlist.items.map((item) => (
                    <Box key={item.id} sx={{ p: 2, borderRadius: 2, background: 'rgba(15,23,42,0.78)', border: '1px solid rgba(56,182,255,0.2)' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {item.instrument?.tradingsymbol ?? item.instrument_id}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                        {item.instrument?.name ?? 'Instrument'}
                      </Typography>
                    </Box>
                  ))}
                  {!watchlist.items.length && (
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                      No instruments yet. Use the Market Explorer to add symbols quickly.
                    </Typography>
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {!watchlists.length && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                  No watchlists created yet. Start by creating a list for your favourite trades.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>New watchlist</DialogTitle>
        <DialogContent>
          <TextField label="Name" value={name} onChange={(event) => setName(event.target.value)} fullWidth sx={{ mt: 1 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreate} disabled={!name.trim()}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default WatchlistsPage;
