export type LibraryCategory = 'PDF' | 'MANUSCRIPT' | 'ARTICLE';

export interface LibraryItemRecord {
  id: string;
  slug: string;
  title: string;
  author?: string;
  description: string;
  category: LibraryCategory;
  fileUrl?: string;
  coverUrl?: string;
  publicationYear?: number;
  pageCount?: number;
  language: string;
}

export interface LibraryQuery {
  category?: LibraryCategory;
  search?: string;
}
