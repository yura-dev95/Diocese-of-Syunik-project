import { useEffect, useState } from 'react';
import { socialService } from '../services/social.service';
import type { DonorHonor, SocialProgram, SuccessStory, TransparencySummary } from '../types/social';

function useData<T>(load: () => Promise<T>) {
  const [data, setData] = useState<T>(); const [isLoading, setIsLoading] = useState(true); const [error, setError] = useState<string | null>(null);
  useEffect(() => { let active = true; load().then((v) => active && setData(v)).catch(() => active && setError('Տվյալները ժամանակավորապես հասանելի չեն։')).finally(() => active && setIsLoading(false)); return () => { active = false; }; }, []);
  return { data, isLoading, error };
}
export const useSocialPrograms = () => useData<SocialProgram[]>(socialService.getPrograms);
export const useSuccessStories = () => useData<SuccessStory[]>(socialService.getSuccessStories);
export const useDonorHonors = () => useData<DonorHonor[]>(socialService.getDonorHonors);
export const useTransparency = () => useData<TransparencySummary>(socialService.getTransparency);
