import bcrypt from 'bcryptjs';
import type { RequestHandler } from 'express';
import { prisma } from '../prisma/client.js';
import { signAccessToken } from '../utils/auth.js';
import { loginSchema } from '../validators/auth.validator.js';

function serializeUser(user: { id: string; email: string; name: string; role: 'ADMIN' | 'EDITOR' }) {
  return { id: user.id, email: user.email, name: user.name, role: user.role };
}

export const login: RequestHandler = async (request, response) => {
  const parsed = loginSchema.safeParse(request.body);
  if (!parsed.success) {
    response.status(400).json({ status: 'error', message: 'Invalid login payload', issues: parsed.error.flatten().fieldErrors });
    return;
  }

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email.toLowerCase() } });
  const isValid = user ? await bcrypt.compare(parsed.data.password, user.passwordHash) : false;

  if (!user || !isValid) {
    response.status(401).json({ status: 'error', message: 'Invalid email or password' });
    return;
  }

  response.json({
    data: {
      accessToken: signAccessToken({ sub: user.id, email: user.email, role: user.role }),
      user: serializeUser(user),
    },
  });
};

export const me: RequestHandler = async (request, response) => {
  if (!request.user) {
    response.status(401).json({ status: 'error', message: 'Authentication required' });
    return;
  }

  const user = await prisma.user.findUnique({ where: { id: request.user.id } });
  if (!user) {
    response.status(404).json({ status: 'error', message: 'User not found' });
    return;
  }

  response.json({ data: { user: serializeUser(user) } });
};
