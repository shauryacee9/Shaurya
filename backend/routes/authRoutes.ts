import express from 'express';
import { signup, login, getProfile } from '../controllers/authController.ts';
import { authMiddleware } from '../middleware/authMiddleware.ts';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', authMiddleware, getProfile);

export default router;
