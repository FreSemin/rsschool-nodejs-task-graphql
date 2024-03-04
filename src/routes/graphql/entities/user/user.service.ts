import { PrismaClient } from '.prisma/client';
import { UserEntity } from './user.entity.js';
import { Prisma } from '@prisma/client';
import { UserSubscription } from '../../models/args.js';

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

  static async findSubscribedToUserUsers(id: string, prisma: PrismaClient) {
    const user = await UserEntity.findSubscribedToUser(id, prisma);

    if (!user) {
      return null;
    }

    const subscribers = user.subscribedToUser.map(async (subscriber) => {
      return UserService.findOne(subscriber.subscriberId, prisma);
    });

    return await Promise.all([...subscribers]);
  }

  static async create(userDto: Prisma.UserCreateInput, prisma: PrismaClient) {
    return await UserEntity.create(userDto, prisma);
  }

  static async update(id: string, userDto: Prisma.UserUpdateInput, prisma: PrismaClient) {
    return await UserEntity.update(id, userDto, prisma);
  }

  static async delete(id: string, prisma: PrismaClient) {
    return await UserEntity.delete(id, prisma);
  }

  static async subscribeTo(subscription: UserSubscription, prisma: PrismaClient) {
    return await UserEntity.subscribeTo(subscription, prisma);
  }

  static async unsubscribeFrom(subscription: UserSubscription, prisma: PrismaClient) {
    return await UserEntity.unsubscribeFrom(subscription, prisma);
  }
}
