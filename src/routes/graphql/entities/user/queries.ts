import { GraphQLList, GraphQLNonNull } from 'graphql';
import { userType } from './types.js';
import { Context } from '../../models/context.js';
import { UUIDType } from '../../types/uuid.js';
import { WithId } from '../../models/args.js';

// TODO: add type
export const userQueries = {
  users: {
    type: new GraphQLList(userType),
    resolve: async (_, args, { prisma }: Context) => {
      // TODO: move logic to service
      return await prisma.user.findMany();
    },
  },
  user: {
    type: userType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_, { id }: WithId, { prisma }: Context) => {
      return await prisma.user.findUnique({
        where: {
          id,
        },
      });
    },
  },
};
