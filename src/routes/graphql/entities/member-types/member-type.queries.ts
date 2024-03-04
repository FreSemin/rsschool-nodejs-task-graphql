import { GraphQLList, GraphQLNonNull } from 'graphql';
import { MemberType } from './member-type.type.js';
import { Context } from '../../models/context.js';
import { MemberTypeService } from './member-type.service.js';
import { EMemberTypeId } from './member-type.models.js';
import { WithId } from '../../models/args.js';

export const memberTypeQueries = {
  memberTypes: {
    type: new GraphQLList(MemberType),
    resolve: async (_, args, { prisma }: Context) => {
      return await MemberTypeService.findAll(prisma);
    },
  },

  memberType: {
    type: MemberType,
    args: {
      id: {
        type: new GraphQLNonNull(EMemberTypeId),
      },
    },
    resolve: async (_, { id }: WithId, { prisma }: Context) => {
      return await MemberTypeService.findOne(id, prisma);
    },
  },
};
