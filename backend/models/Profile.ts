import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  profileName: { type: String, required: true },
  avatar: { type: String, default: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isKidsProfile: { type: Boolean, default: false },
});

export default mongoose.model('Profile', profileSchema);
