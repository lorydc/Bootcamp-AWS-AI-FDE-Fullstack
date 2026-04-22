import prisma from "../database/prisma";
import { AppError } from "../errors/AppError";

interface CreateMovieDTO {
  title: string;
  description?: string;
  releaseYear: number;
  genre: string;
  directorId: number;
}

export async function createMovie(data: CreateMovieDTO) {
  const { title, description, releaseYear, genre, directorId } = data;

  if (!title || !genre || !releaseYear || !directorId) {
    throw new AppError("Missing required fields", 400);
  }

  const currentYear = new Date().getFullYear();
  
  if (releaseYear > currentYear) {
    throw new AppError("Invalid release year", 400);
  }
  if (description && description.length > 255) {
    throw new AppError("Description must be at most 255 characters", 400);
  }

  const director = await prisma.director.findUnique({
    where: { id: directorId }
  });
  if (!director) {
    throw new AppError("Director not found", 404);
  }
  return prisma.movie.create({
    data
  });
}