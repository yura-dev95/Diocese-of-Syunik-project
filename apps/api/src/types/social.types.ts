export type PaymentProvider = 'MOCK' | 'ARCA' | 'VISA' | 'PAYPAL' | 'APPLE_PAY' | 'GOOGLE_PAY';

export interface SocialProgramRecord {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  coverUrl: string;
  location: string;
  beneficiaries: number;
  startsAt: string;
  endsAt?: string;
  isFeatured: boolean;
  goalAmount: number;
  raisedAmount: number;
  spending: Array<{ label: string; amount: number; color: string }>;
}

export interface SuccessStoryRecord {
  id: string;
  slug: string;
  title: string;
  summary: string;
  imageUrl: string;
  impactLabel: string;
  programSlug?: string;
}

export interface DonorHonorRecord {
  id: string;
  displayName: string;
  honorLevel: string;
  message?: string;
}
