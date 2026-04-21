import { Request, Response } from "express";
import { createMovie } from "../services/movie.service";

export async function createMovieController(req: Request, res: Response) {
  try {
    const movie = await createMovie(req.body);

    return res.status(201).json(movie);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}