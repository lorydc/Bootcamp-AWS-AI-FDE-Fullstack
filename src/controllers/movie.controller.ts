import { Request, Response, NextFunction } from "express";
import {
  createMovie,
  getAllMovies,
  getMovieById,
  deleteMovie,
  updateMovie
} from "../services/movie.service";

export async function createMovieController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const movie = await createMovie(req.body);
    return res.status(201).json(movie);
  } catch (error) {
    next(error);
  }
}

export async function getAllMoviesController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const filters = {
      title: req.query.title as string | undefined,
      genre: req.query.genre as string | undefined,
      releaseYear: req.query.releaseYear
        ? Number(req.query.releaseYear)
        : undefined
    };

    const movies = await getAllMovies(filters);
    return res.json(movies);
  } catch (error) {
    next(error);
  }
}

export async function getMovieByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);
    const movie = await getMovieById(id);
    return res.json(movie);
  } catch (error) {
    next(error);
  }
}

export async function deleteMovieController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);
    await deleteMovie(id);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export async function updateMovieController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);
    const movie = await updateMovie(id, req.body);
    return res.json(movie);
  } catch (error) {
    next(error);
  }
}