import type { RequestHandler } from 'express';
import { verifyAccessToken } from '../utils/auth.js';

export const requireAuth: RequestHandler = (request, response, next) => {
  const header = request.header('authorization');
  const token = header?.startsWith('Bearer ') ? header.slice(7) : undefined;

  if (!token) {
    response.status(401).json({ status: 'error', message: 'Authentication required' });
    return;
  }

  try {
    const payload = verifyAccessToken(token);
    request.user = { id: payload.sub, email: payload.email, role: payload.role };
    next();
  } catch {
    response.status(401).json({ status: 'error', message: 'Invalid or expired token' });
  }
};

export const requireAdmin: RequestHandler = (request, response, next) => {
  if (request.user?.role !== 'ADMIN') {
    response.status(403).json({ status: 'error', message: 'Admin access required' });
    return;
  }

  next();
};
