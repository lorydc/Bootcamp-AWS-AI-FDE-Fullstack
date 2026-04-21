import { Request, Response, NextFunction } from "express";

export function validateDirector(req: Request, res: Response, next: NextFunction) {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ rror: "name is required"});
  }

  if (name.length < 3 || name.length > 50) {
    return res.status(400).json({error: "name must be between 3 and 50 characters"});
  }
  
  return next();
}