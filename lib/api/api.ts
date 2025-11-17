// lib/api/api.ts
import axios, { AxiosInstance } from 'axios';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export const apiServer: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
