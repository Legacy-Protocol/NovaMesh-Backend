import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './schema';

export async function registerGraphQL(app: any) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
}
