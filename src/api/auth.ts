import apiClient from './client';
import type { LoginPayload, RegisterPayload, User } from '../types';

interface AuthResponse {
  token: string;
  user: User;
}

export const loginRequest = async (payload: LoginPayload): Promise<AuthResponse> => {
  const { data } = await apiClient.post('/v1/auth/login', payload);
  return data.data;
};

export const registerRequest = async (payload: RegisterPayload): Promise<AuthResponse> => {
  const { data } = await apiClient.post('/v1/auth/register', payload);
  return data.data;
};

export const logoutRequest = async (token: string) => {
  await apiClient.post(
    '/v1/auth/logout',
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};

export const getCurrentUser = async (token: string): Promise<User> => {
  const { data } = await apiClient.get('/v1/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return data.data;
};
