import type { RequestHandler } from 'express';
import { prisma } from '../prisma/client.js';

type Delegate = {
  count: (args?: Record<string, unknown>) => Promise<number>;
  findMany: (args?: Record<string, unknown>) => Promise<unknown[]>;
  findUnique: (args: Record<string, unknown>) => Promise<unknown>;
  create: (args: Record<string, unknown>) => Promise<unknown>;
  update: (args: Record<string, unknown>) => Promise<unknown>;
  delete: (args: Record<string, unknown>) => Promise<unknown>;
};

interface AdminResourceConfig {
  label: string;
  delegate: Delegate;
  searchableFields: string[];
  orderByField?: string;
  readonly?: boolean;
}

function asDelegate(delegate: unknown) {
  return delegate as Delegate;
}

const resources: Record<string, AdminResourceConfig> = {
  churches: { label: 'Churches', delegate: asDelegate(prisma.church), searchableFields: ['name', 'settlement', 'summary'] },
  clergy: { label: 'Clergy', delegate: asDelegate(prisma.clergyMember), searchableFields: ['fullName', 'title', 'biography'] },
  'social-programs': { label: 'Social programs', delegate: asDelegate(prisma.socialProgram), searchableFields: ['title', 'summary', 'location'] },
  news: { label: 'News', delegate: asDelegate(prisma.newsArticle), searchableFields: ['title', 'excerpt', 'category'] },
  events: { label: 'Events', delegate: asDelegate(prisma.event), searchableFields: ['title', 'location', 'description'] },
  prayers: { label: 'Prayers', delegate: asDelegate(prisma.prayer), searchableFields: ['title', 'category', 'summary'] },
  saints: { label: 'Saints', delegate: asDelegate(prisma.saint), searchableFields: ['name', 'patronOf', 'biography'] },
  'library-items': { label: 'Library items', delegate: asDelegate(prisma.libraryItem), searchableFields: ['title', 'author', 'description'] },
  gallery: { label: 'Gallery', delegate: asDelegate(prisma.galleryImage), searchableFields: ['alt', 'caption', 'category'], orderByField: 'createdAt' },
  faqs: { label: 'FAQs', delegate: asDelegate(prisma.fAQ), searchableFields: ['question', 'answer', 'category'] },
  'contact-messages': { label: 'Contact messages', delegate: asDelegate(prisma.contactMessage), searchableFields: ['fullName', 'email', 'subject', 'message'] },
  'volunteer-applications': { label: 'Volunteer applications', delegate: asDelegate(prisma.volunteerApplication), searchableFields: ['fullName', 'email', 'interests'] },
  'qna-questions': { label: 'Q&A questions', delegate: asDelegate(prisma.qnAQuestion), searchableFields: ['question', 'answer', 'contactEmail'] },
};

const dateFields = new Set(['publishedAt', 'startsAt', 'endsAt', 'createdAt', 'updatedAt', 'documentDate', 'announcementDate', 'expiresAt']);
const numericFields = new Set(['ordinationYear', 'beneficiaries', 'goalAmount', 'raisedAmount', 'amount', 'priority', 'sortOrder', 'publicationYear', 'pageCount', 'latitude', 'longitude']);
const booleanFields = new Set(['isFeatured', 'isActive', 'isPrimate', 'isAnonymous', 'isPublic', 'isMovable']);
const jsonFields = new Set(['socialLinks', 'itinerary', 'transportOptions', 'preparation']);
const protectedFields = new Set(['id', 'createdAt', 'updatedAt', 'church', 'program', 'article', 'choir', 'donations', 'volunteers', 'gallery', 'clergy', 'liturgySchedules', 'successStories', 'passwordHash']);

function getResource(key: unknown) {
  return typeof key === 'string' ? resources[key] : undefined;
}

function buildWhere(config: AdminResourceConfig, search?: string) {
  if (!search?.trim()) return undefined;
  return {
    OR: config.searchableFields.map((field) => ({
      [field]: { contains: search.trim(), mode: 'insensitive' },
    })),
  };
}

function sanitizePayload(payload: Record<string, unknown>) {
  const data: Record<string, unknown> = {};

  Object.entries(payload).forEach(([key, value]) => {
    if (protectedFields.has(key)) return;
    if (value === '') {
      data[key] = null;
      return;
    }
    if (dateFields.has(key) && typeof value === 'string') {
      data[key] = value ? new Date(value) : null;
      return;
    }
    if (numericFields.has(key)) {
      data[key] = value === null || value === undefined ? null : Number(value);
      return;
    }
    if (booleanFields.has(key)) {
      data[key] = value === true || value === 'true';
      return;
    }
    if (jsonFields.has(key) && typeof value === 'string') {
      data[key] = value.trim() ? JSON.parse(value) : null;
      return;
    }
    data[key] = value;
  });

  return data;
}

export const adminSummary: RequestHandler = async (_request, response) => {
  const entries = await Promise.all(
    Object.entries(resources).map(async ([key, config]) => ({
      key,
      label: config.label,
      count: await config.delegate.count(),
    })),
  );

  response.json({ data: entries });
};

export const listAdminResources: RequestHandler = (_request, response) => {
  response.json({ data: Object.entries(resources).map(([key, config]) => ({ key, label: config.label })) });
};

export const listResourceItems: RequestHandler = async (request, response) => {
  const config = getResource(request.params.resource);
  if (!config) {
    response.status(404).json({ status: 'error', message: 'Admin resource not found' });
    return;
  }

  const page = Math.max(Number(request.query.page ?? 1), 1);
  const pageSize = Math.min(Math.max(Number(request.query.pageSize ?? 20), 1), 100);
  const where = buildWhere(config, typeof request.query.search === 'string' ? request.query.search : undefined);
  const [items, total] = await Promise.all([
    config.delegate.findMany({ where, orderBy: { [config.orderByField ?? 'updatedAt']: 'desc' }, skip: (page - 1) * pageSize, take: pageSize }),
    config.delegate.count({ where }),
  ]);

  response.json({ data: { items, total, page, pageSize } });
};

export const getResourceItem: RequestHandler = async (request, response) => {
  const config = getResource(request.params.resource);
  if (!config) {
    response.status(404).json({ status: 'error', message: 'Admin resource not found' });
    return;
  }

  const id = request.params.id;
  if (!id) {
    response.status(400).json({ status: 'error', message: 'Item id is required' });
    return;
  }

  const item = await config.delegate.findUnique({ where: { id } });
  if (!item) {
    response.status(404).json({ status: 'error', message: 'Item not found' });
    return;
  }

  response.json({ data: item });
};

export const createResourceItem: RequestHandler = async (request, response) => {
  const config = getResource(request.params.resource);
  if (!config) {
    response.status(404).json({ status: 'error', message: 'Admin resource not found' });
    return;
  }

  try {
    const item = await config.delegate.create({ data: sanitizePayload(request.body) });
    response.status(201).json({ data: item });
  } catch (error) {
    response.status(400).json({ status: 'error', message: error instanceof Error ? error.message : 'Could not create item' });
  }
};

export const updateResourceItem: RequestHandler = async (request, response) => {
  const config = getResource(request.params.resource);
  if (!config) {
    response.status(404).json({ status: 'error', message: 'Admin resource not found' });
    return;
  }

  try {
    const id = request.params.id;
    if (!id) {
      response.status(400).json({ status: 'error', message: 'Item id is required' });
      return;
    }
    const item = await config.delegate.update({ where: { id }, data: sanitizePayload(request.body) });
    response.json({ data: item });
  } catch (error) {
    response.status(400).json({ status: 'error', message: error instanceof Error ? error.message : 'Could not update item' });
  }
};

export const deleteResourceItem: RequestHandler = async (request, response) => {
  const config = getResource(request.params.resource);
  if (!config) {
    response.status(404).json({ status: 'error', message: 'Admin resource not found' });
    return;
  }

  const id = request.params.id;
  if (!id) {
    response.status(400).json({ status: 'error', message: 'Item id is required' });
    return;
  }

  await config.delegate.delete({ where: { id } });
  response.status(204).send();
};
