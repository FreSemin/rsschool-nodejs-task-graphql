import { PrismaClient } from '.prisma/client';
import { Prisma } from '@prisma/client';

export class UserEntity {
  static async findAll(prisma: PrismaClient) {
    return await prisma.user.findMany();
  }

  static async findOne(id: string, prisma: PrismaClient) {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  static async findUserSubscribedTo(id: string, prisma: PrismaClient) {
    return await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        userSubscribedTo: true,
      },
    });
  }

  static async findSubscribedToUser(id: string, prisma: PrismaClient) {
    return await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        subscribedToUser: true,
      },
    });
  }

  static async create(userDto: Prisma.UserCreateInput, prisma: PrismaClient) {
    return await prisma.user.create({ data: userDto });
  }
}
