import type { RequestHandler } from 'express';
import { libraryService } from '../services/library.service.js';
import { libraryQuerySchema, librarySlugSchema } from '../validators/library.validator.js';

export const getLibraryItems: RequestHandler = (request, response) => {
  const result = libraryQuerySchema.safeParse(request.query);
  if (!result.success) {
    response.status(400).json({ status: 'error', message: 'Invalid library filters', issues: result.error.issues });
    return;
  }
  const data = libraryService.findAll(result.data);
  response.json({ data, meta: { total: data.length } });
};

export const getLibraryItemBySlug: RequestHandler = (request, response) => {
  const result = librarySlugSchema.safeParse(request.params.slug);
  if (!result.success) {
    response.status(400).json({ status: 'error', message: 'Invalid library item slug' });
    return;
  }
  const item = libraryService.findBySlug(result.data);
  if (!item) {
    response.status(404).json({ status: 'error', message: 'Library item not found' });
    return;
  }
  response.json({ data: item });
};
