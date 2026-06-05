import { Router } from 'express';
import {
  adminSummary,
  createResourceItem,
  deleteResourceItem,
  getResourceItem,
  listAdminResources,
  listResourceItems,
  updateResourceItem,
} from '../controllers/admin.controller.js';
import { requireAdmin, requireAuth } from '../middlewares/auth.middleware.js';

export const adminRouter = Router();

adminRouter.use(requireAuth, requireAdmin);
adminRouter.get('/summary', adminSummary);
adminRouter.get('/resources', listAdminResources);
adminRouter.get('/:resource', listResourceItems);
adminRouter.post('/:resource', createResourceItem);
adminRouter.get('/:resource/:id', getResourceItem);
adminRouter.put('/:resource/:id', updateResourceItem);
adminRouter.delete('/:resource/:id', deleteResourceItem);
