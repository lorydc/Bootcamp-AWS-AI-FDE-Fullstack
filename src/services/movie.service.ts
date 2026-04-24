import prisma from "../database/prisma";
import { AppError } from "../errors/AppError";
import { CreateMovieDTO, MovieFilters } from "../models/movie.model";

export async function getAllMovies(filters: MovieFilters) {
  console.info("[SERVICE - GET ALL MOVIES] Input:", filters);

  try {
    const where: {
      title?: { contains: string };
      genre?: string;
      releaseYear?: number;
    } = {};
    if (filters.title) {
      where.title = {
        contains: filters.title
      };
    }
    if (filters.genre) {
      where.genre = filters.genre;
    }
    if (filters.releaseYear) {
      where.releaseYear = filters.releaseYear;
    }

    const movies = await prisma.movie.findMany({
      where,
      include: { director: true }
    });
    console.info("[SERVICE - GET ALL MOVIES] Success:", {
      count: movies.length
    });
    return movies;

  } catch (error) {
    console.error("[SERVICE - GET ALL MOVIES] Error:", error);
    throw error;
  }
}

export async function getMovieById(id: number) {
  console.info("[SERVICE - GET MOVIE BY ID] Input:", { id });

  try {
    const movie = await prisma.movie.findUnique({
      where: { id },
      include: { director: true }
    });
    if (!movie) {
      console.warn("[SERVICE - GET MOVIE BY ID] Movie not found:", id);
      throw new AppError("Movie not found", 404);
    }
    console.info("[SERVICE - GET MOVIE BY ID] Success:", movie);
    return movie;

  } catch (error) {
    console.error("[SERVICE - GET MOVIE BY ID] Error:", error);
    throw error;
  }
}

export async function deleteMovie(id: number) {
  console.info("[SERVICE - DELETE MOVIE] Input:", { id });

  try {
    const movie = await prisma.movie.findUnique({
      where: { id }
    });
    if (!movie) {
      console.warn("[SERVICE - DELETE MOVIE] Movie not found:", id);
      throw new AppError("Movie not found", 404);
    }
    await prisma.movie.delete({
      where: { id }
    });
    console.info("[SERVICE - DELETE MOVIE] Success: movie deleted", { id });

  } catch (error) {
    console.error("[SERVICE - DELETE MOVIE] Error:", error);
    throw error;
  }
}

export async function createMovie(data: CreateMovieDTO) {
  console.info("[SERVICE - CREATE MOVIE] Input:", data);

  try {
    const { title, description, releaseYear, genre, directorId } = data;
    if (!title || !genre || !releaseYear || !directorId) {
      console.warn("[SERVICE - CREATE MOVIE] Missing required fields");
      throw new AppError("Missing required fields", 400);
    }
    const currentYear = new Date().getFullYear();
    if (releaseYear > currentYear) {
      console.warn("[SERVICE - CREATE MOVIE] Invalid release year:", releaseYear);
      throw new AppError("Invalid release year", 400);
    }
    if (description && description.length > 255) {
      console.warn("[SERVICE - CREATE MOVIE] Description too long");
      throw new AppError("Description must be at most 255 characters", 400);
    }
    const director = await prisma.director.findUnique({
      where: { id: directorId }
    });
    if (!director) {
      console.warn("[SERVICE - CREATE MOVIE] Director not found:", directorId);
      throw new AppError("Director not found", 404);
    }
    const movie = await prisma.movie.create({
      data
    });
    console.info("[SERVICE - CREATE MOVIE] Success:", movie);
    return movie;

  } catch (error) {
    console.error("[SERVICE - CREATE MOVIE] Error:", error);
    throw error;
  }
}

export async function updateMovie(id: number, data: CreateMovieDTO) {
  console.info("[SERVICE - UPDATE MOVIE] Input:", { id, data });
  try {
    const movie = await prisma.movie.findUnique({
      where: { id }
    });
    if (!movie) {
      console.warn("[SERVICE - UPDATE MOVIE] Movie not found:", id);
      throw new AppError("Movie not found", 404);
    }
    const updated = await prisma.movie.update({
      where: { id },
      data
    });
    console.info("[SERVICE - UPDATE MOVIE] Success:", updated);
    return updated;

  } catch (error) {
    console.error("[SERVICE - UPDATE MOVIE] Error:", error);
    throw error;
  }
}