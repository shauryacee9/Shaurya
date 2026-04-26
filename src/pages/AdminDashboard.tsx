import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Edit2, Plus, Film } from 'lucide-react';
import { motion } from 'motion/react';

const AdminDashboard: React.FC = () => {
  const [movies, setMovies] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    language: '',
    releaseYear: '',
    rating: '',
    thumbnailUrl: '',
    bannerUrl: '',
    videoUrl: '',
    isTrending: false
  });

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('/api/movies');
      setMovies(response.data);
    } catch (err) {
      console.error('Failed to fetch movies');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/movies', formData);
      setIsFormOpen(false);
      setFormData({
        title: '', description: '', category: '', language: '',
        releaseYear: '', rating: '', thumbnailUrl: '', bannerUrl: '',
        videoUrl: '', isTrending: false
      });
      fetchMovies();
    } catch (err) {
      console.error('Failed to create movie');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this movie?')) return;
    try {
      await axios.delete(`/api/movies/${id}`);
      fetchMovies();
    } catch (err) {
      console.error('Failed to delete movie');
    }
  };

  return (
    <div className="pt-24 px-4 md:px-12 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Film className="text-red-500" /> Admin Dashboard
        </h1>
        <button 
          onClick={() => setIsFormOpen(true)}
          className="bg-red-600 text-white px-6 py-2 rounded font-bold hover:bg-red-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Add New Movie
        </button>
      </div>

      <div className="bg-[#2a2a2a] rounded-lg overflow-hidden border border-gray-800">
        <table className="w-full text-left">
          <thead className="bg-[#333] text-gray-400 text-sm uppercase">
            <tr>
              <th className="px-6 py-4">Movie</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Language</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {movies.map((movie: any) => (
              <tr key={movie._id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 flex items-center gap-4">
                  <img src={movie.thumbnailUrl} alt="" className="w-16 aspect-video object-cover rounded" />
                  <span className="font-medium">{movie.title}</span>
                </td>
                <td className="px-6 py-4 text-gray-400">{movie.category}</td>
                <td className="px-6 py-4 text-gray-400">{movie.language}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <button className="p-2 hover:text-blue-500 transition-colors"><Edit2 className="w-5 h-5" /></button>
                    <button 
                      onClick={() => handleDelete(movie._id)}
                      className="p-2 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#181818] w-full max-w-3xl rounded-lg overflow-hidden shadow-2xl relative"
          >
            <div className="p-6 border-b border-gray-800 flex items-center justify-between">
              <h2 className="text-xl font-bold">Add Movie</h2>
              <button onClick={() => setIsFormOpen(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <input 
                  type="text" placeholder="Title" required className="w-full bg-[#333] border-none rounded px-4 py-2"
                  value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
                <textarea 
                  placeholder="Description" required rows={3} className="w-full bg-[#333] border-none rounded px-4 py-2"
                  value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
                <input 
                  type="text" placeholder="Category (e.g. Action)" required className="w-full bg-[#333] border-none rounded px-4 py-2"
                  value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}
                />
                <input 
                  type="text" placeholder="Language" required className="w-full bg-[#333] border-none rounded px-4 py-2"
                  value={formData.language} onChange={(e) => setFormData({...formData, language: e.target.value})}
                />
                <input 
                  type="number" placeholder="Release Year" required className="w-full bg-[#333] border-none rounded px-4 py-2"
                  value={formData.releaseYear} onChange={(e) => setFormData({...formData, releaseYear: e.target.value})}
                />
              </div>
              <div className="space-y-4">
                <input 
                  type="text" placeholder="Rating (e.g. PG-13)" required className="w-full bg-[#333] border-none rounded px-4 py-2"
                  value={formData.rating} onChange={(e) => setFormData({...formData, rating: e.target.value})}
                />
                <input 
                  type="text" placeholder="Thumbnail URL" required className="w-full bg-[#333] border-none rounded px-4 py-2"
                  value={formData.thumbnailUrl} onChange={(e) => setFormData({...formData, thumbnailUrl: e.target.value})}
                />
                <input 
                  type="text" placeholder="Banner URL" required className="w-full bg-[#333] border-none rounded px-4 py-2"
                  value={formData.bannerUrl} onChange={(e) => setFormData({...formData, bannerUrl: e.target.value})}
                />
                <input 
                  type="text" placeholder="Video URL" required className="w-full bg-[#333] border-none rounded px-4 py-2"
                  value={formData.videoUrl} onChange={(e) => setFormData({...formData, videoUrl: e.target.value})}
                />
                <label className="flex items-center gap-2 cursor-pointer pt-2">
                  <input 
                    type="checkbox" checked={formData.isTrending} 
                    onChange={(e) => setFormData({...formData, isTrending: e.target.checked})}
                  />
                  <span>Is Trending?</span>
                </label>
              </div>
              <div className="md:col-span-2 flex justify-end gap-4 pt-4">
                <button 
                  type="button" onClick={() => setIsFormOpen(false)}
                  className="px-6 py-2 text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-red-600 px-10 py-2 rounded font-bold hover:bg-red-700 transition-colors"
                >
                  Save Movie
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
