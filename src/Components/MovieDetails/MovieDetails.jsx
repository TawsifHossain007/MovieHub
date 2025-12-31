import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const MovieDetails = () => {
  const { user } = use(AuthContext);
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInCollection, setIsInCollection] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`https://assignment-10-server-coral-theta.vercel.app/movies/${id}`);
        setMovie(response.data);
        setLoading(false);

        // After loading movie, check if it exists in collection
        if (user?.email) {
          const collectionRes = await axios.get(
            `https://assignment-10-server-coral-theta.vercel.app/collection?email=${user.email}`
          );

          const exists = collectionRes.data.some(
            (item) => item.movie_id === id
          );
          setIsInCollection(exists);
        }
      } catch (error) {
        console.error("Error fetching movie:", error);
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id, user?.email]);

  const handleAddToCollection = async () => {
    const newCollection = {
      user_email: user.email,
      movie_id: movie._id,
      title: movie.title,
      director: movie.director,
      posterUrl: movie.posterUrl,
      genre: movie.genre,
      releaseYear: movie.releaseYear,
    };

    try {
      await axios.post("https://assignment-10-server-coral-theta.vercel.app/collection", newCollection);
      setIsInCollection(true);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Added to My Watchlist",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading...
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Movie not found
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white rounded-xl shadow-xl mt-10">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full md:w-1/3 rounded-xl shadow-lg"
        />

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
            <p className="text-gray-400 mb-4">
              {movie.genre} | {movie.language} | {movie.country} |{" "}
              {movie.releaseYear}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Director:</span> {movie.director}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Cast:</span> {movie.cast}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Duration:</span> {movie.duration}{" "}
              min
            </p>
            <p className="mb-2">
              <span className="font-semibold">Rating:</span> {movie.rating}/10
            </p>
            <p className="mt-4 text-gray-300">{movie.plotSummary}</p>
          </div>

          <button
            onClick={handleAddToCollection}
            disabled={isInCollection}
            className={`mt-6 font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 cursor-pointer ${
              isInCollection
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 text-white"
            }`}
          >
            {isInCollection ? "Added to Watchlist" : "Add to Watchlist"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
