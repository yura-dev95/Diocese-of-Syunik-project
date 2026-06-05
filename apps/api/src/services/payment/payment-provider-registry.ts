import type { PaymentProvider } from '../../types/social.types.js';
import { MockPaymentProvider } from './mock-payment-provider.js';
import type { PaymentProviderAdapter } from './payment-provider.js';

const providers = new Map<PaymentProvider, PaymentProviderAdapter>();
const mockProvider = new MockPaymentProvider();
providers.set(mockProvider.provider, mockProvider);

export function getPaymentProvider(provider: PaymentProvider): PaymentProviderAdapter {
  const adapter = providers.get(provider);
  if (!adapter) throw new Error(`Payment provider ${provider} is not configured`);
  return adapter;
}
