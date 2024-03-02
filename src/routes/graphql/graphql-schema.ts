import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { userType } from './entities/user/types.js';
import { userQueries } from './entities/user/queries.js';

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
