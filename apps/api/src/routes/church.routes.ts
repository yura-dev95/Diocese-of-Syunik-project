import { Router } from 'express';
import { getChurchBySlug, getChurches } from '../controllers/church.controller.js';

export const churchRouter = Router();

churchRouter.get('/', getChurches);
churchRouter.get('/:slug', getChurchBySlug);
