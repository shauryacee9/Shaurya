const movies = [
  {q: 'Avengers Endgame', type: 'movie', tmdbId: 299534},
  {q: 'Naruto Shippuden', type: 'tv', tmdbId: 31910},
  {q: 'Money Heist', type: 'tv', tmdbId: 71446},
  {q: 'Stranger Things', type: 'tv', tmdbId: 66732},
  {q: 'Attack on Titan', type: 'tv', tmdbId: 1429},
  {q: 'Jujutsu Kaisen', type: 'tv', tmdbId: 95479},
  {q: 'Dark', type: 'tv', tmdbId: 70523},
  {q: 'Breaking Bad', type: 'tv', tmdbId: 1396},
  {q: 'Interstellar', type: 'movie', tmdbId: 157336},
  {q: 'Inception', type: 'movie', tmdbId: 27205}
];

async function run() {
  for (let m of movies) {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/${m.type}/${m.tmdbId}?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb`);
      const data = await res.json();
      console.log(m.q, '|', 'https://image.tmdb.org/t/p/w500' + data.poster_path, '|', 'https://image.tmdb.org/t/p/original' + data.backdrop_path);
    } catch(e) { console.log(m.q, 'error'); }
  }
}
run();
