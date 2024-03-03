import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLFloat } from 'graphql';
import { UUIDType } from '../../types/uuid.js';
import { ProfileType } from '../profile/profile.type.js';
import { ProfileService } from '../profile/profile.service.js';
import { User } from '@prisma/client';
import { Context } from '../../models/context.js';

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(UUIDType),
    },
    name: {
      type: GraphQLString,
    },
    balance: {
      type: GraphQLFloat,
    },

    profile: {
      type: ProfileType,
      resolve: async (user: User, args, { prisma }: Context) => {
        return await ProfileService.findOne(user.id, prisma);
      },
    },
  }),
});
