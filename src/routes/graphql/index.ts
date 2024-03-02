import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import {
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  graphql,
} from 'graphql';
import { Context, WithId } from './models/models.js';
import { UUIDType } from './types/uuid.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const userType = new GraphQLObjectType({
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

      const rootQuery = new GraphQLObjectType({
        name: 'query',
        fields: () => ({
          users: {
            type: new GraphQLList(userType),
            resolve: async (obj, args, { prisma }: Context) => {
              return await prisma.user.findMany();
            },
          },
          user: {
            type: userType,
            args: {
              id: {
                type: new GraphQLNonNull(UUIDType),
              },
            },
            resolve: async (_source, { id }: WithId, { prisma }: Context) => {
              return await prisma.user.findUnique({
                where: {
                  id: id,
                },
              });
            },
          },
        }),
      });

      const apiSchema: GraphQLSchema = new GraphQLSchema({
        query: rootQuery,
        types: [userType],
      });

      const { query, variables } = req.body;

      const { prisma } = fastify;

      return await graphql({
        schema: apiSchema,
        source: query,
        variableValues: variables,
        contextValue: {
          prisma,
        },
      });
    },
  });
};

export default plugin;
