import { Router } from "express";
import { createDirectorController } from "../controllers/director.controller";
import { validateDirector } from "../middlewares/validateDirector";

const router = Router();

router.post("/directors", validateDirector, createDirectorController);

export default router;