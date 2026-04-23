import { deleteMovie } from "../services/movie.service";
import prisma from "../database/prisma";

jest.mock("../database/prisma", () => ({
  movie: {
    findUnique: jest.fn(),
    delete: jest.fn(),
  },
}));

describe("Delete Movie", () => {

  it("should delete movie successfully", async () => {
    (prisma.movie.findUnique as jest.Mock).mockResolvedValue({
      id: 1
    });

    (prisma.movie.delete as jest.Mock).mockResolvedValue({});

    await expect(deleteMovie(1)).resolves.not.toThrow();
  });

  it("should throw error if movie does not exist", async () => {
    (prisma.movie.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(deleteMovie(1))
      .rejects.toThrow("Movie not found");
  });

});