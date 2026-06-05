import { clergyMembers, officialDocuments, publicQuestions } from '../data/diocese.data.js';

export const clergyService = {
  findAll: () => clergyMembers,
  findBySlug: (slug: string) => clergyMembers.find((member) => member.slug === slug),
  findPrimate: () => clergyMembers.find((member) => member.isPrimate),
  findDocuments: () => officialDocuments,
  findPublicQuestions: () => publicQuestions,
};
