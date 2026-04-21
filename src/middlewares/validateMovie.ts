import { Request, Response, NextFunction } from "express";

export function validateMovie(req: Request, res: Response, next: NextFunction) {
  const { title, releaseYear, genre, directorId, description } = req.body;

  const currentYear = new Date().getFullYear();

  if (!title || !genre || !releaseYear || !directorId) {
    return res.status(400).json({
      error: "title, genre, releaseYear and directorId are required"
    });
  }

  if (typeof releaseYear !== "number" || releaseYear > currentYear) {
    return res.status(400).json({
      error: "releaseYear must be a valid year"
    });
  }

  if (description && description.length > 255) {
    return res.status(400).json({
      error: "description must be at most 255 characters"
    });
  }

  return next();
}