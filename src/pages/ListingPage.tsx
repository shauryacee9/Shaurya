import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard.tsx';
import { motion } from 'motion/react';

interface ListingPageProps {
  type: 'Movie' | 'TV Show' | 'Anime';
}

const ListingPage: React.FC<ListingPageProps> = ({ type }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, [type]);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      // For simplicity, we filter the full list, but in a real app we'd have a specific type field
      const response = await axios.get('/api/movies');
      const filtered = response.data.filter((m: any) => {
        if (type === 'Anime') return m.category === 'Anime';
        // Mocking TV vs Movie based on category for now
        if (type === 'TV Show') return ['Drama', 'Crime', 'Sci-Fi'].includes(m.category);
        return true;
      });
      setMovies(filtered);
    } catch (err) {
      console.error('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 px-4 md:px-12 min-h-screen">
      <div className="flex items-center gap-6 mb-10">
        <h1 className="text-3xl md:text-5xl font-bold">{type}s</h1>
        <div className="flex items-center gap-4 bg-black border border-gray-600 px-4 py-1 text-sm font-medium cursor-pointer hover:bg-gray-800 transition-colors">
          Genres <span className="border-t-4 border-x-4 border-x-transparent border-t-white" />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">Loading...</div>
      ) : movies.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-y-10 gap-x-4">
          {movies.map((movie: any, i: number) => (
            <motion.div 
              key={movie._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <MovieCard movie={movie} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500">No {type.toLowerCase()}s found.</div>
      )}
    </div>
  );
};

export default ListingPage;
