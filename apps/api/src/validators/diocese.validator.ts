import { z } from 'zod';

export const clergySlugSchema = z.string().trim().min(1).max(120);

export const questionSubmissionSchema = z.object({
  question: z.string().trim().min(20, 'Question must contain at least 20 characters').max(2000),
  category: z.string().trim().max(80).optional(),
  contactEmail: z.string().trim().email().max(254).optional().or(z.literal('')),
  isAnonymous: z.boolean().default(true),
}).transform((value) => ({
  ...value,
  contactEmail: value.contactEmail || undefined,
}));
