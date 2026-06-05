import type { RequestHandler } from 'express';
import { spiritualService } from '../services/spiritual.service.js';
import { spiritualQuerySchema, spiritualSlugSchema } from '../validators/spiritual.validator.js';

const query = (request: Parameters<RequestHandler>[0]) => spiritualQuerySchema.safeParse(request.query);
export const getPrayers: RequestHandler = (req, res) => { const r=query(req); if(!r.success){res.status(400).json({status:'error'});return;} res.json({data:spiritualService.prayers(r.data.search,r.data.category)}); };
export const getSaints: RequestHandler = (req, res) => { const r=query(req); if(!r.success){res.status(400).json({status:'error'});return;} res.json({data:spiritualService.saints(r.data.search)}); };
export const getFeasts: RequestHandler = (_req,res)=>res.json({data:spiritualService.feasts()});
export const getSacraments: RequestHandler = (_req,res)=>res.json({data:spiritualService.sacraments()});
export const getSacrament: RequestHandler = (req,res)=>{const r=spiritualSlugSchema.safeParse(req.params.slug);const item=r.success?spiritualService.sacrament(r.data):undefined;if(!item){res.status(404).json({status:'error',message:'Guide not found'});return;}res.json({data:item});};
export const getMedia: RequestHandler = (req,res)=>{const r=query(req);if(!r.success){res.status(400).json({status:'error'});return;}res.json({data:spiritualService.media(r.data.type)});};
export const getChoirs: RequestHandler = (_req,res)=>res.json({data:spiritualService.choirs()});
