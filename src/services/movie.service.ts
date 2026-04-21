import prisma from "../database/prisma";

export async function createMovie(data: {
  title: string;
  description?: string;
  releaseYear: number;
  genre: string;
  directorId: number;
}) {
  return await prisma.movie.create({
    data,
  });
}