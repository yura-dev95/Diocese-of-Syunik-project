import { libraryItems } from '../data/library.data.js';
import type { LibraryItemRecord, LibraryQuery } from '../types/library.types.js';

export const libraryService = {
  findAll(query: LibraryQuery): LibraryItemRecord[] {
    const search = query.search?.trim().toLocaleLowerCase('hy-AM');
    return libraryItems.filter((item) => {
      const matchesCategory = !query.category || item.category === query.category;
      const matchesSearch = !search || [item.title, item.author, item.description].some((value) => value?.toLocaleLowerCase('hy-AM').includes(search));
      return matchesCategory && matchesSearch;
    });
  },

  findBySlug(slug: string): LibraryItemRecord | undefined {
    return libraryItems.find((item) => item.slug === slug);
  },
};
