import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { userType } from './entities/user/user.types.js';
import { userQueries } from './entities/user/user.queries.js';

const queries: GraphQLObjectType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    ...userQueries,
  }),
});

const graphQLSchema: GraphQLSchema = new GraphQLSchema({
  query: queries,
  types: [userType],
});

export default graphQLSchema;
