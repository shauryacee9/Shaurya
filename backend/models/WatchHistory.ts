import mongoose from 'mongoose';

const watchHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  profileId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },
  movieId: { type: String, required: true },
  watchedAt: { type: Date, default: Date.now },
  progressPercentage: { type: Number, default: 0 },
});

export default mongoose.model('WatchHistory', watchHistorySchema);
