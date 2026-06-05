import { Router } from 'express';
import { getChoirs, getFeasts, getMedia, getPrayers, getSacrament, getSacraments, getSaints } from '../controllers/spiritual.controller.js';
export const spiritualRouter=Router();
spiritualRouter.get('/prayers',getPrayers); spiritualRouter.get('/saints',getSaints); spiritualRouter.get('/feast-days',getFeasts);
spiritualRouter.get('/sacrament-guides',getSacraments); spiritualRouter.get('/sacrament-guides/:slug',getSacrament);
spiritualRouter.get('/media-items',getMedia); spiritualRouter.get('/choirs',getChoirs);
