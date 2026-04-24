import { getAllMovies } from "../services/movie.service";
import prisma from "../database/prisma";

jest.mock("../database/prisma", () => ({
  movie: {
    findMany: jest.fn(),
  },
}));

describe("Get All Movies", () => {

  it("should return all movies", async () => {
    (prisma.movie.findMany as jest.Mock).mockResolvedValue([
      { id: 1, title: "Movie 1" },
      { id: 2, title: "Movie 2" }
    ]);

    const result = await getAllMovies({});

    expect(result.length).toBe(2);
    expect(prisma.movie.findMany).toHaveBeenCalledWith({
      where: {},
      include: { director: true }
    });
  });

  it("should filter movies by title", async () => {
    (prisma.movie.findMany as jest.Mock).mockResolvedValue([]);

    await getAllMovies({ title: "test" });

    expect(prisma.movie.findMany).toHaveBeenCalledWith({
      where: {
        title: {
          contains: "test"
        }
      },
      include: { director: true }
    });
  });

  it("should filter movies by release year", async () => {
    (prisma.movie.findMany as jest.Mock).mockResolvedValue([]);

    await getAllMovies({ releaseYear: 2020 });

    expect(prisma.movie.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { releaseYear: 2020 }
      })
    );
  });

});