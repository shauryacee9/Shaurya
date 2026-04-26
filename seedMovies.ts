import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Movie from './backend/models/Movie.ts';

dotenv.config();

export const movies = [
  {
    title: 'Avengers: Endgame',
    description: 'After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to restore balance to the universe.',
    thumbnailUrl: 'https://www.google.com/imgres?q=avengers%20endgame%20thumbnail&imgurl=https%3A%2F%2Fimages.alphacoders.com%2F111%2F1119553.jpg&imgrefurl=https%3A%2F%2Fwall.alphacoders.com%2Fbig.php%3Fi%3D1119553&docid=FJBhMZ6AFpz8vM&tbnid=IdFUO_jeCZGFpM&vet=12ahUKEwjXrsmHjIyUAxU7cWwGHdO7EO4QnPAOegQIGhAB..i&w=3840&h=2160&hcb=2&ved=2ahUKEwjXrsmHjIyUAxU7cWwGHdO7EO4QnPAOegQIGhAB',
    bannerUrl: 'https://image.tmdb.org/t/p/original/7RyB7jV7RzwOcl9GqYhOsnUZpS5.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    category: 'Action',
    language: 'English',
    releaseYear: 2019,
    rating: 'PG-13',
    isTrending: true,
  },
  {
    title: 'Naruto: Shippuden',
    description: 'Naruto Uzumaki, is a loud, hyperactive, adolescent ninja who constantly searches for approval and recognition, as well as to become Hokage, who is acknowledged as the leader and strongest of all ninja in the village.',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w500/z80it9X6EovfAsu48FvSscfEIsy.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/6v7S18Vn3bPr1B0D8XizWnIuK5p.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    category: 'Anime',
    language: 'Japanese',
    releaseYear: 2007,
    rating: 'TV-14',
    isTrending: true,
  },
  {
    title: 'Money Heist',
    description: 'An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w500/reEMJA1uzpG3Yp7KGj77S261pM9.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/m9Y9m0pCjU5Z5FidAozRszAnP9w.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    category: 'Drama',
    language: 'Spanish',
    releaseYear: 2017,
    rating: 'TV-MA',
    isTrending: true,
  },
  {
    title: 'Stranger Things',
    description: 'When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w500/49WfTJsjsjzvyufpPZ9kS3El6S.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/56v2KjUioKmC6r6G9S7O7As09Yt.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    category: 'Sci-Fi',
    language: 'English',
    releaseYear: 2016,
    rating: 'TV-14',
    isTrending: true,
  },
  {
    title: 'Attack on Titan',
    description: 'After his hometown is destroyed and his mother is killed, young Eren Jaeger vows to cleanse the earth of the giant humanoid Titans that have brought humanity to the brink of extinction.',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w500/hEkaBovS0pZ6mN89OonS9S9779D.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/yD9vP610f44U9Xp6u189yXkLqC.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    category: 'Anime',
    language: 'Japanese',
    releaseYear: 2013,
    rating: 'TV-MA',
    isTrending: false,
  },
  {
    title: 'Jujutsu Kaisen',
    description: 'A boy swallows a cursed talisman - the finger of a demon - and becomes cursed himself. He enters a shaman\'s school to be able to locate the demon\'s other body parts and thus exorcise himself.',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w500/hEkaBovS0pZ6mN89OonS9S9779D.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/2meXBsGv9uXlS76C6YvAnScy3p8.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    category: 'Anime',
    language: 'Japanese',
    releaseYear: 2020,
    rating: 'TV-MA',
    isTrending: true,
  },
  {
    title: 'Dark',
    description: 'A family saga with a supernatural twist, set in a German town, where the disappearance of two young children exposes the relationships among four families.',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w500/6v0800p6Zp6uXh1aYhPn06ZJqG0.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/3l2vE29Nq87wUuXN7b0E7U7S4X7.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    category: 'Sci-Fi',
    language: 'German',
    releaseYear: 2017,
    rating: 'TV-MA',
    isTrending: false,
  },
  {
    title: 'Breaking Bad',
    description: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family\'s future.',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w500/ggm8bb9ub8049vS63vSvV6S7kM3.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/ts71U5zP3U2O0Y7W1F8B70vX4F.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    category: 'Crime',
    language: 'English',
    releaseYear: 2008,
    rating: 'TV-MA',
    isTrending: true,
  },
  {
    title: 'Interstellar',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6hf3LRGvbiPa1.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/rAiYVoPDUZp_Z9X9Vv9pPn5BvS.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    category: 'Sci-Fi',
    language: 'English',
    releaseYear: 2014,
    rating: 'PG-13',
    isTrending: false,
  },
  {
    title: 'Inception',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    thumbnailUrl: 'https://image.tmdb.org/t/p/w500/edv5CZvj0j9skXY0hXbi6p9f9CC.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/s3TBrj9vzS6P6vXv_An_T8AnS0b.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
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
