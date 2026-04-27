import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
  bannerUrl: { type: String, required: true },
  videoUrl: { type: String, required: true },
  trailerUrl: { type: String, required: true },
  category: { type: String, required: true }, // e.g., Action, Comedy, Anime
  language: { type: String, required: true }, // e.g., Hindi, English, Japanese
  releaseYear: { type: Number, required: true },
  rating: { type: String, required: true }, // e.g., PG-13, TV-MA
  isTrending: { type: Boolean, default: false },
  createdByAdmin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Movie', movieSchema);
