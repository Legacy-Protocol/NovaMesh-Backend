import { Request, Response } from 'express';

export const login = async (req: Request, res: Response) => {
  return res.status(200).json({ message: 'Auth login placeholder' });
};

export const logout = async (req: Request, res: Response) => {
  return res.status(200).json({ message: 'Auth logout placeholder' });
};

export const getCurrentUser = async (req: Request, res: Response) => {
  return res.status(200).json({ message: 'Current user placeholder' });
};
