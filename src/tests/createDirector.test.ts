import { createDirector } from "../services/director.service";
import prisma from "../database/prisma";

jest.mock("../database/prisma", () => ({
  director: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
}));

describe("Create Director", () => {

  it("should throw error if name is missing", async () => {
    await expect(createDirector("")).rejects.toThrow("Name is required");
  });

  it("should throw error if name is invalid", async () => {
    await expect(createDirector("ab")).rejects.toThrow();
  });

  it("should throw error if director already exists", async () => {
    (prisma.director.findUnique as jest.Mock).mockResolvedValue({ id: 1 });

    await expect(createDirector("Test"))
      .rejects.toThrow("Director already exists");
  });

  it("should create director successfully", async () => {
    (prisma.director.findUnique as jest.Mock).mockResolvedValue(null);

    (prisma.director.create as jest.Mock).mockResolvedValue({
      id: 1,
      name: "Test"
    });

    const result = await createDirector("Test");

    expect(result.name).toBe("Test");
  });

});