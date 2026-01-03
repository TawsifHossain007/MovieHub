import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UpdateMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure()

  const [movie, setMovie] = useState({
    title: "",
    genre: "",
    releaseYear: "",
    director: "",
    cast: "",
    rating: "",
    duration: "",
    plotSummary: "",
    posterUrl: "",
    language: "",
    country: "",
  });

  useEffect(() => {
    axios
      .get(`https://assignment-10-server-coral-theta.vercel.app/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  };

  const handleUpdateMovie = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.patch(`/movies/${id}`, movie);
      Swal.fire({
        icon: "success",
        title: "Movie updated successfully",
        showConfirmButton: true,
      }).then(() => navigate("/dashboard/myCollection"));
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to update movie",
        text: err.message,
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-200 rounded-lg shadow-lg mt-10 mb-20">
      <h2 className="text-2xl font-bold mb-4 text-center">Update Movie</h2>
      <form onSubmit={handleUpdateMovie} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Movie Title"
          value={movie.title}
          onChange={handleChange}
          required
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="genre"
          placeholder="Genre (e.g. Action, Adventure, Sci-Fi)"
          value={movie.genre}
          onChange={handleChange}
          required
          className="input input-bordered w-full"
        />
        <input
          type="number"
          name="releaseYear"
          placeholder="Release Year"
          value={movie.releaseYear}
          onChange={handleChange}
          required
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="director"
          placeholder="Director"
          value={movie.director}
          onChange={handleChange}
          required
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="cast"
          placeholder="Cast (e.g. Sam Worthington, Zoe Saldana)"
          value={movie.cast}
          onChange={handleChange}
          required
          className="input input-bordered w-full"
        />
        <input
          type="number"
          step="0.1"
          name="rating"
          placeholder="Rating (e.g. 7.8)"
          value={movie.rating}
          onChange={handleChange}
          required
          className="input input-bordered w-full"
        />
        <input
          type="number"
          name="duration"
          placeholder="Duration (in minutes)"
          value={movie.duration}
          onChange={handleChange}
          required
          className="input input-bordered w-full"
        />
        <textarea
          name="plotSummary"
          placeholder="Plot Summary"
          value={movie.plotSummary}
          onChange={handleChange}
          required
          className="textarea textarea-bordered w-full"
        ></textarea>
        <input
          type="text"
          name="posterUrl"
          placeholder="Poster Image URL"
          value={movie.posterUrl}
          onChange={handleChange}
          required
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="language"
          placeholder="Language (e.g. English)"
          value={movie.language}
          onChange={handleChange}
          required
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="country"
          placeholder="Country (e.g. USA)"
          value={movie.country}
          onChange={handleChange}
          required
          className="input input-bordered w-full"
        />
        <button type="submit" className="btn btn-primary w-full">
          Update Movie
        </button>
      </form>
    </div>
  );
};

export default UpdateMovie;
