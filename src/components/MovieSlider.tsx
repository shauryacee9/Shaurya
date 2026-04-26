import React, { useRef } from 'react';
import MovieCard from './MovieCard.tsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MovieSliderProps {
  title: string;
  movies: any[];
}

const MovieSlider: React.FC<MovieSliderProps> = ({ title, movies }) => {
  const rowRef = useRef<HTMLDivElement>(null);

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
          className="flex items-center gap-2 overflow-x-scroll scrollbar-hide scroll-smooth py-4"
        >
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
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

export default MovieSlider;
