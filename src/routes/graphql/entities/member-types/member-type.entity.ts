import { PrismaClient } from '.prisma/client';

export class MemberTypeEntity {
  static async findAll(prisma: PrismaClient) {
    return await prisma.memberType.findMany();
  }

  static async findOne(id: string, prisma: PrismaClient) {
    return await prisma.memberType.findUnique({
      where: {
        id,
      },
    });
  }
}
