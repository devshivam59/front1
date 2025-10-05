import apiClient from './client';
import type { User } from '../types';

export const getUsers = async () => {
  const { data } = await apiClient.get('/v1/admin/users');
  return data.data as User[];
};

export const approveUser = async (userId: string) => {
  const { data } = await apiClient.post(`/v1/admin/users/${userId}/approve`);
  return data.data;
};

export const blockUser = async (userId: string) => {
  const { data } = await apiClient.post(`/v1/admin/users/${userId}/block`);
  return data.data;
};

export const unblockUser = async (userId: string) => {
  const { data } = await apiClient.post(`/v1/admin/users/${userId}/unblock`);
  return data.data;
};

export const getSystemStats = async () => {
  const { data } = await apiClient.get('/v1/admin/system/stats');
  return data.data as {
    totalUsers: number;
    activeOrders: number;
    tradesToday: number;
    serverLoad: number;
  };
};

export const getAdminOrders = async () => {
  const { data } = await apiClient.get('/v1/admin/orders');
  return data.data;
};

export const getAdminTrades = async () => {
  const { data } = await apiClient.get('/v1/admin/trades');
  return data.data;
};
