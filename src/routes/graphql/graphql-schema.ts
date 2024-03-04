import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { ChangeUserInput, CreateUserInput, UserType } from './entities/user/user.type.js';
import { userQueries } from './entities/user/user.queries.js';
import { MemberType } from './entities/member-types/member-type.type.js';
import { memberTypeQueries } from './entities/member-types/member-type.queries.js';
import { postQueries } from './entities/post/post.queries.js';
import { ChangePostInput, CreatePostInput, PostType } from './entities/post/post.type.js';
import { profileQueries } from './entities/profile/profile.queries.js';
import { CreateProfileInput, ProfileType } from './entities/profile/profile.type.js';
import { userMutations } from './entities/user/user.mutations.js';
import { postMutations } from './entities/post/post.mutations.js';
import { profileMutations } from './entities/profile/profile.mutations.js';

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
    ...postMutations,
    ...profileMutations,
  }),
});

const graphQLSchema: GraphQLSchema = new GraphQLSchema({
  query: queries,
  mutation: mutations,
  // TODO: load types as queries
  types: [
    UserType,
    MemberType,
    PostType,
    ProfileType,
    CreateUserInput,
    CreatePostInput,
    CreateProfileInput,
    ChangeUserInput,
    ChangePostInput,
  ],
});

export default graphQLSchema;
