import React, { useRef } from 'react';
import MovieCard from './MovieCard.tsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getImageUrl } from '../services/tmdb.ts';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

interface Top10SliderProps {
  title: string;
  movies: any[];
}

const Top10Slider: React.FC<Top10SliderProps> = ({ title, movies }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div className="space-y-2 md:space-y-4 px-4 md:px-12 mt-8 group relative z-20">
      <h2 className="text-white text-xl md:text-2xl font-black mb-3 flex items-center gap-2 cursor-pointer hover:text-gray-300 transition-colors inline-block tracking-tight">
        {title} <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </h2>
      
      <div className="relative group/row">
        <ChevronLeft 
          className="absolute top-0 bottom-0 left-0 z-40 m-auto h-full w-10 cursor-pointer opacity-0 group-hover/row:opacity-100 hover:scale-125 transition-all text-white bg-black/30 md:bg-black/10"
          onClick={() => scroll('left')}
        />
        
        <div 
          ref={rowRef}
          className="flex items-center gap-6 md:gap-10 overflow-x-scroll scrollbar-hide scroll-smooth py-4 pl-4"
        >
          {movies.slice(0, 10).map((movie, index) => (
            <motion.div 
              key={movie.id} 
              className="relative flex-none flex items-center cursor-pointer group/card w-[200px] md:w-[280px]"
              whileHover={{ scale: 1.05, zIndex: 10, transition: { duration: 0.3 } }}
              onClick={() => navigate(`/movie/${movie.id}?type=${movie.name ? 'tv' : 'movie'}`)}
            >
              {/* Massive Outline Number */}
              <div 
                className="absolute left-[-20px] md:left-[-30px] bottom-[-20px] md:bottom-[-30px] text-[120px] md:text-[200px] font-black leading-none z-0 select-none"
                style={{
                  WebkitTextStroke: '3px #595959',
                  color: '#141414',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                }}
              >
                {index + 1}
              </div>
              
              {/* Movie Poster (Portrait format looks better for Top 10) */}
              <div className="relative ml-auto w-[65%] aspect-[2/3] z-10 rounded-md overflow-hidden shadow-2xl bg-black">
                <img 
                  src={getImageUrl(movie.poster_path, 'w500')} 
                  alt={movie.title || movie.name} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover/card:scale-110"
                />
                
                {/* Netflix specific 'Recently Added' or 'Top 10' badge on poster */}
                <div className="absolute bottom-0 w-full">
                   <div className="bg-[#E50914] text-white text-[8px] md:text-[10px] font-bold text-center py-1 uppercase tracking-wider w-full shadow-lg">
                     Top 10
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <ChevronRight 
          className="absolute top-0 bottom-0 right-0 z-40 m-auto h-full w-10 cursor-pointer opacity-0 group-hover/row:opacity-100 hover:scale-125 transition-all text-white bg-black/30 md:bg-black/10"
          onClick={() => scroll('right')}
        />
      </div>
    </div>
  );
};

export default Top10Slider;
