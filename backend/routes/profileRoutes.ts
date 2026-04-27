import express from 'express';
import { createProfile, getProfiles, deleteProfile } from '../controllers/profileController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', authMiddleware, createProfile);
router.get('/', authMiddleware, getProfiles);
router.delete('/:id', authMiddleware, deleteProfile);

export default router;
