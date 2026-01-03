import React from 'react';
import { Link } from 'react-router';

const MovieCard = ({ movie }) => {
  return (
    <div className=" card bg-blue-500 shadow-xl rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300">
      <figure>
        <img src={movie.posterUrl} alt={movie.title} className="w-full h-72 object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg font-bold">{movie.title}</h2>
        <p className="text-sm font-medium text-gray-800">{movie.genre} • {movie.releaseYear}</p>
       
        <div className="flex justify-between items-center mt-5">
          <span className="font-semibold text-yellow-500">⭐ {movie.rating}</span>
          <span className="text-sm text-black">{movie.duration} min</span>
        </div>
        <Link to={`/movieDetails/${movie._id}`} className='btn w-full bg-white text-blue-500 mt-5 hover:bg-blue-500 hover:text-white'>View Details</Link>
      </div>
    </div>
  );
};

export default MovieCard;