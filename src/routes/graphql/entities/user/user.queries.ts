import { GraphQLList, GraphQLNonNull, GraphQLResolveInfo } from 'graphql';
import { UserType } from './user.type.js';
import { Context } from '../../models/context.js';
import { UUIDType } from '../../types/uuid.js';
import { WithId } from '../../models/args.js';
import { UserService } from './user.service.js';
import {
  parseResolveInfo,
  ResolveTree,
  simplifyParsedResolveInfoFragmentWithType,
} from 'graphql-parse-resolve-info';
import { User } from '@prisma/client';

export const userQueries = {
  users: {
    type: new GraphQLList(UserType),
    resolve: async (
      _,
      args,
      { prisma, dataLoaders }: Context,
      info: GraphQLResolveInfo,
    ) => {
      const parsedResolveInfo = parseResolveInfo(info) as ResolveTree;

      const { fields } = simplifyParsedResolveInfoFragmentWithType(
        parsedResolveInfo,
        new GraphQLList(UserType),
      );

      const includeUserSubscribedTo = 'userSubscribedTo' in fields;
      const includeSubscribedToUser = 'subscribedToUser' in fields;

      const users = await prisma.user.findMany({
        include: {
          userSubscribedTo: includeUserSubscribedTo,
          subscribedToUser: includeSubscribedToUser,
        },
      });

      if (includeUserSubscribedTo || includeSubscribedToUser) {
        const usersMap = new Map<string, User>();

        users.forEach((user) => {
          usersMap.set(user.id, user);
        });

        users.forEach((user) => {
          if (includeUserSubscribedTo) {
            dataLoaders.userSubscribedToLoader.prime(
              user.id,
              user.userSubscribedTo.map((sub) => usersMap.get(sub.authorId) as User),
            );
          }

          if (includeSubscribedToUser) {
            dataLoaders.subscribedToUserLoader.prime(
              user.id,
              user.subscribedToUser.map((sub) => usersMap.get(sub.subscriberId) as User),
            );
          }
        });
      }

      return users;
    },
  },

  user: {
    type: UserType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_, { id }: WithId, { prisma }: Context) => {
      return await UserService.findOne(id, prisma);
    },
  },
};
