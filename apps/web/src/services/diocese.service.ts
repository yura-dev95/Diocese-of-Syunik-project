import type { ClergyMember, OfficialDocument, PublicQuestion, QuestionSubmission } from '../types/diocese';
import { api } from './api';

export const dioceseService = {
  async getClergy() {
    const response = await api.get<{ data: ClergyMember[] }>('/clergy');
    return response.data.data;
  },
  async getClergyBySlug(slug: string) {
    const response = await api.get<{ data: ClergyMember }>(`/clergy/${slug}`);
    return response.data.data;
  },
  async getPrimate() {
    const response = await api.get<{ data: ClergyMember }>('/clergy/primate/profile');
    return response.data.data;
  },
  async getDocuments() {
    const response = await api.get<{ data: OfficialDocument[] }>('/official-documents');
    return response.data.data;
  },
  async getPublicQuestions() {
    const response = await api.get<{ data: PublicQuestion[] }>('/qna/questions');
    return response.data.data;
  },
  async submitQuestion(question: QuestionSubmission) {
    const response = await api.post<{ data: { referenceId: string; status: 'received' } }>('/qna/questions', question);
    return response.data.data;
  },
};
