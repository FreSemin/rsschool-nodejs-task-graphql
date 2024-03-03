import { PrismaClient } from '.prisma/client';
import { ProfileEntity } from './profile.entity.js';

export class ProfileService {
  static async findAll(prisma: PrismaClient) {
    return await ProfileEntity.findAll(prisma);
  }

  static async findOne(id: string, prisma: PrismaClient) {
    return await ProfileEntity.findOne(id, prisma);
  }
}
