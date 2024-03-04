import { PrismaClient } from '.prisma/client';
import { ProfileEntity } from './profile.entity.js';
import { Prisma } from '@prisma/client';

export class ProfileService {
  static async findAll(prisma: PrismaClient) {
    return await ProfileEntity.findAll(prisma);
  }

  static async findOne(id: string, prisma: PrismaClient) {
    return await ProfileEntity.findOne(id, prisma);
  }

  static async findOneByUserId(userId: string, prisma: PrismaClient) {
    return await ProfileEntity.findOneByUserId(userId, prisma);
  }

  static async create(profileDto: Prisma.ProfileCreateInput, prisma: PrismaClient) {
    return await ProfileEntity.create(profileDto, prisma);
  }

  static async update(
    id: string,
    profileDto: Prisma.ProfileUpdateInput,
    prisma: PrismaClient,
  ) {
    return await ProfileEntity.update(id, profileDto, prisma);
  }

  static async delete(id: string, prisma: PrismaClient) {
    return await ProfileEntity.delete(id, prisma);
  }
}
