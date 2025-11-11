import { BASE_URL } from '@/lib/constants';
import axios from 'axios';

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
