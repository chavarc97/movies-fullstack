import express from "express";
import { getMovies } from "../controllers/movieControllers.js";

const router = express.Router();

// get all movies route
router.get("/get", getMovies)

export default router;