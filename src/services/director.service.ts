import prisma from "../database/prisma";
import { AppError } from "../errors/AppError";

function validateName(name: string) {
  if (!name) {
    throw new AppError("Name is required", 400);
  }

  if (name.length < 3 || name.length > 50) {
    throw new AppError("Name must be between 3 and 50 characters", 400);
  }
}

export async function createDirector(name: string) {
  console.info("[SERVICE - CREATE DIRECTOR] Input:", { name });

  try {
    validateName(name);
    const existingDirector = await prisma.director.findUnique({
      where: { name }
    });
    console.info("[SERVICE - CREATE DIRECTOR] Checking existing director");

    if (existingDirector) {
      console.warn("[SERVICE - CREATE DIRECTOR] Director already exists");
      throw new AppError("Director already exists", 409);
    }
    const director = await prisma.director.create({
      data: { name }
    });

    console.info("[SERVICE - CREATE DIRECTOR] Success:", director);
    return director;

  } catch (error) {
    console.error("[SERVICE - CREATE DIRECTOR] Error:", error);
    throw error;
  }
}

export async function getAllDirectors() {
  console.info("[SERVICE - GET ALL DIRECTORS] Input: none");

  try {
    const directors = await prisma.director.findMany();

    console.info("[SERVICE - GET ALL DIRECTORS] Success:", {
      count: directors.length
    });

    return directors;

  } catch (error) {
    console.error("[SERVICE - GET ALL DIRECTORS] Error:", error);
    throw error;
  }
}

export async function deleteDirector(id: number) {
  console.info("[SERVICE - DELETE DIRECTOR] Input:", { id });

  try {
    const director = await prisma.director.findUnique({
      where: { id },
      include: { movies: true }
    });

    if (!director) {
      console.warn("[SERVICE - DELETE DIRECTOR] Director not found:", id);
      throw new AppError("Director not found", 404);
    }

    if (director.movies.length > 0) {
      console.warn("[SERVICE - DELETE DIRECTOR] Director has associated movies:", id);
      throw new AppError("Director has associated movies", 409);
    }

    await prisma.director.delete({
      where: { id }
    });

    console.info("[SERVICE - DELETE DIRECTOR] Success: director deleted", { id });

  } catch (error) {
    console.error("[SERVICE - DELETE DIRECTOR] Error:", error);
    throw error;
  }
}

export async function getMoviesByDirector(id: number) {
  console.info("[SERVICE - GET MOVIES BY DIRECTOR] Input:", { id });

  try {
    const director = await prisma.director.findUnique({
      where: { id },
      include: { movies: true }
    });

    if (!director) {
      console.warn("[SERVICE - GET MOVIES BY DIRECTOR] Director not found:", id);
      throw new AppError("Director not found", 404);
    }

    console.info("[SERVICE - GET MOVIES BY DIRECTOR] Success:", {
      directorId: id,
      moviesCount: director.movies.length
    });

    return director.movies;

  } catch (error) {
    console.error("[SERVICE - GET MOVIES BY DIRECTOR] Error:", error);
    throw error;
  }
}

export async function updateDirector(id: number, name: string) {
  console.info("[SERVICE - UPDATE DIRECTOR] Input:", { id, name });

  try {
    validateName(name);

    const director = await prisma.director.findUnique({
      where: { id }
    });

    if (!director) {
      console.warn("[SERVICE - UPDATE DIRECTOR] Director not found:", id);
      throw new AppError("Director not found", 404);
    }

    const updated = await prisma.director.update({
      where: { id },
      data: { name }
    });

    console.info("[SERVICE - UPDATE DIRECTOR] Success:", updated);

    return updated;

  } catch (error) {
    console.error("[SERVICE - UPDATE DIRECTOR] Error:", error);
    throw error;
  }
}