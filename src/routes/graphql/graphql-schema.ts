import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { userType } from './entities/user/user.types.js';
import { userQueries } from './entities/user/user.queries.js';
import { MemberType } from './entities/member-types/member-type.type.js';
import { memberTypeQueries } from './entities/member-types/member-type.queries.js';

const queries: GraphQLObjectType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    ...userQueries,
    ...memberTypeQueries,
  }),
});

const graphQLSchema: GraphQLSchema = new GraphQLSchema({
  query: queries,
  types: [userType, MemberType],
});

export default graphQLSchema;
