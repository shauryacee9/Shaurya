import axios from 'axios';

const TMDB_API_KEY = '15d2ea6d0dc1d476efbca3eba2b9bbfb';
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

const tmdbApi = Object.assign(tmdb, {
  getTrending: () => tmdb.get('/trending/all/day'),
  getTopRated: () => tmdb.get('/movie/top_rated'),
  getActionMovies: () => tmdb.get('/discover/movie?with_genres=28'),
  getComedyMovies: () => tmdb.get('/discover/movie?with_genres=35'),
  getHorrorMovies: () => tmdb.get('/discover/movie?with_genres=27'),
  getRomanceMovies: () => tmdb.get('/discover/movie?with_genres=10749'),
  getDocumentaries: () => tmdb.get('/discover/movie?with_genres=99'),
  getSciFiMovies: () => tmdb.get('/discover/movie?with_genres=878'),
  getAnime: () => tmdb.get('/discover/tv?with_genres=16'),
  getPopularTvShows: () => tmdb.get('/tv/popular'),
  getMovieOrTvDetails: (id: string, type: 'movie' | 'tv' = 'movie') => tmdb.get(`/${type}/${id}?append_to_response=videos,similar`),
  getImageUrl: (path: string, size: string = 'w500') => path ? `https://image.tmdb.org/t/p/${size}${path}` : ''
});

export const { getImageUrl } = tmdbApi;
export default tmdbApi;
