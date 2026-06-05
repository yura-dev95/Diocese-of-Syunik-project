import { randomUUID } from 'node:crypto';

interface QuestionSubmission {
  question: string;
  category?: string;
  contactEmail?: string;
  isAnonymous: boolean;
}

const pendingQuestions: Array<QuestionSubmission & { id: string; createdAt: string }> = [];

export const qnaService = {
  submit(input: QuestionSubmission) {
    const record = { ...input, id: randomUUID(), createdAt: new Date().toISOString() };
    pendingQuestions.push(record);
    return { referenceId: record.id, status: 'received' as const };
  },
};
