import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLFloat } from 'graphql';

export const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    name: {
      type: GraphQLString,
    },
    balance: {
      type: GraphQLFloat,
    },
  }),
});
