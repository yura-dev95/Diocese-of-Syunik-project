import { z } from 'zod';

export const libraryQuerySchema = z.object({
  category: z.enum(['PDF', 'MANUSCRIPT', 'ARTICLE']).optional(),
  search: z.string().trim().max(100).optional(),
});

export const librarySlugSchema = z.string().trim().min(1).max(120);
