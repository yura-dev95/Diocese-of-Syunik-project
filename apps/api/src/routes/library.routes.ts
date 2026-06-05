import { Router } from 'express';
import { getLibraryItemBySlug, getLibraryItems } from '../controllers/library.controller.js';

export const libraryRouter = Router();
libraryRouter.get('/', getLibraryItems);
libraryRouter.get('/:slug', getLibraryItemBySlug);
