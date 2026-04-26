import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';
import { Plus, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';

const ProfileSelection: React.FC = () => {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');
  const [isKids, setIsKids] = useState(false);
  const { selectProfile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const response = await axios.get('/api/profiles');
      setProfiles(response.data);
    } catch (err) {
      console.error('Failed to fetch profiles');
    }
  };

  const handleCreateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/profiles/create', {
        profileName: newProfileName,
        isKidsProfile: isKids,
        avatar: isKids 
          ? 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png' 
          : `https://api.dicebear.com/7.x/avataaars/svg?seed=${newProfileName}`
      });
      setNewProfileName('');
      setIsKids(false);
      setIsCreating(false);
      fetchProfiles();
    } catch (err) {
      console.error('Failed to create profile');
    }
  };

  const handleDeleteProfile = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!window.confirm('Delete this profile?')) return;
    try {
      await axios.delete(`/api/profiles/${id}`);
      fetchProfiles();
    } catch (err) {
      console.error('Failed to delete profile');
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#141414]">
      <motion.div 
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <h1 className="text-white text-3xl md:text-6xl font-medium mb-12 tracking-tight">Who's watching?</h1>
        
        <div className="flex flex-wrap items-center justify-center gap-8 px-4">
          {profiles.map((profile, i) => (
            <motion.div 
              key={profile._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col items-center gap-4 cursor-pointer relative"
              onClick={() => {
                selectProfile(profile);
                navigate('/');
              }}
            >
              <div className="w-32 h-32 md:w-44 md:h-44 rounded overflow-hidden border-4 border-transparent group-hover:border-white transition-all shadow-2xl">
                <img src={profile.avatar} alt={profile.profileName} className="w-full h-full object-cover" />
              </div>
              <span className="text-gray-500 text-lg md:text-xl group-hover:text-white transition-colors font-light tracking-wide">{profile.profileName}</span>
              <button 
                onClick={(e) => handleDeleteProfile(e, profile._id)}
                className="absolute -top-2 -right-2 bg-black/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500 shadow-xl"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          ))}

          {profiles.length < 5 && !isCreating && (
            <div 
              className="group flex flex-col items-center gap-4 cursor-pointer"
              onClick={() => setIsCreating(true)}
            >
              <div className="w-32 h-32 md:w-44 md:h-44 flex items-center justify-center rounded border-4 border-transparent group-hover:bg-gray-200 group-hover:text-black text-gray-600 transition-all">
                <Plus className="w-20 h-20" />
              </div>
              <span className="text-gray-500 text-lg md:text-xl group-hover:text-white transition-colors font-light">Add Profile</span>
            </div>
          )}
        </div>

        {isCreating && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-12 bg-[#232323] p-8 rounded-md w-full max-w-md mx-auto"
          >
            <h3 className="text-white text-2xl mb-6">Add Profile</h3>
            <form onSubmit={handleCreateProfile} className="space-y-4">
              <input 
                type="text"
                placeholder="Name"
                className="w-full bg-[#333] rounded px-4 py-3 text-white focus:outline-none"
                value={newProfileName}
                onChange={(e) => setNewProfileName(e.target.value)}
                required
                autoFocus
              />
              <div className="flex items-center gap-2 text-gray-400">
                <input 
                  type="checkbox" 
                  id="kids" 
                  checked={isKids} 
                  onChange={(e) => setIsKids(e.target.checked)}
                />
                <label htmlFor="kids">Kid?</label>
              </div>
              <div className="flex gap-4 pt-4">
                <button 
                  type="submit"
                  className="flex-1 bg-white text-black py-2 rounded font-bold hover:bg-gray-200"
                >
                  Save
                </button>
                <button 
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="flex-1 bg-gray-800 text-white py-2 rounded font-bold hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}

        <div className="mt-20">
          <button className="border border-gray-500 text-gray-500 px-8 py-2 text-xl hover:text-white hover:border-white transition-all tracking-widest uppercase">
            Manage Profiles
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileSelection;
