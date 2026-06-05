export type PaymentProvider = 'MOCK' | 'ARCA' | 'VISA' | 'PAYPAL' | 'APPLE_PAY' | 'GOOGLE_PAY';

export interface SpendingItem { label: string; amount: number; color: string }
export interface SocialProgram {
  id: string; slug: string; title: string; summary: string; description: string; coverUrl: string; location: string;
  beneficiaries: number; startsAt: string; endsAt?: string; isFeatured: boolean; goalAmount: number; raisedAmount: number; spending: SpendingItem[];
}
export interface SuccessStory { id: string; slug: string; title: string; summary: string; imageUrl: string; impactLabel: string; programSlug?: string }
export interface DonorHonor { id: string; displayName: string; honorLevel: string; message?: string }
export interface TransparencySummary { totalRaised: number; totalGoal: number; beneficiaries: number; programs: number }
export interface DonationIntent { id: string; amount: number; currency: string; provider: PaymentProvider; providerReference: string; status: 'INTENT_CREATED'; program?: { slug: string; title: string } }
