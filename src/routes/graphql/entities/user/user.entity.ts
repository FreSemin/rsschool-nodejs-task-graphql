import { PrismaClient } from '.prisma/client';
import { Prisma } from '@prisma/client';
import { UserSubscription } from '../../models/args.js';

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

  static async findUserSubscribedTo(id: string, prisma: PrismaClient) {
    return await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        userSubscribedTo: true,
      },
    });
  }

  static async findSubscribedToUser(id: string, prisma: PrismaClient) {
    return await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        subscribedToUser: true,
      },
    });
  }

  static async create(userDto: Prisma.UserCreateInput, prisma: PrismaClient) {
    return await prisma.user.create({ data: userDto });
  }

  static async update(id: string, userDto: Prisma.UserUpdateInput, prisma: PrismaClient) {
    return await prisma.user.update({
      where: {
        id,
      },
      data: userDto,
    });
  }

  static async delete(id: string, prisma: PrismaClient) {
    return await prisma.user.delete({
      where: {
        id,
      },
    });
  }

  static async subscribeTo(subscription: UserSubscription, prisma: PrismaClient) {
    return await prisma.user.update({
      where: {
        id: subscription.userId,
      },
      data: {
        userSubscribedTo: {
          create: { authorId: subscription.authorId },
        },
      },
    });
  }

  static async unsubscribeFrom(subscription: UserSubscription, prisma: PrismaClient) {
    return await prisma.user.update({
      where: {
        id: subscription.userId,
      },
      data: {
        userSubscribedTo: {
          delete: {
            subscriberId_authorId: {
              authorId: subscription.authorId,
              subscriberId: subscription.userId,
            },
          },
        },
      },
    });
  }
}
