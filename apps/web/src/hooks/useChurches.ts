import { useEffect, useState } from 'react';
import { churchService } from '../services/church.service';
import type { Church, ChurchFilters } from '../types/church';

export function useChurches(filters: ChurchFilters) {
  const [churches, setChurches] = useState<Church[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await churchService.getAll(filters);
        if (!controller.signal.aborted) setChurches(response.data);
      } catch {
        if (!controller.signal.aborted) setError('Չհաջողվեց բեռնել սրբավայրերի ցանկը։ Խնդրում ենք փորձել կրկին։');
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    void load();
    return () => controller.abort();
  }, [filters.category, filters.search]);

  return { churches, isLoading, error };
}
