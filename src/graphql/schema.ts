import { gql } from 'apollo-server-express';
import { prisma } from '../services/prisma';
import { cacheGet, cacheSet } from '../services/redis';

export const typeDefs = gql`
  type Agent {
    id: ID!
    name: String!
    description: String
    category: String
    iconUrl: String
    endpointUrl: String!
    pricePerCall: Float!
    subscriptionPrice: Float!
    verificationTier: Int!
    status: String!
    totalExecutions: Int!
    successRate: Float!
    avgRating: Float!
    createdAt: String!
    updatedAt: String!
  }

  input AgentFilterInput {
    category: String
    verificationTier: Int
    status: String
  }

  type Query {
    agents(filter: AgentFilterInput): [Agent!]!
    agent(id: ID!): Agent
    health: String!
  }
`;

export const resolvers = {
  Query: {
    agents: async (_parent: unknown, args: { filter?: Record<string, unknown> }) => {
      const cacheKey = args.filter ? `agents:${JSON.stringify(args.filter)}` : 'agents:all';
      const cached = await cacheGet<any[]>(cacheKey);
      if (cached) {
        return cached;
      }

      const where: Record<string, unknown> = {};

      if (args.filter?.category) {
        where.category = args.filter.category;
      }
      if (typeof args.filter?.verificationTier === 'number') {
        where.verificationTier = args.filter.verificationTier;
      }
      if (args.filter?.status) {
        where.status = args.filter.status;
      }

      const agents = await prisma.agent.findMany({
        where,
        orderBy: { createdAt: 'desc' },
      });

      await cacheSet(cacheKey, agents, 120);
      return agents;
    },
    agent: async (_parent: unknown, args: { id: string }) => {
      const cacheKey = `agent:${args.id}`;
      const cached = await cacheGet<any>(cacheKey);
      if (cached) {
        return cached;
      }

      const agent = await prisma.agent.findUnique({
        where: { id: args.id },
      });

      if (agent) {
        await cacheSet(cacheKey, agent, 120);
      }
      return agent;
    },
    health: () => 'ok',
  },
};
