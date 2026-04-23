import { Router } from "express";
import {
  createMovieController,
  getAllMoviesController,
  getMovieByIdController,
  deleteMovieController,
  updateMovieController
} from "../controllers/movie.controller";

import { validateMovie } from "../middlewares/validateMovie";

const router = Router();

router.post("/movies", validateMovie, createMovieController);
router.get("/movies", getAllMoviesController);
router.get("/movies/:id", getMovieByIdController);
router.delete("/movies/:id", deleteMovieController);

router.put("/movies/:id", validateMovie, updateMovieController);
export default router;