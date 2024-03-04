import { PrismaClient } from '.prisma/client';
import { MemberTypeEntity } from './member-type.entity.js';

export class MemberTypeService {
  static async findAll(prisma: PrismaClient) {
    return await MemberTypeEntity.findAll(prisma);
  }

  static async findOne(id: string, prisma: PrismaClient) {
    return await MemberTypeEntity.findOne(id, prisma);
  }
}
