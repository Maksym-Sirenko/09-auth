// app/api/api.ts

import axios, { AxiosError } from 'axios';
import nextServer from 'next/dist/server/next-server';

export type ApiError = AxiosError<{ error: string }>;

export const api = axios.create({
  baseURL: 'https://next-v1-notes-api.goit.study',
  withCredentials: true,
});

export type RegisterRequest = {
  email: string;
  password: string;
  userName: string;
};

export type User = {
  id: string;
  email: string;
  userName?: string;
  photoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};
