import { Router } from 'express';
import { churchRouter } from './church.routes.js';
import { healthRouter } from './health.routes.js';
import { libraryRouter } from './library.routes.js';
import { dioceseRouter } from './diocese.routes.js';
import { socialRouter } from './social.routes.js';
import { spiritualRouter } from './spiritual.routes.js';
import { pilgrimRouter } from './pilgrim.routes.js';
import { newsRouter } from './news.routes.js';

export const apiRouter = Router();

apiRouter.use('/health', healthRouter);
apiRouter.use('/churches', churchRouter);
apiRouter.use('/library-items', libraryRouter);
apiRouter.use('/', dioceseRouter);
apiRouter.use('/', socialRouter);
apiRouter.use('/', spiritualRouter);
apiRouter.use('/', pilgrimRouter);
apiRouter.use('/', newsRouter);
