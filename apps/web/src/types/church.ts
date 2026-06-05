export type ChurchCategory = 'ACTIVE_MONASTERY' | 'CITY_CHURCH' | 'VILLAGE_CHURCH' | 'RUINED_SANCTUARY' | 'CHAPEL';

export interface ChurchGalleryImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
}

export interface Church {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  category: ChurchCategory;
  settlement: string;
  century: string;
  summary: string;
  description: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
  isFeatured: boolean;
  visitingNote: string;
  serviceSchedule?: string;
  gallery: ChurchGalleryImage[];
}

export interface ChurchFilters {
  category?: ChurchCategory;
  search?: string;
}

export interface ChurchListResponse {
  data: Church[];
  meta: { total: number };
}

export interface ChurchResponse {
  data: Church;
}
