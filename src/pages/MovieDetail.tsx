import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.tsx';
import { ArrowLeft, Play, Plus, ThumbsUp, X } from 'lucide-react';
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
  const releaseYear = (movie?.release_date || movie?.first_air_date || '').substring(0, 4);
  const duration = movie?.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : (movie?.number_of_seasons ? `${movie.number_of_seasons} Seasons` : '');
  const rating = movie?.vote_average ? (movie.vote_average * 10).toFixed(0) + '% match' : 'New';
  const ageRating = movie?.adult ? 'A 18+' : 'U/A 16+';
  
  const cast = movie?.credits?.cast?.slice(0, 3).map((c: any) => c.name).join(', ');
  const genres = movie?.genres?.map((g: any) => g.name).join(', ');

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 overflow-y-auto no-scrollbar flex justify-center items-start pt-10 pb-20">
      <div className="bg-[#181818] w-full max-w-4xl min-h-[80vh] rounded-xl shadow-2xl overflow-hidden relative pb-10">
        
        {/* Close Button */}
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 z-50 p-2 bg-[#181818] rounded-full hover:bg-gray-800 transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {!isPlaying ? (
          <>
            {/* Hero Image Section */}
            <div className="relative h-[60vh] w-full">
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent z-10" />
              <img 
                src={getImageUrl(movie?.backdrop_path || movie?.poster_path, 'original')} 
                alt={title} 
                className="w-full h-full object-cover" 
              />
              
              {/* Overlay Content */}
              <div className="absolute bottom-10 left-10 z-20 w-[60%]">
                <h1 className="text-white text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  {title}
                </h1>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={handlePlay}
                    className="flex items-center gap-2 bg-white text-black px-8 py-2 rounded font-bold hover:bg-white/80 transition-colors"
                  >
                    <Play className="w-6 h-6 fill-black" /> Play
                  </button>
                  <button className="p-2 border-2 border-gray-400 rounded-full hover:border-white hover:bg-white/10 transition-all">
                    <Plus className="w-6 h-6 text-white" />
                  </button>
                  <button className="p-2 border-2 border-gray-400 rounded-full hover:border-white hover:bg-white/10 transition-all">
                    <ThumbsUp className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="px-10 grid grid-cols-3 gap-8 text-sm">
              {/* Left Column */}
              <div className="col-span-2 space-y-4">
                <div className="flex items-center gap-2 font-medium">
                  <span className="text-green-500 font-bold">{rating}</span>
                  <span className="text-gray-300">{releaseYear}</span>
                  {duration && <span className="text-gray-300">{duration}</span>}
                  <span className="border border-gray-600 px-1 text-xs text-gray-300 rounded">HD</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="border border-gray-600 px-1 text-xs text-gray-300">{ageRating}</span>
                  <span className="text-gray-400 text-xs">violence, language, gore</span>
                </div>

                <p className="text-white text-base leading-relaxed mt-4">
                  {movie?.overview}
                </p>
              </div>

              {/* Right Column */}
              <div className="col-span-1 space-y-4 text-sm">
                <div>
                  <span className="text-gray-500">Cast: </span>
                  <span className="text-gray-300 hover:underline cursor-pointer">{cast}</span>
                </div>
                <div>
                  <span className="text-gray-500">Genres: </span>
                  <span className="text-gray-300 hover:underline cursor-pointer">{genres}</span>
                </div>
                <div>
                  <span className="text-gray-500">This Movie is: </span>
                  <span className="text-gray-300">Gritty, Dark, Action Thriller</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="relative h-[80vh] w-full bg-black">
            <button 
              onClick={() => setIsPlaying(false)}
              className="absolute top-4 left-4 z-[110] flex items-center gap-2 text-white hover:text-gray-300"
            >
              <ArrowLeft className="w-6 h-6" /> Back
            </button>
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
    </div>
  );
};

export default MovieDetail;
