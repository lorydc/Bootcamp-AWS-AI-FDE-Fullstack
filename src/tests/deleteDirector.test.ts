import { deleteDirector } from "../services/director.service";
import prisma from "../database/prisma";

jest.mock("../database/prisma", () => ({
  director: {
    findUnique: jest.fn(),
    delete: jest.fn(),
  },
}));

describe("Delete Director", () => {

  it("should throw error if director has movies", async () => {
    (prisma.director.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      movies: [{ id: 1 }]
    });

    await expect(deleteDirector(1))
      .rejects.toThrow("Director has associated movies");
  });

  it("should delete successfully", async () => {
    (prisma.director.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      movies: []
    });

    (prisma.director.delete as jest.Mock).mockResolvedValue({});

    await expect(deleteDirector(1)).resolves.not.toThrow();
    expect(prisma.director.delete).toHaveBeenCalledWith({
      where: { id: 1 }
    });
  });

});