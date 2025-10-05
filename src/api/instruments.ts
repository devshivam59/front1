import apiClient from './client';
import type { Instrument } from '../types';

export const searchInstruments = async (query: string): Promise<Instrument[]> => {
  const { data } = await apiClient.get('/v1/instruments', {
    params: { q: query, limit: 20 }
  });
  return data.data;
};

export const getInstrument = async (id: string): Promise<Instrument> => {
  const { data } = await apiClient.get(`/v1/instruments/${id}`);
  return data.data;
};
