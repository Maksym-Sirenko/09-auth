// lib/api/api.ts
import axios, { AxiosInstance } from 'axios';
import { BASE_URL } from '../constants';

export const apiServer: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
