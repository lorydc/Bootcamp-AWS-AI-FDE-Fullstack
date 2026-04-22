import { Request, Response } from "express";
import { createDirector } from "../services/director.service";
import { AppError } from "../errors/AppError";

export async function createDirectorController(req: Request, res: Response) {
  try {
    const director = await createDirector(req.body.name);

    return res.status(201).json(director);

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