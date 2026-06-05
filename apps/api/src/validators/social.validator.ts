import { z } from 'zod';

export const socialSlugSchema = z.string().trim().min(1).max(120);

export const donationIntentSchema = z.object({
  amount: z.number().int().min(1000).max(100_000_000),
  currency: z.enum(['AMD', 'USD', 'EUR']).default('AMD'),
  programSlug: z.string().trim().max(120).optional(),
  provider: z.enum(['MOCK', 'ARCA', 'VISA', 'PAYPAL', 'APPLE_PAY', 'GOOGLE_PAY']).default('MOCK'),
}).superRefine((value, context) => {
  if (value.provider !== 'MOCK') context.addIssue({ code: z.ZodIssueCode.custom, path: ['provider'], message: 'Selected payment provider is not available yet' });
});

export const volunteerSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  interests: z.string().trim().max(300).optional().or(z.literal('')),
  availability: z.string().trim().max(200).optional().or(z.literal('')),
  message: z.string().trim().max(2000).optional().or(z.literal('')),
  programSlug: z.string().trim().max(120).optional(),
});
