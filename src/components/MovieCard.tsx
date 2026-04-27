import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Plus, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import tmdb, { getImageUrl } from '../services/tmdb.ts';

interface MovieCardProps {
  movie: any;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    hoverTimeoutRef.current = setTimeout(async () => {
      setIsHovered(true);
      if (!trailerUrl) {
        try {
          const res = await tmdb.getMovieOrTvDetails(movie.id, movie.name ? 'tv' : 'movie');
          const trailer = res.data.videos?.results?.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube');
          if (trailer) {
            setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
          }
        } catch (e) {
          console.error('Failed to fetch trailer');
        }
      }
    }, 1000);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsHovered(false);
  };

  const title = movie.title || movie.name;
  const rating = movie.vote_average ? (movie.vote_average * 10).toFixed(0) + '% Match' : 'New';
  const releaseYear = (movie.release_date || movie.first_air_date || '').substring(0, 4);

  return (
    <motion.div 
      whileHover={{ scale: 1.1, zIndex: 10, transition: { duration: 0.3 } }}
      className="relative flex-none w-40 md:w-64 aspect-video rounded-md overflow-hidden cursor-pointer group"
      onClick={() => navigate(`/movie/${movie.id}?type=${movie.name ? 'tv' : 'movie'}`)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {!isHovered || !trailerUrl ? (
        <img 
          src={getImageUrl(movie.backdrop_path || movie.poster_path, 'w500')} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300"
        />
      ) : (
        <iframe
          src={`${trailerUrl}?autoplay=1&mute=1&controls=0&loop=1&modestbranding=1`}
          className="w-full h-full object-cover pointer-events-none"
          allow="autoplay"
          title={`${title} Trailer`}
          frameBorder="0"
          referrerPolicy="strict-origin-when-cross-origin"
        ></iframe>
      )}

      {movie.popularity > 1000 && !isHovered && (
        <div className="absolute top-0 right-0 p-1 group-hover:opacity-0 transition-opacity">
          <div className="bg-[#E50914] text-[8px] font-black px-1 py-0.5 rounded-sm shadow-xl">TRENDING</div>
        </div>
      )}
      
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
        <h3 className="text-white font-bold text-sm md:text-lg mb-2 line-clamp-1">{title}</h3>
        <div className="flex items-center gap-2">
          <button 
            className="bg-white text-black p-2 rounded-full hover:bg-gray-200 transition-colors"
            onClick={(e) => { e.stopPropagation(); navigate(`/movie/${movie.id}?type=${movie.name ? 'tv' : 'movie'}`); }}
          >
            <Play className="w-4 h-4 fill-black" />
          </button>
          <button 
            className="border-2 border-gray-400 p-2 rounded-full hover:border-white transition-colors"
            onClick={(e) => { e.stopPropagation(); /* Add to watchlist logic */ }}
          >
            <Plus className="w-4 h-4" />
          </button>
          <button className="border-2 border-gray-400 p-2 rounded-full hover:border-white transition-colors ml-auto">
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-2 flex items-center gap-2 text-xs md:text-sm">
          <span className="text-green-500 font-bold">{rating}</span>
          <span className="border border-gray-500 px-1 text-[10px] uppercase">{movie.adult ? '18+' : 'PG'}</span>
          <span className="text-gray-400">{releaseYear}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;
