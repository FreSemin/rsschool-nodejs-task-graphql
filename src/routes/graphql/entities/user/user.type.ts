import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
} from 'graphql';
import { UUIDType } from '../../types/uuid.js';
import { ProfileType } from '../profile/profile.type.js';
import { ProfileService } from '../profile/profile.service.js';
import { User } from '@prisma/client';
import { Context } from '../../models/context.js';
import { PostType } from '../post/post.type.js';
import { PostService } from '../post/post.service.js';
import { UserService } from './user.service.js';

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
        return await ProfileService.findOneByUserId(user.id, prisma);
      },
    },

    posts: {
      type: new GraphQLList(PostType),
      resolve: async (user: User, args, { prisma }: Context) => {
        return await PostService.findAllByUserId(user.id, prisma);
      },
    },

    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async (user: User, args, { prisma }: Context) => {
        return await UserService.findUserSubscribedToUsers(user.id, prisma);
      },
    },
  }),
});
