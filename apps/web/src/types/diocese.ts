export interface ClergyMember {
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

export interface OfficialDocument {
  id: string;
  slug: string;
  title: string;
  description: string;
  documentType: string;
  documentDate: string;
  fileUrl?: string;
}

export interface PublicQuestion {
  id: string;
  question: string;
  answer: string;
  category?: string;
  answeredAt: string;
}

export interface QuestionSubmission {
  question: string;
  category?: string;
  contactEmail?: string;
  isAnonymous: boolean;
}
