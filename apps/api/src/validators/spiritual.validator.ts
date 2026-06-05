import { z } from 'zod';
export const spiritualQuerySchema = z.object({ search: z.string().trim().max(100).optional(), category: z.string().trim().max(80).optional(), type: z.enum(['SERMON', 'PODCAST', 'VLOG', 'SHARAKAN', 'CHOIR_RECORDING']).optional() });
export const spiritualSlugSchema = z.string().trim().min(1).max(120);
