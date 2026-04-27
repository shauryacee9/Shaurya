import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Plus, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';

interface MovieCardProps {
  movie: any;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(true);
    }, 1000);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsHovered(false);
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.1, zIndex: 10, transition: { duration: 0.3 } }}
      className="relative flex-none w-40 md:w-64 aspect-video rounded-md overflow-hidden cursor-pointer group"
      onClick={() => navigate(`/movie/${movie._id}`)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {!isHovered || !movie.trailerUrl ? (
        <img 
          src={movie.thumbnailUrl} 
          alt={movie.title} 
          className="w-full h-full object-cover transition-transform duration-300"
        />
      ) : (
        <iframe
          src={`${movie.trailerUrl}?autoplay=1&mute=1&controls=0&loop=1&modestbranding=1`}
          className="w-full h-full object-cover pointer-events-none"
          allow="autoplay"
          title={`${movie.title} Trailer`}
          frameBorder="0"
          referrerPolicy="strict-origin-when-cross-origin"
        ></iframe>
      )}

      {movie.isTrending && !isHovered && (
        <div className="absolute top-0 right-0 p-1 group-hover:opacity-0 transition-opacity">
          <div className="bg-[#E50914] text-[8px] font-black px-1 py-0.5 rounded-sm shadow-xl">TOP 10</div>
        </div>
      )}
      
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
        <h3 className="text-white font-bold text-sm md:text-lg mb-2 line-clamp-1">{movie.title}</h3>
        <div className="flex items-center gap-2">
          <button 
            className="bg-white text-black p-2 rounded-full hover:bg-gray-200 transition-colors"
            onClick={(e) => { e.stopPropagation(); navigate(`/movie/${movie._id}`); }}
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
          <span className="text-green-500 font-bold">98% Match</span>
          <span className="border border-gray-500 px-1 text-[10px] uppercase">{movie.rating}</span>
          <span className="text-gray-400">{movie.releaseYear}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;
