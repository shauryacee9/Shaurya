import Movie from '../models/Movie.js';
import WatchHistory from '../models/WatchHistory.js';
import cloudinary from '../config/cloudinary.js';

export const getMovies = async (req: any, res: any) => {
  try {
    const movies = await Movie.find({});
    res.json(movies);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getTrendingMovies = async (req: any, res: any) => {
  try {
    const movies = await Movie.find({ isTrending: true });
    res.json(movies);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMoviesByCategory = async (req: any, res: any) => {
  try {
    const movies = await Movie.find({ category: req.params.category });
    res.json(movies);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMoviesByLanguage = async (req: any, res: any) => {
  try {
    const movies = await Movie.find({ language: req.params.language });
    res.json(movies);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMovieById = async (req: any, res: any) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) res.json(movie);
    else res.status(404).json({ message: 'Movie not found' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createMovie = async (req: any, res: any) => {
  try {
    let trailerUrl = '';
    let videoUrl = '';

    // If there is an uploaded file, upload it to Cloudinary via buffer
    if (req.file) {
      const uploadResult: any = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "video", folder: "netflix_trailers" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
      trailerUrl = uploadResult.secure_url;
      videoUrl = uploadResult.secure_url;
    }

    const movieData = { 
      ...req.body, 
      trailerUrl,
      videoUrl: req.body.videoUrl || videoUrl,
      createdByAdmin: req.user?._id || null 
    };

    const movie = await Movie.create(movieData);
    res.status(201).json(movie);
  } catch (error: any) {
    console.error("Create movie error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const updateMovie = async (req: any, res: any) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(movie);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMovie = async (req: any, res: any) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: 'Movie deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getRecommendations = async (req: any, res: any) => {
  try {
    const { profileId } = req.params;
    const history = await WatchHistory.find({ profileId }).populate('movieId');
    
    if (history.length > 0) {
      const categories = history.map((item: any) => item.movieId.category);
      const uniqueCategories = [...new Set(categories)];
      const recommended = await Movie.find({
        category: { $in: uniqueCategories },
        _id: { $nin: history.map((item: any) => item.movieId._id) }
      }).limit(10);
      
      if (recommended.length > 0) return res.json(recommended);
    }
    
    // Fallback to trending
    const trending = await Movie.find({ isTrending: true }).limit(10);
    res.json(trending);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
