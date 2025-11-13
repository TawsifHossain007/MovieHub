import React, { useContext } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const AddMovie = () => {
  const { user } = useContext(AuthContext);

  const handleAddMovie = async (e) => {
    e.preventDefault();
    const form = e.target;

    const newMovie = {
      title: form.title.value,
      genre: form.genre.value,
      releaseYear: form.releaseYear.value,
      director: form.director.value,
      cast: form.cast.value,
      rating: parseFloat(form.rating.value),
      duration: parseInt(form.duration.value),
      plotSummary: form.plotSummary.value,
      posterUrl: form.posterUrl.value,
      language: form.language.value,
      country: form.country.value,
      addedBy: user?.email,
    };

    try {
      const res = await axios.post("http://localhost:3000/movies", newMovie);

      if (res.data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Movie added successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        form.reset();
      }
    } catch (error) {
      console.error("Error adding movie:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to add movie. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-base-200 rounded-xl shadow-lg mt-10 mb-20">
      <h2 className="text-2xl font-bold text-center mb-5">Add a New Movie</h2>

      <form onSubmit={handleAddMovie} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Movie Title"
          required
          className="input input-bordered w-full"
        />

        <input
          type="text"
          name="genre"
          placeholder="Genre (e.g. Action, Adventure, Sci-Fi)"
          required
          className="input input-bordered w-full"
        />

        <input
          type="number"
          name="releaseYear"
          placeholder="Release Year"
          required
          className="input input-bordered w-full"
        />

        <input
          type="text"
          name="director"
          placeholder="Director"
          required
          className="input input-bordered w-full"
        />

        <input
          type="text"
          name="cast"
          placeholder="Cast (e.g. Sam Worthington, Zoe Saldana)"
          required
          className="input input-bordered w-full"
        />

        <input
          type="number"
          step="0.1"
          name="rating"
          placeholder="Rating (e.g. 7.8)"
          required
          className="input input-bordered w-full"
        />

        <input
          type="number"
          name="duration"
          placeholder="Duration (in minutes)"
          required
          className="input input-bordered w-full"
        />

        <textarea
          name="plotSummary"
          placeholder="Plot Summary"
          required
          className="textarea textarea-bordered w-full"
        ></textarea>

        <input
          type="text"
          name="posterUrl"
          placeholder="Poster Image URL"
          required
          className="input input-bordered w-full"
        />

        <input
          type="text"
          name="language"
          placeholder="Language (e.g. English)"
          required
          className="input input-bordered w-full"
        />

        <input
          type="text"
          name="country"
          placeholder="Country (e.g. USA)"
          required
          className="input input-bordered w-full"
        />

        <button type="submit" className="btn btn-primary w-full">
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default AddMovie;
