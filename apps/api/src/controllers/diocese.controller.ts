import type { RequestHandler } from 'express';
import { clergyService } from '../services/clergy.service.js';
import { qnaService } from '../services/qna.service.js';
import { clergySlugSchema, questionSubmissionSchema } from '../validators/diocese.validator.js';

export const getClergy: RequestHandler = (_request, response) => response.json({ data: clergyService.findAll() });

export const getClergyBySlug: RequestHandler = (request, response) => {
  const result = clergySlugSchema.safeParse(request.params.slug);
  if (!result.success) {
    response.status(400).json({ status: 'error', message: 'Invalid clergy slug' });
    return;
  }
  const member = clergyService.findBySlug(result.data);
  if (!member) {
    response.status(404).json({ status: 'error', message: 'Clergy member not found' });
    return;
  }
  response.json({ data: member });
};

export const getPrimate: RequestHandler = (_request, response) => response.json({ data: clergyService.findPrimate() });
export const getOfficialDocuments: RequestHandler = (_request, response) => response.json({ data: clergyService.findDocuments() });
export const getPublicQuestions: RequestHandler = (_request, response) => response.json({ data: clergyService.findPublicQuestions() });

export const submitQuestion: RequestHandler = (request, response) => {
  const result = questionSubmissionSchema.safeParse(request.body);
  if (!result.success) {
    response.status(400).json({ status: 'error', message: 'Invalid question submission', issues: result.error.flatten().fieldErrors });
    return;
  }
  response.status(201).json({ data: qnaService.submit(result.data) });
};
