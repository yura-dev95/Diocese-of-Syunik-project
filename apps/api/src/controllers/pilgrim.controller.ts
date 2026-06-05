import type { RequestHandler } from 'express';import { pilgrimService } from '../services/pilgrim.service.js';import { contactQuerySchema, pilgrimSlugSchema } from '../validators/pilgrim.validator.js';
export const getPilgrimRoutes:RequestHandler=(_q,r)=>r.json({data:pilgrimService.routes()});
export const getPilgrimRoute:RequestHandler=(q,r)=>{const x=pilgrimSlugSchema.safeParse(q.params.slug);const route=x.success?pilgrimService.route(x.data):undefined;if(!route){r.status(404).json({status:'error',message:'Route not found'});return;}r.json({data:route});};
export const getLiturgySchedules:RequestHandler=(_q,r)=>r.json({data:pilgrimService.schedules()});
export const getUsefulContacts:RequestHandler=(q,r)=>{const x=contactQuerySchema.safeParse(q.query);if(!x.success){r.status(400).json({status:'error'});return;}r.json({data:pilgrimService.contacts(x.data.category)});};
export const getEtiquetteRules:RequestHandler=(_q,r)=>r.json({data:pilgrimService.rules()});
