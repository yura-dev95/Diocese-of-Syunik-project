import type { RequestHandler } from 'express';
import { churchService } from '../services/church.service.js';
import { churchQuerySchema, churchSlugSchema } from '../validators/church.validator.js';

export const getChurches: RequestHandler = (request, response) => {
  const result = churchQuerySchema.safeParse(request.query);

  if (!result.success) {
    response.status(400).json({ status: 'error', message: 'Invalid church filters', issues: result.error.issues });
    return;
  }

  const data = churchService.findAll(result.data);
  response.json({ data, meta: { total: data.length } });
};

export const getChurchBySlug: RequestHandler = (request, response) => {
  const result = churchSlugSchema.safeParse(request.params.slug);

  if (!result.success) {
    response.status(400).json({ status: 'error', message: 'Invalid church slug' });
    return;
  }

  const church = churchService.findBySlug(result.data);

  if (!church) {
    response.status(404).json({ status: 'error', message: 'Church not found' });
    return;
  }

  response.json({ data: church });
};
