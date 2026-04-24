import { Request, Response } from "express";
import {
  getAllMovies,
  getMovieById,
  deleteMovie,
  createMovie,
  updateMovie,
  CreateMovieDTO
} from "../services/movie.service";
import { AppError } from "../errors/AppError";

type MovieQuery = {
  title?: string;
  genre?: string;
  releaseYear?: string;
};

export async function getAllMoviesController(req: Request, res: Response) {
  try {
    const { title, genre, releaseYear } = req.query as MovieQuery;

    const movies = await getAllMovies({
      title,
      genre,
      releaseYear: releaseYear ? Number(releaseYear) : undefined
    });

    return res.status(200).json(movies);

  } catch (error: unknown) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getMovieByIdController(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const movie = await getMovieById(id);

    return res.status(200).json(movie);

  } catch (error: unknown) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteMovieController(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    await deleteMovie(id);

    return res.status(204).send();

  } catch (error: unknown) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function createMovieController(
  req: Request<{}, {}, CreateMovieDTO>,
  res: Response
) {
  console.info("[CREATE MOVIE] Body received:", req.body);
  try {
    const movie = await createMovie(req.body);
    console.info("[CREATE MOVIE] Success:", movie);
    return res.status(201).json(movie);
  } catch (error: unknown) {
    console.error("[CREATE MOVIE] Error:", error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateMovieController(
  req: Request<{ id: string }, {}, CreateMovieDTO>,
  res: Response
) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const movie = await updateMovie(id, req.body);

    return res.status(200).json(movie);

  } catch (error: unknown) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
}