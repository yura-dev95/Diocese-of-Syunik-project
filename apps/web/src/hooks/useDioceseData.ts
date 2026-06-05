import { useEffect, useState } from 'react';
import { dioceseService } from '../services/diocese.service';
import type { ClergyMember, OfficialDocument, PublicQuestion } from '../types/diocese';

function useRemoteData<T>(loader: () => Promise<T>) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    let active = true;
    loader().then((value) => active && setData(value)).catch(() => active && setError('Տվյալները ժամանակավորապես հասանելի չեն։')).finally(() => active && setIsLoading(false));
    return () => { active = false; };
  }, []);
  return { data, isLoading, error };
}

export const useClergy = () => useRemoteData<ClergyMember[]>(dioceseService.getClergy);
export const usePrimate = () => useRemoteData<ClergyMember>(dioceseService.getPrimate);
export const useOfficialDocuments = () => useRemoteData<OfficialDocument[]>(dioceseService.getDocuments);
export const usePublicQuestions = () => useRemoteData<PublicQuestion[]>(dioceseService.getPublicQuestions);
