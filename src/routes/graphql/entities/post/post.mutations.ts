import { GraphQLBoolean, GraphQLNonNull } from 'graphql';
import { ChangePostInput, CreatePostInput, PostType } from './post.type.js';
import { InputDto, WithId } from '../../models/args.js';
import { Prisma } from '@prisma/client';
import { Context } from '../../models/context.js';
import { PostService } from './post.service.js';
import { UUIDType } from '../../types/uuid.js';

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

  changePost: {
    type: PostType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
      dto: {
        type: ChangePostInput,
      },
    },
    resolve: async (
      _,
      { id, dto }: { id: string; dto: Prisma.PostUpdateInput },
      { prisma }: Context,
    ) => {
      return await PostService.update(id, dto, prisma);
    },
  },

  deletePost: {
    type: GraphQLBoolean,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_, { id }: WithId, { prisma }: Context) => {
      await PostService.delete(id, prisma);

      return null;
    },
  },
};
