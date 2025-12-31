import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useNavigate } from "react-router";
import Loading from "../Components/Loading/Loading";
import { motion } from "framer-motion";

const MyMovies = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [myMovies, setMyMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyMovies = async () => {
      if (user?.email) {
        const res = await axios.get(
          `https://assignment-10-server-coral-theta.vercel.app/movies/user?email=${user.email}`
        );
        setMyMovies(res.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };
    fetchMyMovies();
  }, [user?.email]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This movie will be deleted from everywhere!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://assignment-10-server-coral-theta.vercel.app/movies/${id}?email=${user.email}`);
          setMyMovies(myMovies.filter((movie) => movie._id !== id));
          Swal.fire("Deleted!", "Movie has been deleted everywhere.", "success");
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "Could not delete movie.", "error");
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

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
      className="max-w-6xl mx-auto p-6 bg-base-100"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      {myMovies.length === 0 ? (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-gray-400">You haven’t added any movies yet.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {myMovies.map((movie) => (
            <div
              key={movie._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border-2 border-blue-500"
            >
              <div className="w-full h-64 overflow-hidden">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{movie.title}</h2>
                <p className="text-gray-500 text-sm mt-1">{movie.genre}</p>
                <p className="text-gray-400 text-sm mt-1">
                  {movie.releaseYear} • {movie.language}
                </p>
                <button
                  onClick={() => handleDelete(movie._id)}
                  className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md text-sm transition-colors duration-200"
                >
                  Delete
                </button>
                <button
                  onClick={() => navigate(`/movies/update/${movie._id}`)}
                  className="mt-2 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-md text-sm transition-colors duration-200"
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default MyMovies;
