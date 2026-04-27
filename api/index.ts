import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from '../backend/routes/authRoutes.js';
import movieRoutes from '../backend/routes/movieRoutes.js';
import profileRoutes from '../backend/routes/profileRoutes.js';
import historyRoutes from '../backend/routes/historyRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Middleware to ensure DB connection before handling routes
app.use(async (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    try {
      await mongoose.connect(process.env.MONGODB_URI!, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log('Connected to MongoDB in serverless function');
    } catch (err) {
      console.error('MongoDB connection error:', err);
      return res.status(500).json({ message: 'Database connection failed' });
    }
  }
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/history', historyRoutes);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Serverless Error:', err);
  res.status(500).json({ message: err.message || 'Internal Server Error' });
});

export default app;
