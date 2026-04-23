import { Request, Response, NextFunction } from "express";

export function validateDirector(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  next();
}