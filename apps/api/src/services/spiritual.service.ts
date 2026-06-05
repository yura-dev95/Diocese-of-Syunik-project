import { choirs, feastDays, mediaItems, prayers, sacramentGuides, saints } from '../data/spiritual.data.js';
import type { MediaType } from '../types/spiritual.types.js';

const search = <T>(items: T[], query: string | undefined, fields: (keyof T)[]) => {
  const q = query?.trim().toLocaleLowerCase('hy-AM'); if (!q) return items;
  return items.filter((item) => fields.some((field) => String(item[field] ?? '').toLocaleLowerCase('hy-AM').includes(q)));
};
export const spiritualService = {
  prayers: (query?: string, category?: string) => search(prayers, query, ['title', 'summary', 'content']).filter((item) => !category || item.category === category),
  saints: (query?: string) => search(saints, query, ['name', 'biography', 'patronOf']),
  feasts: () => feastDays,
  sacraments: () => sacramentGuides,
  sacrament: (slug: string) => sacramentGuides.find((item) => item.slug === slug),
  media: (type?: MediaType) => mediaItems.filter((item) => !type || item.mediaType === type),
  choirs: () => choirs,
};
