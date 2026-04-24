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
  req: Request,
  res: Response
) {
  console.info("[INPUT - CREATE DIRECTOR]", {
    body: req.body
  });

  try {
    const { name } = req.body;
    const director = await createDirector(name);
    console.info("[SUCCESS - CREATE DIRECTOR]", {
      director
    });
    return res.status(201).json(director);

  } catch (error: unknown) {
    console.error("[ERROR - CREATE DIRECTOR]", error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getAllDirectorsController(req: Request, res: Response) {
  console.info("[INPUT - GET ALL DIRECTORS]", {
    query: req.query
  });

  try {
    const directors = await getAllDirectors();
    console.info("[SUCCESS - GET ALL DIRECTORS]", {
      count: directors.length
    });
    return res.status(200).json(directors);

  } catch (error: unknown) {
    console.error("[ERROR - GET ALL DIRECTORS]", error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getDirectorByIdController(req: Request, res: Response) {
  console.info("[INPUT - GET DIRECTOR BY ID]", {
    params: req.params
  });

  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      console.warn("[INVALID INPUT - GET DIRECTOR BY ID] ID is not a number:", req.params.id);
      return res.status(400).json({ error: "Invalid ID" });
    }
    const director = await getDirectorById(id);
    console.info("[SUCCESS - GET DIRECTOR BY ID]", {
      directorId: id,
      director
    });
    return res.status(200).json(director);

  } catch (error: unknown) {
    console.error("[ERROR - GET DIRECTOR BY ID]", error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
}
export async function deleteDirectorController(req: Request, res: Response) {
  console.info("[INPUT - DELETE DIRECTOR]", {
    params: req.params
  });

  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      console.warn("[INVALID INPUT - DELETE DIRECTOR] ID is not a number:", req.params.id);
      return res.status(400).json({ error: "Invalid ID" });
    }
    await deleteDirector(id);
    console.info("[SUCCESS - DELETE DIRECTOR] Director deleted successfully:", {
      directorId: id
    });
    return res.status(204).send();

  } catch (error: unknown) {
    console.error("[ERROR - DELETE DIRECTOR]", error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getMoviesByDirectorController(req: Request, res: Response) {
  console.info("[INPUT - GET MOVIES BY DIRECTOR]", {
    params: req.params
  });

  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      console.warn("[INVALID INPUT - GET MOVIES BY DIRECTOR] ID is not a number:", req.params.id);
      return res.status(400).json({ error: "Invalid ID" });
    }
    const movies = await getMoviesByDirector(id);
    console.info("[SUCCESS - GET MOVIES BY DIRECTOR]", {
      directorId: id,
      moviesCount: movies.length
    });
    return res.status(200).json(movies);

  } catch (error: unknown) {
    console.error("[ERROR - GET MOVIES BY DIRECTOR]", error);
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
  console.info("[INPUT - UPDATE DIRECTOR]", {
    params: req.params,
    body: req.body
  });

  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      console.warn("[INVALID INPUT - UPDATE DIRECTOR] ID is not a number:", req.params.id);
      return res.status(400).json({ error: "Invalid ID" });
    }
    const { name } = req.body;
    const director = await updateDirector(id, name);
    console.info("[SUCCESS - UPDATE DIRECTOR] Director updated successfully:", director);
    return res.status(200).json(director);

  } catch (error: unknown) {
    console.error("[ERROR - UPDATE DIRECTOR]", error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
}