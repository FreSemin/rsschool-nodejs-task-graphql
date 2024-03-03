import { PrismaClient } from '.prisma/client';

export class PostEntity {
  static async findAll(prisma: PrismaClient) {
    return await prisma.post.findMany();
  }

  static async findOne(id: string, prisma: PrismaClient) {
    return await prisma.post.findUnique({
      where: {
        id,
      },
    });
  }
}
