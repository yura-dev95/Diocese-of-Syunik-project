import { Router } from 'express';
import { createDonationIntent, getDonorHonors, getSocialProgramBySlug, getSocialPrograms, getSuccessStories, getTransparency, submitVolunteerApplication } from '../controllers/social.controller.js';

export const socialRouter = Router();
socialRouter.get('/social-programs', getSocialPrograms);
socialRouter.get('/social-programs/:slug', getSocialProgramBySlug);
socialRouter.get('/success-stories', getSuccessStories);
socialRouter.get('/donor-honors', getDonorHonors);
socialRouter.get('/transparency', getTransparency);
socialRouter.post('/donations/intents', createDonationIntent);
socialRouter.post('/volunteer-applications', submitVolunteerApplication);
