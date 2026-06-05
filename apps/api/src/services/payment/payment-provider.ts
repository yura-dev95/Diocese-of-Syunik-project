import type { PaymentProvider } from '../../types/social.types.js';

export interface CreatePaymentIntentInput {
  amount: number;
  currency: 'AMD' | 'USD' | 'EUR';
  programId?: string;
}

export interface PaymentIntentResult {
  provider: PaymentProvider;
  providerReference: string;
  status: 'INTENT_CREATED';
  checkoutUrl?: string;
}

export interface PaymentProviderAdapter {
  readonly provider: PaymentProvider;
  createIntent(input: CreatePaymentIntentInput): Promise<PaymentIntentResult>;
}
