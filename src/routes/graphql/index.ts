import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, parse, validate } from 'graphql';
import graphQLSchema from './graphql-schema.js';
import depthLimit from 'graphql-depth-limit';
import { DataLoaders } from './data-loaders.js';

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
      const { query, variables } = req.body;

      const { prisma } = fastify;

      const validateDepthLimit = validate(graphQLSchema, parse(query), [depthLimit(5)]);

      if (validateDepthLimit.length) {
        return {
          errors: validateDepthLimit,
        };
      }

      const dataLoaders = DataLoaders(prisma);

      return await graphql({
        schema: graphQLSchema,
        source: query,
        variableValues: variables,
        contextValue: {
          prisma,
          dataLoaders,
        },
      });
    },
  });
};

export default plugin;
