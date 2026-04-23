import { getMovieById } from "../services/movie.service";
import prisma from "../database/prisma";

jest.mock("../database/prisma", () => ({
  movie: {
    findUnique: jest.fn(),
  },
}));

describe("Get Movie By Id", () => {

  it("should return movie when found", async () => {
    (prisma.movie.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      title: "Test"
    });

    const result = await getMovieById(1);

    expect(result.id).toBe(1);
  });

  it("should throw error when movie not found", async () => {
    (prisma.movie.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(getMovieById(1))
      .rejects.toThrow("Movie not found");
  });

});