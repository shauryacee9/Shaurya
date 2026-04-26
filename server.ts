import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import authRoutes from './backend/routes/authRoutes.ts';
import movieRoutes from './backend/routes/movieRoutes.ts';
import profileRoutes from './backend/routes/profileRoutes.ts';
import historyRoutes from './backend/routes/historyRoutes.ts';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  console.log('🏁 Starting server initialization...');
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Middleware
  app.use(cors());
  app.use(express.json());

  // MongoDB Connection
  const MONGODB_URI = process.env.MONGODB_URI;
  if (MONGODB_URI) {
    console.log('📡 Attempting to connect to MongoDB...');
    mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // 5 second timeout
    })
      .then(async () => {
        console.log('✅ Connected to MongoDB Atlas');
        
        try {
          // Auto-seed if empty
          const Movie = (await import('./backend/models/Movie.ts' as any)).default;
          const count = await Movie.countDocuments();
          if (count === 0) {
            console.log('ℹ️ Database is empty. Seeding sample movies...');
            const { movies } = await (import('./seedMovies.ts' as any));
            await Movie.insertMany(movies);
            console.log('✅ Seeding complete.');
          }
        } catch (seedErr: any) {
          console.error('⚠️ Seeding failed:', seedErr.message);
        }
      })
      .catch((err) => {
        console.error('❌ MongoDB Connection Error:', err.message);
        
        if (err.message.includes('authentication failed') || err.message.includes('bad auth')) {
          console.log('\n🔑 TIP: Authentication Failed.');
          console.log('1. Check your MONGODB_URI in AI Studio Secrets.');
          console.log('2. Ensure <USERNAME> and <PASSWORD> are correct.');
          console.log('3. If your password has special characters, URL-encode them.\n');
        } else if (err.message.includes('Could not connect to any servers') || err.message.includes('selection timeout')) {
          console.log('\n💡 TIP: This is likely an IP Whitelist or Network issue.');
          console.log('1. Go to MongoDB Atlas > Network Access');
          console.log('2. Click "Add IP Address"');
          console.log('3. Select "Allow Access From Anywhere" (0.0.0.0/0)');
          console.log('4. Click "Confirm" and restart this app.\n');
        }
      });
  } else {
    console.warn('⚠️ MONGODB_URI environment variable is missing.');
    console.log('Please add MONGODB_URI to your Secrets in AI Studio.');
  }

  // API Routes
  console.log('🛣️ Registering API routes...');
  app.use('/api/auth', authRoutes);
  app.use('/api/movies', movieRoutes);
  app.use('/api/profiles', profileRoutes);
  app.use('/api/history', historyRoutes);

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
  });

  // Error handling middleware
  app.use((err: any, req: any, res: any, next: any) => {
    console.error('💥 Error handler caught:', err);
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
      message: err.message || 'Internal Server Error',
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
  });

  // Vite integration
  try {
    if (process.env.NODE_ENV !== 'production') {
      console.log('🛠️ Starting Vite in middleware mode...');
      const vite = await createViteServer({
        server: { 
          middlewareMode: true,
          hmr: false // Disable HMR for stability in this environment
        },
        appType: 'spa',
      });
      app.use(vite.middlewares);
      console.log('✅ Vite middleware ready');
    } else {
      console.log('📦 Serving production build...');
      const distPath = path.join(process.cwd(), 'dist');
      app.use(express.static(distPath));
      app.get('*', (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }
  } catch (viteErr: any) {
    console.error('❌ Vite Startup Error:', viteErr.message);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`🔗 Preview URL: ${process.env.APP_URL || `http://localhost:${PORT}`}`);
  });
}

startServer();
