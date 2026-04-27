import React, { useState, useEffect } from 'react';
import axios from 'axios';
import tmdb, { getImageUrl } from '../services/tmdb.ts';
import { useAuth } from '../context/AuthContext.tsx';
import MovieSlider from '../components/MovieSlider.tsx';
import Top10Slider from '../components/Top10Slider.tsx';
import { Play, Info } from 'lucide-react';
import { motion } from 'motion/react';

const Home: React.FC = () => {
  const { selectedProfile } = useAuth();
  const [trending, setTrending] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [history, setHistory] = useState([]);
  const [anime, setAnime] = useState([]);
  const [hindi, setHindi] = useState([]);
  const [english, setEnglish] = useState([]);
  const [sciFi, setSciFi] = useState([]);
  const [heroMovie, setHeroMovie] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, [selectedProfile]);

  const fetchData = async () => {
    try {
      const [
        trendingRes,
        recommendRes, // For now we'll just use popular movies as recommendations
        historyRes,
        animeRes,
        hindiRes,
        englishRes,
        sciFiRes
      ] = await Promise.all([
        tmdb.getTrending(),
        tmdb.getTopRated(),
        axios.get(`/api/history/profile/${selectedProfile?._id}`),
        tmdb.getAnime(),
        tmdb.getRomanceMovies(), // Using Romance instead of Hindi for TMDB
        tmdb.getActionMovies(),  // Action instead of English
        tmdb.getSciFiMovies()    // Need to add this to tmdb.ts
      ]);

      setTrending(trendingRes.data.results);
      setRecommendations(recommendRes.data.results);
      setAnime(animeRes.data.results);
      setHindi(hindiRes.data.results); // Actually Romance
      setEnglish(englishRes.data.results); // Actually Action
      setSciFi(sciFiRes.data.results);

      // Handle history: historyRes contains array of { movieId: string }
      // We'll fetch details for each history item if there are any
      if (historyRes.data && historyRes.data.length > 0) {
        try {
          const historyDetails = await Promise.all(
            historyRes.data.slice(0, 10).map((h: any) => 
              tmdb.getMovieOrTvDetails(h.movieId, 'movie').catch(() => null)
            )
          );
          setHistory(historyDetails.filter(res => res !== null).map(res => res.data));
        } catch(e) { console.error(e); setHistory([]); }
      } else {
        setHistory([]);
      }

      if (trendingRes.data.results.length > 0) {
        setHeroMovie(trendingRes.data.results[Math.floor(Math.random() * trendingRes.data.results.length)]);
      }
    } catch (err) {
      console.error('Failed to fetch movies from TMDB', err);
    }
  };

  return (
    <div className="relative overflow-x-hidden">
      {/* Hero Banner */}
      {heroMovie && (
        <section className="relative h-[95vh] w-full">
          <div className="absolute inset-0">
            <div 
              className="w-full h-full bg-cover bg-center" 
              style={{ 
                backgroundImage: `linear-gradient(to right, #141414 10%, transparent 60%), linear-gradient(to top, #141414 5%, transparent 30%), url('${getImageUrl(heroMovie.backdrop_path || heroMovie.poster_path, 'original')}')`,
                filter: 'brightness(0.9)'
              }}
            />
          </div>

          <div className="absolute top-[40%] md:top-[30%] px-4 md:px-12 w-full max-w-2xl z-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="text-[#E50914] border-[1.5px] border-[#E50914] px-1 py-0.5 text-[10px] font-bold">TMDB</div>
              <span className="text-sm tracking-[0.3em] font-medium opacity-80 uppercase">Featured Title</span>
            </div>
            <motion.h1 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-4xl md:text-7xl font-black mb-4 tracking-tighter uppercase leading-tight"
            >
              {heroMovie.title || heroMovie.name}
            </motion.h1>
            <div className="flex items-center gap-3 text-sm font-bold mb-4">
              <span className="text-green-500">{(heroMovie.vote_average * 10).toFixed(0)}% Match</span>
              <span className="text-gray-400">{(heroMovie.release_date || heroMovie.first_air_date || '').substring(0, 4)}</span>
              <span className="border border-gray-500 px-1 text-[10px] leading-tight">{heroMovie.adult ? '18+' : 'PG'}</span>
              <span className="border border-gray-600 px-1 text-[10px] bg-gray-600/30">HD</span>
            </div>
            <motion.p 
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-200 mb-8 line-clamp-3 font-light leading-relaxed drop-shadow-md"
            >
              {heroMovie.overview}
            </motion.p>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-3 bg-white text-black px-8 py-3 rounded font-bold hover:bg-white/90 transition-colors shadow-lg">
                <Play className="fill-black w-6 h-6" /> Play
              </button>
              <button className="flex items-center gap-3 bg-gray-500/50 text-white px-8 py-3 rounded font-bold hover:bg-gray-500/40 transition-colors shadow-lg backdrop-blur-sm">
                <Info className="w-6 h-6" /> More Info
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Rows */}
      <div className="pb-20 -mt-32 relative z-20 space-y-12">
        <Top10Slider title="Top 10 Series in Netflix Today" movies={trending} />
        <MovieSlider title="Trending Now" movies={trending} />
        {history.length > 0 && <MovieSlider title="Continue Watching" movies={history} />}
        <MovieSlider title="Recommended For You" movies={recommendations} />
        <MovieSlider title="Popular Movies" movies={english} />
        <MovieSlider title="Anime Picks" movies={anime} />
        <MovieSlider title="Hindi Movies" movies={hindi} />
        <MovieSlider title="Sci-Fi Thrillers" movies={sciFi} />
      </div>
    </div>
  );
};

export default Home;
