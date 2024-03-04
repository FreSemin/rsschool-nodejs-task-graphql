import { GraphQLBoolean, GraphQLNonNull } from 'graphql';
import { ChangeProfileInput, CreateProfileInput, ProfileType } from './profile.type.js';
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

  changeProfile: {
    type: ProfileType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
      dto: {
        type: ChangeProfileInput,
      },
    },
    resolve: async (
      _,
      { id, dto }: { id: string; dto: Prisma.ProfileUpdateInput },
      { prisma }: Context,
    ) => {
      return await ProfileService.update(id, dto, prisma);
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
