import apiClient from './client';
import type { Order } from '../types';

export interface OrderPayload {
  instrument_id: string;
  side: 'BUY' | 'SELL';
  qty: number;
  price?: number;
  order_type: 'MARKET' | 'LIMIT';
  product: 'MIS' | 'CNC';
}

export const placeOrder = async (payload: OrderPayload) => {
  const { data } = await apiClient.post('/v1/orders', payload);
  return data.data;
};

export const getOrders = async () => {
  const { data } = await apiClient.get('/v1/orders');
  return data.data as Order[];
};

export const cancelOrder = async (orderId: string) => {
  const { data } = await apiClient.post(`/v1/orders/${orderId}/cancel`);
  return data.data as Order;
};
