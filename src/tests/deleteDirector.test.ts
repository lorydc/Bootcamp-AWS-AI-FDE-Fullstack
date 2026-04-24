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
      movies: [{}]
    });

    expect(prisma.director.delete).toHaveBeenCalledWith({
  where: { id: 1 }
});
  });

  it("should delete successfully", async () => {
    (prisma.director.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      movies: []
    });

    await expect(deleteDirector(1)).resolves.not.toThrow();
  });

});