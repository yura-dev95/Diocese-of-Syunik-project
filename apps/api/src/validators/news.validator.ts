import { z } from 'zod';
export const contentQuerySchema=z.object({search:z.string().trim().max(100).optional(),category:z.string().trim().max(80).optional()});
export const newsSlugSchema=z.string().trim().min(1).max(120);
export const contactMessageSchema=z.object({fullName:z.string().trim().min(2).max(120),email:z.string().trim().email().max(254),phone:z.string().trim().max(40).optional().or(z.literal('')),subject:z.string().trim().min(3).max(160),message:z.string().trim().min(20).max(3000)});
