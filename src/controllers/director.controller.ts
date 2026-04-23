import { Request, Response } from "express";
import {
  createDirector,
  getAllDirectors,
  getDirectorById,
  deleteDirector,
  getMoviesByDirector,
  updateDirector
} from "../services/director.service";
import { AppError } from "../errors/AppError";

type CreateDirectorBody = {
  name: string;
};

export async function createDirectorController(
  req: Request<{}, {}, CreateDirectorBody>,
  res: Response
) {
  try {
    const { name } = req.body;

    const director = await createDirector(name);

    return res.status(201).json(director);

  } catch (error: unknown) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getAllDirectorsController(req: Request, res: Response) {
  try {
    const directors = await getAllDirectors();

    return res.status(200).json(directors);

  } catch (error: unknown) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getDirectorByIdController(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const director = await getDirectorById(id);

    return res.status(200).json(director);

  } catch (error: unknown) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteDirectorController(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    await deleteDirector(id);

    return res.status(204).send();

  } catch (error: unknown) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getMoviesByDirectorController(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const movies = await getMoviesByDirector(id);

    return res.status(200).json(movies);

  } catch (error: unknown) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateDirectorController(
  req: Request<{ id: string }, {}, CreateDirectorBody>,
  res: Response
) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const { name } = req.body;

    const director = await updateDirector(id, name);

    return res.status(200).json(director);

  } catch (error: unknown) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
}