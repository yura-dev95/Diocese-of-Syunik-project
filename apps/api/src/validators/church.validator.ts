import { z } from 'zod';

export const churchQuerySchema = z.object({
  category: z.enum(['ACTIVE_MONASTERY', 'CITY_CHURCH', 'VILLAGE_CHURCH', 'RUINED_SANCTUARY', 'CHAPEL']).optional(),
  search: z.string().trim().max(100).optional(),
});

export const churchSlugSchema = z.string().trim().min(1).max(120);
