import { Router } from 'express';
import { login, logout, getCurrentUser } from '../controllers/authController';

export const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.get('/user', getCurrentUser);
