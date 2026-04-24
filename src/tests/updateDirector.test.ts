import { updateDirector } from "../services/director.service";
import prisma from "../database/prisma";

jest.mock("../database/prisma", () => ({
  director: {
    findUnique: jest.fn(),
    update: jest.fn(),
  },
}));

describe("Update Director", () => {

  it("should throw error if director does not exist", async () => {
    (prisma.director.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(updateDirector(1, "New Name"))
      .rejects.toThrow("Director not found");
  });

  it("should update director successfully", async () => {
    (prisma.director.findUnique as jest.Mock)
      .mockResolvedValueOnce({ id: 1, name: "Old Name" }) 
      .mockResolvedValueOnce(null);

    (prisma.director.update as jest.Mock).mockResolvedValue({
      id: 1,
      name: "New Name"
    });

    const result = await updateDirector(1, "New Name");

    expect(result.name).toBe("New Name");
  });

});