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
  validateName(name);

  const existingDirector = await prisma.director.findUnique({
    where: { name }
  });

  if (existingDirector) {
    throw new AppError("Director already exists", 409);
  }

  return prisma.director.create({
    data: { name }
  });
}

export async function getAllDirectors() {
  return prisma.director.findMany();
}

export async function getDirectorById(id: number) {
  const director = await prisma.director.findUnique({
    where: { id }
  });

  if (!director) {
    throw new AppError("Director not found", 404);
  }

  return director;
}

export async function deleteDirector(id: number) {
  const director = await prisma.director.findUnique({
    where: { id },
    include: { movies: true }
  });

  if (!director) {
    throw new AppError("Director not found", 404);
  }

  if (director.movies.length > 0) {
    throw new AppError("Director has associated movies", 409);
  }

  await prisma.director.delete({
    where: { id }
  });
}

export async function getMoviesByDirector(id: number) {
  const director = await prisma.director.findUnique({
    where: { id },
    include: { movies: true }
  });

  if (!director) {
    throw new AppError("Director not found", 404);
  }

  return director.movies;
}

export async function updateDirector(id: number, name: string) {
  validateName(name);

  const director = await prisma.director.findUnique({
    where: { id }
  });

  if (!director) {
    throw new AppError("Director not found", 404);
  }

  const existingDirector = await prisma.director.findUnique({
    where: { name }
  });

  if (existingDirector && existingDirector.id !== id) {
    throw new AppError("Director already exists", 409);
  }

  return prisma.director.update({
    where: { id },
    data: { name }
  });
}