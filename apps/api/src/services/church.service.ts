import { churches } from '../data/churches.data.js';
import type { ChurchQuery, ChurchRecord } from '../types/church.types.js';

export const churchService = {
  findAll(query: ChurchQuery): ChurchRecord[] {
    const normalizedSearch = query.search?.trim().toLocaleLowerCase('hy-AM');

    return churches.filter((church) => {
      const matchesCategory = !query.category || church.category === query.category;
      const matchesSearch =
        !normalizedSearch ||
        [church.name, church.shortName, church.settlement, church.summary].some((value) =>
          value.toLocaleLowerCase('hy-AM').includes(normalizedSearch),
        );

      return matchesCategory && matchesSearch;
    });
  },

  findBySlug(slug: string): ChurchRecord | undefined {
    return churches.find((church) => church.slug === slug);
  },
};
