import { randomUUID } from 'node:crypto';
import type { CreatePaymentIntentInput, PaymentIntentResult, PaymentProviderAdapter } from './payment-provider.js';

export class MockPaymentProvider implements PaymentProviderAdapter {
  readonly provider = 'MOCK' as const;

  async createIntent(_input: CreatePaymentIntentInput): Promise<PaymentIntentResult> {
    return {
      provider: this.provider,
      providerReference: `mock_${randomUUID()}`,
      status: 'INTENT_CREATED',
    };
  }
}
