import { Request, Response } from 'express';
import { prisma } from '../services/prisma';
import { cacheGet, cacheSet, cacheDel } from '../services/redis';

export const listAgents = async (req: Request, res: Response) => {
  const cacheKey = 'agents:active';
  const cached = await cacheGet<any[]>(cacheKey);
  if (cached) {
    return res.json(cached);
  }

  const agents = await prisma.agent.findMany({
    where: { status: 'active' },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });

  await cacheSet(cacheKey, agents, 120);
  return res.json(agents);
};

export const getAgent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const cacheKey = `agent:${id}`;
  const cached = await cacheGet<any>(cacheKey);
  if (cached) {
    return res.json(cached);
  }

  const agent = await prisma.agent.findUnique({ where: { id } });
  if (!agent) {
    return res.status(404).json({ error: 'Agent not found' });
  }

  await cacheSet(cacheKey, agent, 120);
  return res.json(agent);
};

export const createAgent = async (req: Request, res: Response) => {
  const { creatorId, name, description, category, endpointUrl, pricePerCall } = req.body;
  const agent = await prisma.agent.create({
    data: {
      creatorId,
      name,
      description,
      category,
      endpointUrl,
      pricePerCall,
      verificationTier: 0,
      status: 'active',
    },
  });

  await cacheDel('agents:active');
  return res.status(201).json(agent);
};

export const updateAgent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  const agent = await prisma.agent.update({
    where: { id },
    data: updates,
  });

  await cacheDel('agents:active');
  await cacheDel(`agent:${id}`);
  return res.json(agent);
};
