import { updateMovie } from "../services/movie.service";
import prisma from "../database/prisma";

jest.mock("../database/prisma", () => ({
  movie: {
    findUnique: jest.fn(),
    update: jest.fn(),
  },
}));

describe("Update Movie", () => {

  it("should throw error if movie does not exist", async () => {
    (prisma.movie.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(updateMovie(1, {
      title: "Test",
      genre: "Action",
      releaseYear: 2020,
      directorId: 1
    })).rejects.toThrow("Movie not found");
  });

  it("should update movie successfully", async () => {
    (prisma.movie.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      title: "Old Movie"
    });

    (prisma.movie.update as jest.Mock).mockResolvedValue({
      id: 1,
      title: "New Movie"
    });

    const result = await updateMovie(1, {
      title: "New Movie",
      genre: "Action",
      releaseYear: 2020,
      directorId: 1
    });

    expect(result.title).toBe("New Movie");
  });

});