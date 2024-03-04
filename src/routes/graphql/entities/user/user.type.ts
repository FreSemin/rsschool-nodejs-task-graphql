import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLInputObjectType,
} from 'graphql';
import { UUIDType } from '../../types/uuid.js';
import { ProfileType } from '../profile/profile.type.js';
import { User } from '@prisma/client';
import { Context } from '../../models/context.js';
import { PostType } from '../post/post.type.js';

export const UserType: GraphQLObjectType = new GraphQLObjectType({
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
      resolve: async (user: User, args, { dataLoaders }: Context) => {
        return dataLoaders.profileLoader.load(user.id);
      },
    },

    posts: {
      type: new GraphQLList(PostType),
      resolve: async (user: User, args, { dataLoaders }: Context) => {
        return dataLoaders.postLoader.load(user.id);
      },
    },

    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async (user: User, args, { dataLoaders }: Context) => {
        return dataLoaders.userSubscribedToLoader.load(user.id);
      },
    },

    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async (user: User, args, { dataLoaders }: Context) => {
        return dataLoaders.subscribedToUserLoader.load(user.id);
      },
    },
  }),
});

export const CreateUserInput: GraphQLInputObjectType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    balance: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
  }),
});

export const ChangeUserInput: GraphQLInputObjectType = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: () => ({
    name: {
      type: GraphQLString,
    },
    balance: {
      type: GraphQLFloat,
    },
  }),
});
