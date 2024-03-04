import { GraphQLBoolean, GraphQLNonNull } from 'graphql';
import { ChangeUserInput, CreateUserInput, UserType } from './user.type.js';
import { Prisma } from '@prisma/client';
import { Context } from '../../models/context.js';
import { UserService } from './user.service.js';
import { InputDto, WithId } from '../../models/args.js';
import { UUIDType } from '../../types/uuid.js';

export const userMutations = {
  createUser: {
    type: UserType,
    args: {
      dto: {
        type: new GraphQLNonNull(CreateUserInput),
      },
    },
    resolve: async (
      _,
      { dto }: InputDto<Prisma.UserCreateInput>,
      { prisma }: Context,
    ) => {
      return await UserService.create(dto, prisma);
    },
  },

  changeUser: {
    type: UserType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
      dto: {
        type: ChangeUserInput,
      },
    },
    resolve: async (
      _,
      { id, dto }: { id: string; dto: Prisma.UserUpdateInput },
      { prisma }: Context,
    ) => {
      return await UserService.update(id, dto, prisma);
    },
  },

  deleteUser: {
    type: GraphQLBoolean,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_, { id }: WithId, { prisma }: Context) => {
      await UserService.delete(id, prisma);

      return null;
    },
  },
};
