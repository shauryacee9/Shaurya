import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.tsx';
import MovieSlider from '../components/MovieSlider.tsx';
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
        recommendRes,
        historyRes,
        animeRes,
        hindiRes,
        englishRes,
        sciFiRes
      ] = await Promise.all([
        axios.get('/api/movies/trending'),
        axios.get(`/api/movies/recommendations/${selectedProfile?._id}`),
        axios.get(`/api/history/profile/${selectedProfile?._id}`),
        axios.get('/api/movies/category/Anime'),
        axios.get('/api/movies/language/Hindi'),
        axios.get('/api/movies/language/English'),
        axios.get('/api/movies/category/Sci-Fi')
      ]);

      setTrending(trendingRes.data);
      setRecommendations(recommendRes.data);
      setHistory(historyRes.data.map((h: any) => h.movieId));
      setAnime(animeRes.data);
      setHindi(hindiRes.data);
      setEnglish(englishRes.data);
      setSciFi(sciFiRes.data);

      if (trendingRes.data.length > 0) {
        setHeroMovie(trendingRes.data[Math.floor(Math.random() * trendingRes.data.length)]);
      }
    } catch (err) {
      console.error('Failed to fetch movies');
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
                backgroundImage: `linear-gradient(to right, #141414 10%, transparent 60%), linear-gradient(to top, #141414 5%, transparent 30%), url('${heroMovie.bannerUrl}')`,
                filter: 'brightness(0.9)'
              }}
            />
          </div>

          <div className="absolute top-[40%] md:top-[30%] px-4 md:px-12 w-full max-w-2xl z-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="text-[#E50914] border-[1.5px] border-[#E50914] px-1 py-0.5 text-[10px] font-bold">SERIES</div>
              <span className="text-sm tracking-[0.3em] font-medium opacity-80 uppercase">Netflix Original</span>
            </div>
            <motion.h1 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-4xl md:text-7xl font-black mb-4 tracking-tighter uppercase leading-tight"
            >
              {heroMovie.title}
            </motion.h1>
            <div className="flex items-center gap-3 text-sm font-bold mb-4">
              <span className="text-green-500">98% Match</span>
              <span className="text-gray-400">{heroMovie.releaseYear}</span>
              <span className="border border-gray-500 px-1 text-[10px] leading-tight">{heroMovie.rating}</span>
              <span className="text-gray-400">Limited Series</span>
              <span className="border border-gray-600 px-1 text-[10px] bg-gray-600/30">Ultra HD 4K</span>
            </div>
            <motion.p 
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-200 mb-8 line-clamp-3 font-light leading-relaxed drop-shadow-md"
            >
              {heroMovie.description}
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
      <div className="-mt-32 relative z-10 space-y-12">
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
