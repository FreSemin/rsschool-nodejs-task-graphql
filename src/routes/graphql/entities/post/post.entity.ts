import { PrismaClient } from '.prisma/client';
import { Prisma } from '@prisma/client';

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

  static async findAllByUserId(userId: string, prisma: PrismaClient) {
    return await prisma.post.findMany({
      where: {
        authorId: userId,
      },
    });
  }

  static async create(postDto: Prisma.PostCreateInput, prisma: PrismaClient) {
    return await prisma.post.create({ data: postDto });
  }

  static async update(id: string, postDto: Prisma.PostUpdateInput, prisma: PrismaClient) {
    return await prisma.post.update({
      where: {
        id,
      },
      data: postDto,
    });
  }

  static async delete(id: string, prisma: PrismaClient) {
    return await prisma.post.delete({
      where: {
        id,
      },
    });
  }
}
