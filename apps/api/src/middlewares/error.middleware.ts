import { Prisma } from '@prisma/client';
import type { ErrorRequestHandler } from 'express';

export const errorMiddleware: ErrorRequestHandler = (error, _request, response, _next) => {
  console.error(error);

  const databaseUnavailable = error instanceof Prisma.PrismaClientInitializationError
    || (error instanceof Prisma.PrismaClientKnownRequestError && ['P1000', 'P1001'].includes(error.code));
  if (databaseUnavailable) {
    response.status(503).json({
      status: 'error',
      message: 'The database is unavailable. Start PostgreSQL and try again.',
    });
    return;
  }

  const schemaOutOfDate = error instanceof Prisma.PrismaClientKnownRequestError
    && ['P2021', 'P2022'].includes(error.code);
  if (schemaOutOfDate) {
    response.status(503).json({
      status: 'error',
      message: 'The database schema is not up to date. Run the API migrations and try again.',
    });
    return;
  }

  response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
};
