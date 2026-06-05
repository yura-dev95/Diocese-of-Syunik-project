export interface ClergyRecord {
  id: string;
  slug: string;
  fullName: string;
  title: string;
  biography: string;
  imageUrl: string;
  ordinationYear?: number;
  education?: string;
  ministryFocus: string;
  publicEmail?: string;
  socialLinks?: Record<string, string>;
  isPrimate: boolean;
  church?: { slug: string; name: string; settlement: string };
}

export interface OfficialDocumentRecord {
  id: string;
  slug: string;
  title: string;
  description: string;
  documentType: string;
  documentDate: string;
  fileUrl?: string;
}

export interface PublicQuestionRecord {
  id: string;
  question: string;
  answer: string;
  category?: string;
  answeredAt: string;
}
