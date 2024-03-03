import { PrismaClient } from '.prisma/client';

export class UserService {
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
