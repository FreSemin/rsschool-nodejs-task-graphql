import { PrismaClient } from '.prisma/client';
import { UserEntity } from './user.entity.js';

export class UserService {
  static async findAll(prisma: PrismaClient) {
    return await UserEntity.findAll(prisma);
  }

  static async findOne(id: string, prisma: PrismaClient) {
    return await UserEntity.findOne(id, prisma);
  }
}
