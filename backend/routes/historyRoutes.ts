import express from 'express';
import { addHistory, getHistoryByProfile } from '../controllers/historyController.ts';
import { authMiddleware } from '../middleware/authMiddleware.ts';

const router = express.Router();

router.post('/add', authMiddleware, addHistory);
router.get('/profile/:profileId', authMiddleware, getHistoryByProfile);

export default router;
