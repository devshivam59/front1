import apiClient from './client';
import type { Holding, Position } from '../types';

export const getHoldings = async () => {
  const { data } = await apiClient.get('/v1/portfolio/holdings');
  return data.data as Holding[];
};

export const getPositions = async () => {
  const { data } = await apiClient.get('/v1/portfolio/positions');
  return data.data as Position[];
};

export const getDailyPnl = async () => {
  const { data } = await apiClient.get('/v1/portfolio/pnl/daily');
  return data.data as { date: string; realized: number }[];
};
