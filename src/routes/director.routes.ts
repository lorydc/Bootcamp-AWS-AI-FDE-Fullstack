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

router.post("/directors", validateDirector, createDirectorController);
router.put("/directors/:id", validateDirector, updateDirectorController);
router.get("/directors", getAllDirectorsController);
router.get("/directors/:id", getDirectorByIdController);
router.delete("/directors/:id", deleteDirectorController);
router.get("/directors/:id/movies", getMoviesByDirectorController);
export default router;