import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.tsx';
import { ArrowLeft, Play } from 'lucide-react';
import { motion } from 'motion/react';
import tmdb, { getImageUrl } from '../services/tmdb.ts';

const MovieDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedProfile } = useAuth();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type') as 'movie' | 'tv' || 'movie';

  useEffect(() => {
    fetchMovie();
  }, [id]);

  const fetchMovie = async () => {
    try {
      const response = await tmdb.getMovieOrTvDetails(id as string, type);
      setMovie(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch movie');
      navigate('/');
    }
  };

  const handlePlay = async () => {
    setIsPlaying(true);
    
    try {
      await axios.post('/api/history/add', {
        profileId: selectedProfile?._id,
        movieId: id,
        progressPercentage: 0
      });
    } catch (err) {
      console.error('Failed to update history');
    }
  };

  if (loading) return <div className="h-screen w-screen flex items-center justify-center bg-[#141414]">Loading...</div>;

  const title = movie?.title || movie?.name;

  return (
    <div className="fixed inset-0 z-[100] bg-black">
      <div className="absolute top-4 left-4 z-[110] flex items-center gap-4 text-white">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <ArrowLeft className="w-8 h-8" />
        </button>
        <span className="text-xl font-medium hidden md:block">Watching: {title}</span>
      </div>

      {!isPlaying ? (
        <div className="relative h-full w-full">
          <img src={getImageUrl(movie?.backdrop_path || movie?.poster_path, 'original')} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePlay}
              className="bg-white text-black p-6 rounded-full shadow-2xl mb-6"
            >
              <Play className="fill-black w-12 h-12" />
            </motion.button>
            <h1 className="text-white text-4xl font-bold">{title}</h1>
          </div>
        </div>
      ) : (
        <div className="relative h-full w-full">
          <iframe
            src={`https://vidlink.pro/${type}/${id}`}
            className="w-full h-full"
            allow="autoplay; fullscreen"
            title={`${title} Video`}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
