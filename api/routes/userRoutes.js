import express from "express";
import { test } from "../controllers/userControllers.js";

// initialize express router
const router = express.Router();

// define routes
router.get('/test', test); // GET request to /api/test


export default router;