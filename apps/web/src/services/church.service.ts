import type { ChurchFilters, ChurchListResponse, ChurchResponse } from '../types/church';
import { api } from './api';

export const churchService = {
  async getAll(filters: ChurchFilters = {}) {
    const response = await api.get<ChurchListResponse>('/churches', { params: filters });
    return response.data;
  },

  async getBySlug(slug: string) {
    const response = await api.get<ChurchResponse>(`/churches/${slug}`);
    return response.data.data;
  },
};
