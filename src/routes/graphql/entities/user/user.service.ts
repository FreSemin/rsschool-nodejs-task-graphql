import { PrismaClient } from '.prisma/client';
import { UserEntity } from './user.entity.js';

export class UserService {
  static async findAll(prisma: PrismaClient) {
    return await UserEntity.findAll(prisma);
  }

  static async findOne(id: string, prisma: PrismaClient) {
    return await UserEntity.findOne(id, prisma);
  }

  static async findUserSubscribedToUsers(id: string, prisma: PrismaClient) {
    const user = await UserEntity.findUserSubscribedTo(id, prisma);

    if (!user) {
      return null;
    }

    const subscriptions = user.userSubscribedTo.map(async (subscription) => {
      return UserService.findOne(subscription.authorId, prisma);
    });

    return await Promise.all([...subscriptions]);
  }
}
