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
  console.info("[INPUT - GET ALL MOVIES]", {
    query: req.query
  });

  try {
    const { title, genre, releaseYear } = req.query as MovieQuery;
    const movies = await getAllMovies({
      title,
      genre,
      releaseYear: releaseYear ? Number(releaseYear) : undefined
    });
    console.info("[SUCCESS - GET ALL MOVIES]", {
      count: movies.length
    });
    return res.status(200).json(movies);

  } catch (error: unknown) {
    console.error("[ERROR - GET ALL MOVIES]", error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getMovieByIdController(req: Request, res: Response) {
  console.info("[INPUT - GET MOVIE BY ID]", {
    params: req.params
  });

  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      console.warn("[INVALID INPUT - GET MOVIE BY ID] ID is not a number:", req.params.id);
      return res.status(400).json({ error: "Invalid ID" });
    }
    const movie = await getMovieById(id);
    console.info("[SUCCESS - GET MOVIE BY ID]", {
      movieId: id,
      movie
    });
    return res.status(200).json(movie);

  } catch (error: unknown) {
    console.error("[ERROR - GET MOVIE BY ID]", error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteMovieController(req: Request, res: Response) {
  console.info("[INPUT - DELETE MOVIE]", {
    params: req.params
  });

  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      console.warn("[INVALID INPUT - DELETE MOVIE] ID is not a number:", req.params.id);
      return res.status(400).json({ error: "Invalid ID" });
    }
    await deleteMovie(id);
    console.info("[SUCCESS - DELETE MOVIE]", {
      movieId: id
    });
    return res.status(204).send();

  } catch (error: unknown) {
    console.error("[ERROR - DELETE MOVIE]", error);
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
  console.info("[INPUT - CREATE MOVIE]", {
    body: req.body
  });

  try {
    const movie = await createMovie(req.body);
    console.info("[SUCCESS - CREATE MOVIE]", {
      movie
    });

    return res.status(201).json(movie);

  } catch (error: unknown) {
    console.error("[ERROR - CREATE MOVIE]", error);
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
  console.info("[INPUT - UPDATE MOVIE]", {
    params: req.params,
    body: req.body
  });

  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      console.warn("[INVALID INPUT - UPDATE MOVIE] ID is not a number:", req.params.id);
      return res.status(400).json({ error: "Invalid ID" });
    }
    const movie = await updateMovie(id, req.body);
    console.info("[SUCCESS - UPDATE MOVIE]", {
      movieId: id,
      movie
    });
    return res.status(200).json(movie);

  } catch (error: unknown) {
    console.error("[ERROR - UPDATE MOVIE]", error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
}