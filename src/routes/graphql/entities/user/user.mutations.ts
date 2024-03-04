import { GraphQLNonNull } from 'graphql';
import { CreateUserInput, UserType } from './user.type.js';
import { Prisma } from '@prisma/client';
import { Context } from '../../models/context.js';
import { UserService } from './user.service.js';
import { InputDto } from '../../models/args.js';

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
};
