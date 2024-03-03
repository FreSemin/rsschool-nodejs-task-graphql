import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLFloat } from 'graphql';
import { UUIDType } from '../../types/uuid.js';

// TODO: rename to upperCase
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
  }),
});
