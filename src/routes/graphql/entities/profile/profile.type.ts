import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { UUIDType } from '../../types/uuid.js';
import { MemberType } from '../member-types/member-type.type.js';
import { Profile } from '@prisma/client';
import { Context } from '../../models/context.js';
import { MemberTypeService } from '../member-types/member-type.service.js';

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
