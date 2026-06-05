import type { LibraryCategory, LibraryListResponse } from '../types/library';
import { api } from './api';

export const libraryService = {
  async getAll(filters: { category?: LibraryCategory; search?: string } = {}) {
    const response = await api.get<LibraryListResponse>('/library-items', { params: filters });
    return response.data;
  },
};
