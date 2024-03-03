import { GraphQLList, GraphQLNonNull } from 'graphql';
import { ProfileType } from './profile.type.js';
import { Context } from '../../models/context.js';
import { ProfileService } from './profile.service.js';
import { WithId } from '../../models/args.js';
import { UUIDType } from '../../types/uuid.js';

export const profileQueries = {
  profiles: {
    type: new GraphQLList(ProfileType),
    resolve: async (_, args, { prisma }: Context) => {
      return await ProfileService.findAll(prisma);
    },
  },

  profile: {
    type: ProfileType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_, { id }: WithId, { prisma }: Context) => {
      return await ProfileService.findOne(id, prisma);
    },
  },
};
