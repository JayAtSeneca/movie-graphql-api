import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { PrismaClient } from '@prisma/client';
import { applyMiddleware } from 'graphql-middleware';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { shield } from 'graphql-shield';
import typeDefs from './schema';
import resolvers from './resolvers';
import { getUserId } from './utils';
import { rules } from './permissions';

const prisma = new PrismaClient();
const app = express();

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const permissions = shield(rules, { allowExternalErrors: true });
const schemaWithMiddleware = applyMiddleware(schema, permissions);

const server = new ApolloServer({
  schema: schemaWithMiddleware,
  context: ({ req }) => {
    return {
      req,
      prisma,
      userId: req && req.headers.authorization ? getUserId(req) : null,
    };
  },
});

async function startApolloServer() {
  await server.start();
  server.applyMiddleware({ app });
}

startApolloServer().then(() => {
  app.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  });
});
