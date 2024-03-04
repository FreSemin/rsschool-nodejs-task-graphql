import { GraphQLObjectType, GraphQLNonNull, GraphQLFloat, GraphQLInt } from 'graphql';
import { EMemberTypeId } from './member-type.models.js';

export const MemberType: GraphQLObjectType = new GraphQLObjectType({
  name: 'MemberType',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(EMemberTypeId),
    },
    discount: {
      type: GraphQLFloat,
    },
    postsLimitPerMonth: {
      type: GraphQLInt,
    },
    // add profiles type
  }),
});
