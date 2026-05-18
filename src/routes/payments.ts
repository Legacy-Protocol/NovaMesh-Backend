import { Router } from 'express';
import {
  handleX402Payment,
  createMppSession,
  settleMppSession,
} from '../controllers/paymentController';

export const paymentRouter = Router();

paymentRouter.post('/x402', handleX402Payment);
paymentRouter.post('/mpp/session', createMppSession);
paymentRouter.post('/mpp/settle', settleMppSession);
