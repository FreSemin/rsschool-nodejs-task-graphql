import { PrismaClient } from '.prisma/client';
import { Prisma } from '@prisma/client';

export class ProfileEntity {
  static async findAll(prisma: PrismaClient) {
    return await prisma.profile.findMany();
  }

  static async findOne(id: string, prisma: PrismaClient) {
    return await prisma.profile.findUnique({
      where: {
        id,
      },
    });
  }

  static async findOneByUserId(userId: string, prisma: PrismaClient) {
    return await prisma.profile.findUnique({
      where: {
        userId,
      },
    });
  }

  static async create(profileDto: Prisma.ProfileCreateInput, prisma: PrismaClient) {
    return await prisma.profile.create({ data: profileDto });
  }
}
