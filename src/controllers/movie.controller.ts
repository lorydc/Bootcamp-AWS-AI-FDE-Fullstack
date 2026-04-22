import { Request, Response } from "express";
import { createMovie } from "../services/movie.service";
import { AppError } from "../errors/AppError";

export async function createMovieController(req: Request, res: Response) {
  try {
    const movie = await createMovie(req.body);

    return res.status(201).json(movie);

  } catch (error: unknown) {

    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        error: error.message
      });
    }

    return res.status(500).json({
      error: "Internal server error"
    });
  }
}