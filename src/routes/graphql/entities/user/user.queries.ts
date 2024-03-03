import { GraphQLList, GraphQLNonNull } from 'graphql';
import { UserType } from './user.type.js';
import { Context } from '../../models/context.js';
import { UUIDType } from '../../types/uuid.js';
import { WithId } from '../../models/args.js';
import { UserService } from './user.service.js';

export const userQueries = {
  users: {
    type: new GraphQLList(UserType),
    resolve: async (_, args, { prisma }: Context) => {
      return await UserService.findAll(prisma);
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
