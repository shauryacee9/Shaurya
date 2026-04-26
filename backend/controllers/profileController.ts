import Profile from '../models/Profile.ts';

export const createProfile = async (req: any, res: any) => {
  try {
    const { profileName, avatar, isKidsProfile } = req.body;
    const profile = await Profile.create({
      profileName,
      avatar,
      isKidsProfile,
      userId: req.user._id
    });
    res.status(201).json(profile);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getProfiles = async (req: any, res: any) => {
  try {
    const profiles = await Profile.find({ userId: req.user._id });
    res.json(profiles);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProfile = async (req: any, res: any) => {
  try {
    await Profile.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    res.json({ message: 'Profile deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
