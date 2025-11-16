// lib/api/api.ts
import axios, { AxiosInstance } from 'axios';
import { BASE_URL } from '../constants';

export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL || 'http://localhost:3000/api',
  withCredentials: true,
});
