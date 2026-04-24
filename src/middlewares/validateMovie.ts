import { Request, Response, NextFunction } from "express";

export function validateMovie(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { title, releaseYear, genre, directorId } = req.body;

  if (!title || title.trim() === "") {
  return res.status(400).json({
    error: "title is required"
  });
}

  if (typeof releaseYear !== "number") {
    return res.status(400).json({
      error: "releaseYear must be a number"
    });
  }

  const currentYear = new Date().getFullYear();

if (releaseYear > currentYear) {
  return res.status(400).json({
    error: "releaseYear cannot be greater than current year"
  });
}

if (typeof genre !== "string" || genre.trim() === "") {
  return res.status(400).json({
    error: "genre is required and must be a string"
  });
}

  if (typeof directorId !== "number") {
    return res.status(400).json({
      error: "directorId must be a number"
    });
  }

  next();
}