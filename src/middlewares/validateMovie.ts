import { Request, Response, NextFunction } from "express";

export function validateMovie(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { title, releaseYear, genre, directorId } = req.body;

  if (
    title === undefined ||
    genre === undefined ||
    releaseYear === undefined ||
    directorId === undefined
  ) {
    return res.status(400).json({
      error: "title, genre, releaseYear and directorId are required"
    });
  }

  if (typeof releaseYear !== "number") {
    return res.status(400).json({
      error: "releaseYear must be a number"
    });
  }

  if (typeof directorId !== "number") {
    return res.status(400).json({
      error: "directorId must be a number"
    });
  }

  next();
}