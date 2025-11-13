import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Loading from "../Loading/Loading";


const Banner = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/movies")
      .then((res) => {
        setMovies(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [movies]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <Loading />
      </div>
    );
  }

  if (movies.length === 0)
    return (
      <div className="flex justify-center items-center h-[400px]">
        <p className="text-gray-400 text-lg">No movies found.</p>
      </div>
    );

  const currentMovie = movies[currentIndex];

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-2xl shadow-lg">
      <AnimatePresence>
        <motion.img
          key={currentMovie._id}
          src={currentMovie.posterUrl}
          alt={currentMovie.title}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute w-full h-full object-cover"
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-8 text-white">
        <motion.div
          key={currentMovie.title}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold">{currentMovie.title}</h2>
          <p className="text-sm text-gray-300">
            {currentMovie.genre} • {currentMovie.releaseYear} • ⭐
            {currentMovie.rating}
          </p>
          <p className="mt-3 max-w-2xl text-gray-200 line-clamp-3">
            {currentMovie.plotSummary}
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {movies.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === currentIndex ? "bg-white scale-125" : "bg-gray-500"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Banner;
