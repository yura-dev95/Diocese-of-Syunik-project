import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api/v1',
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  config.headers['Accept-Language'] = localStorage.getItem('syunik-diocese-locale') ?? 'hy';
  const adminToken = localStorage.getItem('syunik-admin-token');
  if (adminToken) config.headers.Authorization = `Bearer ${adminToken}`;
  return config;
});
