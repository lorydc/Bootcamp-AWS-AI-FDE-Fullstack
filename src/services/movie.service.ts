import prisma from "../database/prisma";
import { AppError } from "../errors/AppError";
import { Prisma } from "@prisma/client";

export interface CreateMovieDTO {
  title: string;
  description?: string;
  releaseYear: number;
  genre: string;
  directorId: number;
}

export interface MovieFilters {
  title?: string;
  genre?: string;
  releaseYear?: number;
}

export async function getAllMovies(filters: MovieFilters) {
  const where: Prisma.MovieWhereInput = {};

  if (filters.title) {
    where.title = {
  contains: filters.title.toLowerCase()
  };
}

  if (filters.genre) {
    where.genre = filters.genre;
  }

  if (filters.releaseYear) {
    where.releaseYear = filters.releaseYear;
  }

  return prisma.movie.findMany({
    where,
    include: { director: true }
  });
}

export async function getMovieById(id: number) {
  const movie = await prisma.movie.findUnique({
    where: { id },
    include: { director: true }
  });

  if (!movie) {
    throw new AppError("Movie not found", 404);
  }

  return movie;
}

export async function deleteMovie(id: number) {
  const movie = await prisma.movie.findUnique({
    where: { id }
  });

  if (!movie) {
    throw new AppError("Movie not found", 404);
  }

  return prisma.movie.delete({
    where: { id }
  });
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

export async function updateMovie(id: number, data: CreateMovieDTO) {
  const movie = await prisma.movie.findUnique({
    where: { id }
  });

  if (!movie) {
    throw new AppError("Movie not found", 404);
  }

  return prisma.movie.update({
    where: { id },
    data
  });
}