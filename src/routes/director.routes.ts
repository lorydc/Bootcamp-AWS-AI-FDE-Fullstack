import { Router } from "express";
import {
  createDirectorController,
  getAllDirectorsController,
  getDirectorByIdController,
  deleteDirectorController,
  getMoviesByDirectorController,
  updateDirectorController
} from "../controllers/director.controller";
import { validateDirector } from "../middlewares/validateDirector";

const router = Router();

router
  .post("/directors", validateDirector, createDirectorController)
  .put("/directors/:id", validateDirector, updateDirectorController)
  .get("/directors", getAllDirectorsController)
  .get("/directors/:id", getDirectorByIdController)
  .delete("/directors/:id", deleteDirectorController)
  .get("/directors/:id/movies", getMoviesByDirectorController);
export default router;