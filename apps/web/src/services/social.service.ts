import type { DonationIntent, DonorHonor, SocialProgram, SuccessStory, TransparencySummary } from '../types/social';
import { api } from './api';

export const socialService = {
  getPrograms: async () => (await api.get<{ data: SocialProgram[] }>('/social-programs')).data.data,
  getProgram: async (slug: string) => (await api.get<{ data: SocialProgram }>(`/social-programs/${slug}`)).data.data,
  getSuccessStories: async () => (await api.get<{ data: SuccessStory[] }>('/success-stories')).data.data,
  getDonorHonors: async () => (await api.get<{ data: DonorHonor[] }>('/donor-honors')).data.data,
  getTransparency: async () => (await api.get<{ data: TransparencySummary }>('/transparency')).data.data,
  createDonationIntent: async (input: { amount: number; currency: 'AMD'; programSlug?: string }) => (await api.post<{ data: DonationIntent }>('/donations/intents', { ...input, provider: 'MOCK' })).data.data,
  submitVolunteer: async (input: { fullName: string; email: string; phone?: string; interests?: string; availability?: string; message?: string; programSlug?: string }) => (await api.post<{ data: { referenceId: string; status: 'received' } }>('/volunteer-applications', input)).data.data,
};
