import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from '../../types/uuid.js';

export const PostType: GraphQLObjectType = new GraphQLObjectType({
  name: 'PostType',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(UUIDType),
    },
    title: {
      type: GraphQLString,
    },
    content: {
      type: GraphQLString,
    },
    // TODO: add author fields
  }),
});
