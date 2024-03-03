import { GraphQLList, GraphQLNonNull } from 'graphql';
import { PostType } from './post.type.js';
import { Context } from '../../models/context.js';
import { PostService } from './post.service.js';
import { WithId } from '../../models/args.js';
import { UUIDType } from '../../types/uuid.js';

export const postQueries = {
  posts: {
    type: new GraphQLList(PostType),
    resolve: async (_, args, { prisma }: Context) => {
      return await PostService.findAll(prisma);
    },
  },

  post: {
    type: PostType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_, { id }: WithId, { prisma }: Context) => {
      return await PostService.findOne(id, prisma);
    },
  },
};
