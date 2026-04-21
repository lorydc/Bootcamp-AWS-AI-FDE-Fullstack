import { Request, Response } from "express";
import { createDirector } from "../services/director.service";

export async function createDirectorController(req: Request, res: Response) {
  try {
    const name = req.body.name;
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    if (name.length < 3 || name.length > 50) {
      return res.status(400).json({
        error: "Name must be between 3 and 50 characters"
      });
    }
    const director = await createDirector(name);

    return res.status(201).json(director);

  } catch (error: any) {
    if (error.message === "Director already exists") {
      return res.status(409).json({ error: error.message });
    }

   return res.status(500).json({ error: String(error) });
  }
}