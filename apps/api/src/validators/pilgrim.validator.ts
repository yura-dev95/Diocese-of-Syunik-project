import { z } from 'zod';
export const pilgrimSlugSchema=z.string().trim().min(1).max(120);
export const contactQuerySchema=z.object({category:z.string().trim().max(60).optional()});
