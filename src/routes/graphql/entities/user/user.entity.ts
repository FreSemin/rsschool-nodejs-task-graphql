import { PrismaClient } from '.prisma/client';

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
}
