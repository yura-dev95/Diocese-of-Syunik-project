import { randomUUID } from 'node:crypto';
import { donorHonors, socialPrograms, successStories } from '../data/social.data.js';
import type { PaymentProvider } from '../types/social.types.js';
import { getPaymentProvider } from './payment/payment-provider-registry.js';

export const socialService = {
  findPrograms: () => socialPrograms,
  findProgramBySlug: (slug: string) => socialPrograms.find((program) => program.slug === slug),
  findSuccessStories: () => successStories,
  findDonorHonors: () => donorHonors,
  getTransparency() {
    return {
      totalRaised: socialPrograms.reduce((sum, program) => sum + program.raisedAmount, 0),
      totalGoal: socialPrograms.reduce((sum, program) => sum + program.goalAmount, 0),
      beneficiaries: socialPrograms.reduce((sum, program) => sum + program.beneficiaries, 0),
      programs: socialPrograms.length,
    };
  },
  async createDonationIntent(input: { amount: number; currency: 'AMD' | 'USD' | 'EUR'; programSlug?: string; provider: PaymentProvider }) {
    const program = input.programSlug ? socialPrograms.find((item) => item.slug === input.programSlug) : undefined;
    const intent = await getPaymentProvider(input.provider).createIntent({ amount: input.amount, currency: input.currency, programId: program?.id });
    return { id: randomUUID(), amount: input.amount, currency: input.currency, program: program ? { slug: program.slug, title: program.title } : undefined, ...intent };
  },
  submitVolunteer(input: { fullName: string; email: string; phone?: string; interests?: string; availability?: string; message?: string; programSlug?: string }) {
    return { referenceId: randomUUID(), status: 'received' as const, programSlug: input.programSlug };
  },
};
