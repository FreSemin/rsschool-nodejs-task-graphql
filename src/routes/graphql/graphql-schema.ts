import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { CreateUserInput, UserType } from './entities/user/user.type.js';
import { userQueries } from './entities/user/user.queries.js';
import { MemberType } from './entities/member-types/member-type.type.js';
import { memberTypeQueries } from './entities/member-types/member-type.queries.js';
import { postQueries } from './entities/post/post.queries.js';
import { PostType } from './entities/post/post.type.js';
import { profileQueries } from './entities/profile/profile.queries.js';
import { ProfileType } from './entities/profile/profile.type.js';
import { userMutations } from './entities/user/user.mutations.js';

const queries: GraphQLObjectType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    ...userQueries,
    ...memberTypeQueries,
    ...postQueries,
    ...profileQueries,
  }),
});

const mutations: GraphQLObjectType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...userMutations,
  }),
});

const graphQLSchema: GraphQLSchema = new GraphQLSchema({
  query: queries,
  mutation: mutations,
  // TODO: load types as queries
  types: [UserType, MemberType, PostType, ProfileType, CreateUserInput],
});

export default graphQLSchema;
