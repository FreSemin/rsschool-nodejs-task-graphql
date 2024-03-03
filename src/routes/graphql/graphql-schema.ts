import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { UserType } from './entities/user/user.type.js';
import { userQueries } from './entities/user/user.queries.js';
import { MemberType } from './entities/member-types/member-type.type.js';
import { memberTypeQueries } from './entities/member-types/member-type.queries.js';
import { postQueries } from './entities/post/post.queries.js';
import { PostType } from './entities/post/post.type.js';

const queries: GraphQLObjectType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    ...userQueries,
    ...memberTypeQueries,
    ...postQueries,
  }),
});

const graphQLSchema: GraphQLSchema = new GraphQLSchema({
  query: queries,
  types: [UserType, MemberType, PostType],
});

export default graphQLSchema;
