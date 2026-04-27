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
  getRecommendations,
} from "../controllers/movieController";

import { authMiddleware } from "../middleware/authMiddleware";
import { adminMiddleware } from "../middleware/adminMiddleware";

const router = express.Router();

// multer setup for trailer upload
const upload = multer({ dest: "uploads/" });

// Public routes
router.get("/", getMovies);
router.get("/trending", getTrendingMovies);
router.get("/category/:category", getMoviesByCategory);
router.get("/language/:language", getMoviesByLanguage);
router.get("/recommendations/:profileId", getRecommendations);
router.get("/:id", getMovieById);

// Admin routes (protected + file upload enabled)
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("trailer"),
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