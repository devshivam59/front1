import apiClient from './client';
import type { WalletSummary } from '../types';

export const getWallet = async (): Promise<WalletSummary> => {
  const { data } = await apiClient.get('/v1/wallet');
  return data.data as WalletSummary;
};

export const getWalletTransactions = async () => {
  const { data } = await apiClient.get('/v1/wallet/transactions');
  return data.data as Array<{ id: string; amount: number; type: string; note?: string; createdAt: string }>;
};

export const creditWallet = async (payload: { user_id: string; amount: number; note?: string }) => {
  const { data } = await apiClient.post('/v1/wallet/credit', payload);
  return data.data;
};

export const debitWallet = async (payload: { user_id: string; amount: number; note?: string }) => {
  const { data } = await apiClient.post('/v1/wallet/debit', payload);
  return data.data;
};
