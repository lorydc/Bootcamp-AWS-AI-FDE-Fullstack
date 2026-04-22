import prisma from "../database/prisma";
import { AppError } from "../errors/AppError";

export async function createDirector(name: string) {

  if (!name) {
    throw new AppError("Name is required", 400);
  }

  if (name.length < 3 || name.length > 50) {
    throw new AppError("Name must be between 3 and 50 characters", 400);
  }

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