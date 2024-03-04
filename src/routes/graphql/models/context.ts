import { PrismaClient } from '.prisma/client';
import { DataLoaders } from '../data-loaders.js';

export type Context = {
  prisma: PrismaClient;
  dataLoaders: ReturnType<typeof DataLoaders>;
};
