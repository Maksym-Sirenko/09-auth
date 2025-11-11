// lib/api/clientAuth.ts
import { api } from './api';
import type { ApiError } from './api';

export type RegisterRequest = {
  email: string;
  password: string;
  userName?: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const register = async (data: RegisterRequest) => {
  const { data: res } = await api.post('/auth/register', data);
  return res;
};

export const login = async (data: LoginRequest) => {
  const { data: res } = await api.post('/auth/login', data);
  return res;
};

export const logout = async () => {
  await api.post('/auth/logout');
};

export const checkSession = async () => {
  const { data } = await api.get('/auth/session');
  return data;
};
