import { Request, Response, NextFunction } from "express";

export function validateDirector(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name } = req.body;

  if (name === undefined) {
    return res.status(400).json({
      error: "Name is required"
    });
  }

  if (typeof name !== "string") {
    return res.status(400).json({
      error: "Name must be a string"
    });
  }

  next();
}