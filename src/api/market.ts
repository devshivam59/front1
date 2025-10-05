import apiClient from './client';
import type { Quote } from '../types';

export const getQuote = async (instrumentId: string): Promise<Quote> => {
  const { data } = await apiClient.get(`/v1/market/quote/${instrumentId}`);
  return data.data;
};

export const getQuotes = async (instrumentIds: string[]): Promise<Quote[]> => {
  const { data } = await apiClient.post('/v1/market/quotes', {
    instrument_ids: instrumentIds
  });
  return data.data;
};
