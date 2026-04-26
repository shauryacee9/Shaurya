import express from 'express';
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
} from '../controllers/movieController.ts';
import { authMiddleware } from '../middleware/authMiddleware.ts';
import { adminMiddleware } from '../middleware/adminMiddleware.ts';

const router = express.Router();

router.get('/', getMovies);
router.get('/trending', getTrendingMovies);
router.get('/category/:category', getMoviesByCategory);
router.get('/language/:language', getMoviesByLanguage);
router.get('/recommendations/:profileId', getRecommendations);
router.get('/:id', getMovieById);

// Admin only
router.post('/', authMiddleware, adminMiddleware, createMovie);
router.put('/:id', authMiddleware, adminMiddleware, updateMovie);
router.delete('/:id', authMiddleware, adminMiddleware, deleteMovie);

export default router;
