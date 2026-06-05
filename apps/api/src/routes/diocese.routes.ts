import { Router } from 'express';
import { getClergy, getClergyBySlug, getOfficialDocuments, getPrimate, getPublicQuestions, submitQuestion } from '../controllers/diocese.controller.js';

export const dioceseRouter = Router();

dioceseRouter.get('/clergy', getClergy);
dioceseRouter.get('/clergy/primate/profile', getPrimate);
dioceseRouter.get('/clergy/:slug', getClergyBySlug);
dioceseRouter.get('/official-documents', getOfficialDocuments);
dioceseRouter.get('/qna/questions', getPublicQuestions);
dioceseRouter.post('/qna/questions', submitQuestion);
