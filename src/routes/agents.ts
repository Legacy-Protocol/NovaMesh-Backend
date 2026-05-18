import { Router } from 'express';
import { listAgents, getAgent, createAgent, updateAgent } from '../controllers/agentController';

export const agentRouter = Router();

agentRouter.get('/', listAgents);
agentRouter.get('/:id', getAgent);
agentRouter.post('/', createAgent);
agentRouter.put('/:id', updateAgent);
