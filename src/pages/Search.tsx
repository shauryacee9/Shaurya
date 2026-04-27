import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import tmdb from '../services/tmdb.ts';
import MovieCard from '../components/MovieCard.tsx';
import { motion } from 'motion/react';

const Search: React.FC = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('q') || '';

  useEffect(() => {
    if (query) {
      fetchResults();
    } else {
      setResults([]);
    }
  }, [query]);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const res = await tmdb.searchMulti(query);
      // Filter out people, we only want movies and tv
      const filtered = res.data.results.filter((item: any) => item.media_type === 'movie' || item.media_type === 'tv');
      setResults(filtered);
    } catch (err) {
      console.error('Failed to fetch search results', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 px-4 md:px-12 min-h-screen">
      <div className="mb-10">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-400">
          Search results for "<span className="text-white">{query}</span>"
        </h1>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">Loading...</div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-y-10 gap-x-4">
          {results.map((item: any, i: number) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <MovieCard movie={item} />
            </motion.div>
          ))}
        </div>
      ) : query ? (
        <div className="text-center py-20 text-gray-500">No results found for "{query}".</div>
      ) : (
        <div className="text-center py-20 text-gray-500">Type something to search.</div>
      )}
    </div>
  );
};

export default Search;
