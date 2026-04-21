import { Router } from "express";
import { createMovieController } from "../controllers/movie.controller";
import { validateMovie } from "../middlewares/validateMovie";

const router = Router();

router.post("/movies", validateMovie, createMovieController);

export default router;