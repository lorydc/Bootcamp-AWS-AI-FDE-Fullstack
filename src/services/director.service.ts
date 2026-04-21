import prisma from "../database/prisma";

export async function createDirector(name: string) {
  const exists = await prisma.director.findUnique({
    where: { name }
  });

  if (exists) {
    throw new Error("Director already exists");
  }
  const director = await prisma.director.create({
    data: {
      name: name
    }
  });

  return director;
}