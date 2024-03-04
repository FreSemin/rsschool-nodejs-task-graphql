import { GraphQLNonNull } from 'graphql';
import { CreatePostInput, PostType } from './post.type.js';
import { InputDto } from '../../models/args.js';
import { Prisma } from '@prisma/client';
import { Context } from '../../models/context.js';
import { PostService } from './post.service.js';

export const postMutations = {
  createPost: {
    type: PostType,
    args: {
      dto: {
        type: new GraphQLNonNull(CreatePostInput),
      },
    },
    resolve: async (
      _,
      { dto }: InputDto<Prisma.PostCreateInput>,
      { prisma }: Context,
    ) => {
      return await PostService.create(dto, prisma);
    },
  },
};
