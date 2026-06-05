import type { RequestHandler } from 'express';
import { socialService } from '../services/social.service.js';
import { donationIntentSchema, socialSlugSchema, volunteerSchema } from '../validators/social.validator.js';

export const getSocialPrograms: RequestHandler = (_request, response) => response.json({ data: socialService.findPrograms() });
export const getSuccessStories: RequestHandler = (_request, response) => response.json({ data: socialService.findSuccessStories() });
export const getDonorHonors: RequestHandler = (_request, response) => response.json({ data: socialService.findDonorHonors() });
export const getTransparency: RequestHandler = (_request, response) => response.json({ data: socialService.getTransparency() });

export const getSocialProgramBySlug: RequestHandler = (request, response) => {
  const result = socialSlugSchema.safeParse(request.params.slug);
  if (!result.success) { response.status(400).json({ status: 'error', message: 'Invalid program slug' }); return; }
  const program = socialService.findProgramBySlug(result.data);
  if (!program) { response.status(404).json({ status: 'error', message: 'Social program not found' }); return; }
  response.json({ data: program });
};

export const createDonationIntent: RequestHandler = async (request, response) => {
  const result = donationIntentSchema.safeParse(request.body);
  if (!result.success) { response.status(400).json({ status: 'error', message: 'Invalid donation intent', issues: result.error.flatten().fieldErrors }); return; }
  response.status(201).json({ data: await socialService.createDonationIntent(result.data) });
};

export const submitVolunteerApplication: RequestHandler = (request, response) => {
  const result = volunteerSchema.safeParse(request.body);
  if (!result.success) { response.status(400).json({ status: 'error', message: 'Invalid volunteer application', issues: result.error.flatten().fieldErrors }); return; }
  response.status(201).json({ data: socialService.submitVolunteer(result.data) });
};
