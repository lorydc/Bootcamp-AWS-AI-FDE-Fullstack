import { createMovie, CreateMovieDTO } from "../services/movie.service";
import prisma from "../database/prisma";

jest.mock("../database/prisma", () => ({
  movie: {
    create: jest.fn(),
  },
  director: {
    findUnique: jest.fn(),
  },
}));

describe("Create Movie", () => {

  it("should throw error if required fields are missing", async () => {

    const invalidData = {
      title: "",
      genre: "",
      releaseYear: 0,
      directorId: 0
    } as CreateMovieDTO;

    await expect(createMovie(invalidData))
      .rejects.toThrow("Missing required fields");
  });

  it("should throw error if release year is invalid", async () => {
    const futureYear = new Date().getFullYear() + 1;

    const data: CreateMovieDTO = {
      title: "Test",
      genre: "Action",
      releaseYear: futureYear,
      directorId: 1
    };

    await expect(createMovie(data))
      .rejects.toThrow("Invalid release year");
  });

  it("should throw error if director does not exist", async () => {

    (prisma.director.findUnique as jest.Mock).mockResolvedValue(null);

    const data: CreateMovieDTO = {
      title: "Test",
      genre: "Action",
      releaseYear: 2020,
      directorId: 1
    };

    await expect(createMovie(data))
      .rejects.toThrow("Director not found");
  });

  it("should create movie successfully", async () => {

    (prisma.director.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      name: "Director"
    });

    (prisma.movie.create as jest.Mock).mockResolvedValue({
      id: 1,
      title: "Test"
    });

    const data: CreateMovieDTO = {
      title: "Test",
      genre: "Action",
      releaseYear: 2020,
      directorId: 1
    };

    const result = await createMovie(data);

    expect(result).toHaveProperty("id");
    expect(result.title).toBe("Test");
  });

});