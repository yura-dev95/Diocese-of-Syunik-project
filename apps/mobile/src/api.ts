import { API_URL } from './config';

export type Locale = 'hy' | 'en' | 'ru';

export interface Church {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  settlement: string;
  century?: string;
  summary: string;
  imageUrl?: string;
  isFeatured?: boolean;
  serviceSchedule?: string;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverUrl?: string;
  category: string;
  publishedAt: string;
}

export interface Primate {
  fullName: string;
  title: string;
  biography?: string;
  imageUrl?: string;
}

export interface MobileHomeData {
  churches: Church[];
  news: NewsArticle[];
  primate?: Primate;
}

interface ApiResponse<T> {
  data: T;
}

async function getJson<T>(path: string, locale: Locale): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      Accept: 'application/json',
      'Accept-Language': locale,
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  const payload = (await response.json()) as ApiResponse<T>;
  return payload.data;
}

export async function getMobileHomeData(locale: Locale): Promise<MobileHomeData> {
  const [churches, news, primate] = await Promise.all([
    getJson<Church[]>('/churches', locale),
    getJson<NewsArticle[]>('/news', locale),
    getJson<Primate>('/clergy/primate/profile', locale).catch(() => undefined),
  ]);

  return {
    churches,
    news,
    primate,
  };
}
