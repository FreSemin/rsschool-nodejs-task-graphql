import { GraphQLBoolean, GraphQLNonNull } from 'graphql';
import { CreateProfileInput, ProfileType } from './profile.type.js';
import { Prisma } from '@prisma/client';
import { Context } from '../../models/context.js';
import { InputDto, WithId } from '../../models/args.js';
import { ProfileService } from './profile.service.js';
import { UUIDType } from '../../types/uuid.js';

export const profileMutations = {
  createProfile: {
    type: ProfileType,
    args: {
      dto: {
        type: new GraphQLNonNull(CreateProfileInput),
      },
    },
    resolve: async (
      _,
      { dto }: InputDto<Prisma.ProfileCreateInput>,
      { prisma }: Context,
    ) => {
      return await ProfileService.create(dto, prisma);
    },
  },

  deleteProfile: {
    type: GraphQLBoolean,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_, { id }: WithId, { prisma }: Context) => {
      await ProfileService.delete(id, prisma);

      return null;
    },
  },
};
