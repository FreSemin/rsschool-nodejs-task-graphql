import { PrismaClient } from '.prisma/client';
import { PostEntity } from './post.entity.js';
import { Prisma } from '@prisma/client';

export class PostService {
  static async findAll(prisma: PrismaClient) {
    return await PostEntity.findAll(prisma);
  }

  static async findOne(id: string, prisma: PrismaClient) {
    return await PostEntity.findOne(id, prisma);
  }

  static async findAllByUserId(userId: string, prisma: PrismaClient) {
    return await PostEntity.findAllByUserId(userId, prisma);
  }

  static async create(postDto: Prisma.PostCreateInput, prisma: PrismaClient) {
    return await PostEntity.create(postDto, prisma);
  }

  static async update(id: string, postDto: Prisma.PostUpdateInput, prisma: PrismaClient) {
    return await PostEntity.update(id, postDto, prisma);
  }

  static async delete(id: string, prisma: PrismaClient) {
    return await PostEntity.delete(id, prisma);
  }
}
