import { PrismaClient, User } from '@prisma/client';

export const userSubscribedToLoader =
  (prisma: PrismaClient) => async (ids: readonly string[]) => {
    const usersWithAuthors = await prisma.user.findMany({
      where: {
        id: {
          in: [...ids],
        },
      },
      include: {
        userSubscribedTo: {
          select: { author: true },
        },
      },
    });

    const subscribedAuthorsMap = new Map<string, User[]>();

    usersWithAuthors.forEach((user) => {
      const subscribedAuthors = user.userSubscribedTo.map(
        (subscription) => subscription.author,
      );

      subscribedAuthorsMap.set(user.id, subscribedAuthors);
    });

    return ids.map((id) => subscribedAuthorsMap.get(id));
  };

export const subscribedToUserLoader =
  (prisma: PrismaClient) => async (ids: readonly string[]) => {
    const usersWithSubs = await prisma.user.findMany({
      where: {
        id: {
          in: [...ids],
        },
      },
      include: {
        subscribedToUser: {
          select: { subscriber: true },
        },
      },
    });

    const subscribersMap = new Map<string, User[]>();

    usersWithSubs.forEach((user) => {
      const subscribers = user.subscribedToUser.map(
        (subscription) => subscription.subscriber,
      );

      subscribersMap.set(user.id, subscribers);
    });

    return ids.map((id) => subscribersMap.get(id));
  };
