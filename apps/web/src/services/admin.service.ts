import { api } from './api';
import type { AdminAuthResponse, AdminResourceList, AdminSummaryItem, AdminUser } from '../types/admin';

export const adminTokenKey = 'syunik-admin-token';

export const adminService = {
  async login(input: { email: string; password: string }) {
    const response = await api.post<{ data: AdminAuthResponse }>('/auth/login', input);
    return response.data.data;
  },
  async me() {
    const response = await api.get<{ data: { user: AdminUser } }>('/auth/me');
    return response.data.data.user;
  },
  async summary() {
    const response = await api.get<{ data: AdminSummaryItem[] }>('/admin/summary');
    return response.data.data;
  },
  async list<T = Record<string, unknown>>(resource: string, search?: string) {
    const response = await api.get<{ data: AdminResourceList<T> }>(`/admin/${resource}`, { params: { search } });
    return response.data.data;
  },
  async create<T = Record<string, unknown>>(resource: string, payload: Record<string, unknown>) {
    const response = await api.post<{ data: T }>(`/admin/${resource}`, payload);
    return response.data.data;
  },
  async update<T = Record<string, unknown>>(resource: string, id: string, payload: Record<string, unknown>) {
    const response = await api.put<{ data: T }>(`/admin/${resource}/${id}`, payload);
    return response.data.data;
  },
  async remove(resource: string, id: string) {
    await api.delete(`/admin/${resource}/${id}`);
  },
};
