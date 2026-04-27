import WatchHistory from '../models/WatchHistory.js';

export const addHistory = async (req: any, res: any) => {
  try {
    const { profileId, movieId, progressPercentage } = req.body;
    
    // Check if entry already exists to update instead of create duplicates
    let history = await WatchHistory.findOne({ profileId, movieId });
    
    if (history) {
      history.progressPercentage = progressPercentage;
      history.watchedAt = new Date();
      await history.save();
    } else {
      history = await WatchHistory.create({
        userId: req.user._id,
        profileId,
        movieId,
        progressPercentage
      });
    }
    
    res.status(201).json(history);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getHistoryByProfile = async (req: any, res: any) => {
  try {
    const history = await WatchHistory.find({ profileId: req.params.profileId })
      .sort({ watchedAt: -1 });
    res.json(history);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
