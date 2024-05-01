import express from "express";
import {
  test,
  updateUser,
  deleteUser,
} from "../controllers/userControllers.js";
import { verifyToken } from "../middleware/verifyUser.js";

// initialize express router
const router = express.Router();

// define routes
router.get("/test", test); // GET request to /api/test
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);

export default router;
