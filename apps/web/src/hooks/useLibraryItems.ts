import { useEffect, useState } from 'react';
import { libraryService } from '../services/library.service';
import type { LibraryCategory, LibraryItem } from '../types/library';

export function useLibraryItems(filters: { category?: LibraryCategory; search?: string }) {
  const [items, setItems] = useState<LibraryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    setError(null);
    libraryService.getAll(filters)
      .then((response) => active && setItems(response.data))
      .catch(() => active && setError('Չհաջողվեց բեռնել թվային գրադարանը։'))
      .finally(() => active && setIsLoading(false));
    return () => { active = false; };
  }, [filters.category, filters.search]);

  return { items, isLoading, error };
}
