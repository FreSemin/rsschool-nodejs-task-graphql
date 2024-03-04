import { GraphQLNonNull } from 'graphql';
import { CreateProfileInput, ProfileType } from './profile.type.js';
import { Prisma } from '@prisma/client';
import { Context } from '../../models/context.js';
import { InputDto } from '../../models/args.js';
import { ProfileService } from './profile.service.js';

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
};
