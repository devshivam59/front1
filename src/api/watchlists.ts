import apiClient from './client';
import type { Watchlist } from '../types';

export const getWatchlists = async () => {
  const { data } = await apiClient.get('/v1/watchlists');
  return data.data as Watchlist[];
};

export const createWatchlist = async (payload: { name: string }) => {
  const { data } = await apiClient.post('/v1/watchlists', payload);
  return data.data as Watchlist;
};

export const updateWatchlist = async (watchlistId: string, payload: { name?: string; reorder?: string[] }) => {
  const { data } = await apiClient.put(`/v1/watchlists/${watchlistId}`, payload);
  return data.data as Watchlist;
};

export const deleteWatchlist = async (watchlistId: string) => {
  await apiClient.delete(`/v1/watchlists/${watchlistId}`);
};

export const addWatchlistItem = async (watchlistId: string, payload: { instrument_id: string }) => {
  const { data } = await apiClient.post(`/v1/watchlists/${watchlistId}/items`, payload);
  return data.data;
};

export const removeWatchlistItem = async (watchlistId: string, itemId: string) => {
  await apiClient.delete(`/v1/watchlists/${watchlistId}/items/${itemId}`);
};
