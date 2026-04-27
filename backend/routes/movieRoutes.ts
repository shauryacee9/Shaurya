import express from "express";
import multer from "multer";

import {
  getMovies,
  getTrendingMovies,
  getMoviesByCategory,
  getMoviesByLanguage,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  getRecommendations
} from "../controllers/movieController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage }); // ✅ REQUIRED

router.get("/", getMovies);
router.get("/trending", getTrendingMovies);
router.get("/category/:category", getMoviesByCategory);
router.get("/language/:language", getMoviesByLanguage);
router.get("/recommendations/:profileId", getRecommendations);
router.get("/:id", getMovieById);

/*
IMPORTANT FIX HERE
multer must run BEFORE controller
*/

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("trailer"), // ✅ REQUIRED
  createMovie
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateMovie
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteMovie
);

export default router;