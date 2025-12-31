import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MovieCard from '../Components/MovieCard/MovieCard';
import Loading from '../Components/Loading/Loading';
import { motion } from 'framer-motion';

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genreFilter, setGenreFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');

  useEffect(() => {
    axios
      .get("https://assignment-10-server-coral-theta.vercel.app/movies")
      .then((res) => {
        setMovies(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  const filteredMovies = movies.filter((movie) => {
    const genreMatch = genreFilter 
      ? movie.genre.toLowerCase().includes(genreFilter.toLowerCase()) 
      : true;
    const ratingMatch = ratingFilter ? movie.rating >= Number(ratingFilter) : true;
    return genreMatch && ratingMatch;
  });

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const pageTransition = {
    duration: 0.6,
    ease: "easeOut"
  };

  return (
    <motion.div
      className='bg-base-100 min-h-screen w-11/12 mx-auto mt-20'
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      <h1 className="text-center font-bold text-7xl">The Movie Vault</h1>
      <p className="text-center font-normal text-xl mt-5">
        Step inside the ultimate cinematic library. From timeless classics to the newest releases, this page brings together every movie in our collection.
      </p>

      <div className='flex flex-col md:flex-row justify-center items-center gap-5 mt-10'>
        <input
          type="text"
          placeholder="Filter by genre"
          className="input input-bordered w-full md:w-1/4"
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min rating (0-10)"
          className="input input-bordered w-full md:w-1/4"
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
          min="0"
          max="10"
        />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-10 mt-10 mb-20'>
        {filteredMovies.length > 0 ? (
          filteredMovies.map(movie => <MovieCard key={movie._id} movie={movie} />)
        ) : (
          <p className="text-center col-span-3 text-xl mt-10">No movies match your filters.</p>
        )}
      </div>
    </motion.div>
  );
};

export default AllMovies;
