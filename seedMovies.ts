import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Movie from './backend/models/Movie.ts';

dotenv.config();

export const movies = [
  {
    title: 'Avengers: Endgame',
    description: 'After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to restore balance to the universe.',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w500/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg',
    videoUrl: 'https://www.youtube.com/embed/TcMBFSGVi1c',
    trailerUrl: 'https://www.youtube.com/embed/TcMBFSGVi1c',
    category: 'Action',
    language: 'English',
    releaseYear: 2019,
    rating: 'PG-13',
    isTrending: true,
  },
  {
    title: 'Naruto: Shippuden',
    description: 'Naruto Uzumaki, is a loud, hyperactive, adolescent ninja who constantly searches for approval and recognition, as well as to become Hokage, who is acknowledged as the leader and strongest of all ninja in the village.',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w500/71mASgFgSiPl9QUexVH8BubU0lD.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/z0YhJvomqedHF85bplUJEotkN5l.jpg',
    videoUrl: 'https://www.youtube.com/embed/22R0j8UKRzY',
    trailerUrl: 'https://www.youtube.com/embed/22R0j8UKRzY',
    category: 'Anime',
    language: 'Japanese',
    releaseYear: 2007,
    rating: 'TV-14',
    isTrending: true,
  },
  {
    title: 'Money Heist',
    description: 'An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/gFZriCkpJYsApPZEF3jhxL4yLzG.jpg',
    videoUrl: 'https://www.youtube.com/embed/_InqQJRqGW4',
    trailerUrl: 'https://www.youtube.com/embed/_InqQJRqGW4',
    category: 'Drama',
    language: 'Spanish',
    releaseYear: 2017,
    rating: 'TV-MA',
    isTrending: true,
  },
  {
    title: 'Stranger Things',
    description: 'When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w500/uOOtwVbSr4QDjAGIifLDwpb2Pdl.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg',
    videoUrl: 'https://www.youtube.com/embed/b9EkMc79ZSU',
    trailerUrl: 'https://www.youtube.com/embed/b9EkMc79ZSU',
    category: 'Sci-Fi',
    language: 'English',
    releaseYear: 2016,
    rating: 'TV-14',
    isTrending: true,
  },
  {
    title: 'Attack on Titan',
    description: 'After his hometown is destroyed and his mother is killed, young Eren Jaeger vows to cleanse the earth of the giant humanoid Titans that have brought humanity to the brink of extinction.',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w500/hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/rqbCbjB19amtOtFQbb3K2lgm2zv.jpg',
    videoUrl: 'https://www.youtube.com/embed/LV-nazLVmgo',
    trailerUrl: 'https://www.youtube.com/embed/LV-nazLVmgo',
    category: 'Anime',
    language: 'Japanese',
    releaseYear: 2013,
    rating: 'TV-MA',
    isTrending: false,
  },
  {
    title: 'Jujutsu Kaisen',
    description: 'A boy swallows a cursed talisman - the finger of a demon - and becomes cursed himself. He enters a shaman\'s school to be able to locate the demon\'s other body parts and thus exorcise himself.',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w500/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/qpin8cASXEVtwhzNsprHYFiOAGk.jpg',
    videoUrl: 'https://www.youtube.com/embed/pkKu9hLT-t8',
    trailerUrl: 'https://www.youtube.com/embed/pkKu9hLT-t8',
    category: 'Anime',
    language: 'Japanese',
    releaseYear: 2020,
    rating: 'TV-MA',
    isTrending: true,
  },
  {
    title: 'Dark',
    description: 'A family saga with a supernatural twist, set in a German town, where the disappearance of two young children exposes the relationships among four families.',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w500/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/3jDXL4Xvj3AzDOF6UH1xeyHW8MH.jpg',
    videoUrl: 'https://www.youtube.com/embed/ESEUoa-mz2c',
    trailerUrl: 'https://www.youtube.com/embed/ESEUoa-mz2c',
    category: 'Sci-Fi',
    language: 'German',
    releaseYear: 2017,
    rating: 'TV-MA',
    isTrending: false,
  },
  {
    title: 'Breaking Bad',
    description: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family\'s future.',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w500/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg',
    videoUrl: 'https://www.youtube.com/embed/HhesaQXLuRY',
    trailerUrl: 'https://www.youtube.com/embed/HhesaQXLuRY',
    category: 'Crime',
    language: 'English',
    releaseYear: 2008,
    rating: 'TV-MA',
    isTrending: true,
  },
  {
    title: 'Interstellar',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w500/yQvGrMoipbRoddT0ZR8tPoR7NfX.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/2ssWTSVklAEc98frZUQhgtGHx7s.jpg',
    videoUrl: 'https://www.youtube.com/embed/zSWdZVtXT7E',
    trailerUrl: 'https://www.youtube.com/embed/zSWdZVtXT7E',
    category: 'Sci-Fi',
    language: 'English',
    releaseYear: 2014,
    rating: 'PG-13',
    isTrending: false,
  },
  {
    title: 'Inception',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w500/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg',
    videoUrl: 'https://www.youtube.com/embed/YoHD9XEInc0',
    trailerUrl: 'https://www.youtube.com/embed/YoHD9XEInc0',
    category: 'Sci-Fi',
    language: 'English',
    releaseYear: 2010,
    rating: 'PG-13',
    isTrending: true,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('Connected to MongoDB for seeding...');
    
    await Movie.deleteMany({});
    console.log('Cleared existing movies.');
    
    await Movie.insertMany(movies);
    console.log('✅ Sample movies inserted successfully!');
    
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
