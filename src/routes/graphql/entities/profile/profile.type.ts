import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import { UUIDType } from '../../types/uuid.js';
import { MemberType } from '../member-types/member-type.type.js';
import { Profile } from '@prisma/client';
import { Context } from '../../models/context.js';
import { MemberTypeService } from '../member-types/member-type.service.js';
import { EMemberTypeId } from '../member-types/member-type.models.js';

export const ProfileType: GraphQLObjectType = new GraphQLObjectType({
  name: 'ProfileType',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(UUIDType),
    },
    isMale: {
      type: GraphQLBoolean,
    },
    yearOfBirth: {
      type: GraphQLInt,
    },

    memberType: {
      type: MemberType,
      resolve: async (profile: Profile, args, { prisma }: Context) => {
        return await MemberTypeService.findOne(profile.memberTypeId, prisma);
      },
    },
  }),
});

export const CreateProfileInput: GraphQLInputObjectType = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: () => ({
    userId: {
      type: new GraphQLNonNull(UUIDType),
    },
    memberTypeId: {
      type: new GraphQLNonNull(EMemberTypeId),
    },
    isMale: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    yearOfBirth: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  }),
});
