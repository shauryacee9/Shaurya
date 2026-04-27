import express from 'express';
import { addHistory, getHistoryByProfile } from '../controllers/historyController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', authMiddleware, addHistory);
router.get('/profile/:profileId', authMiddleware, getHistoryByProfile);

export default router;
