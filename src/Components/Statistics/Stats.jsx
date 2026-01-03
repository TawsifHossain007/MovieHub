import axios from "axios";
import React, { useState } from "react";
import MovieCard from "../MovieCard/MovieCard";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Stats = () => {
  const [stats, setStats] = useState([]);
  const [latest, setLatest] = useState([]);
  const axiosSecure = useAxiosSecure()

  
    const {data: users = []} = useQuery({
      queryKey: ["users"],
      queryFn: async()=> {
        const res = await axiosSecure.get("/users")
        return res.data
      }
    })

  const genres = [
    { name: "Action", color: "from-red-500 to-orange-500", emoji: "💥" },
    { name: "Sci-Fi", color: "from-indigo-500 to-purple-500", emoji: "🚀" },
    { name: "Drama", color: "from-rose-400 to-pink-600", emoji: "🎭" },
    { name: "Comedy", color: "from-yellow-400 to-amber-500", emoji: "😂" },
    { name: "Romance", color: "from-pink-500 to-rose-500", emoji: "💘" },
    { name: "Thriller", color: "from-gray-700 to-gray-900", emoji: "🕵️" },
    { name: "Horror", color: "from-black to-red-800", emoji: "👻" },
    { name: "Fantasy", color: "from-teal-400 to-blue-500", emoji: "🧙" },
    { name: "Mystery", color: "from-slate-500 to-indigo-700", emoji: "🧩" },
    { name: "Animation", color: "from-green-400 to-emerald-500", emoji: "🐭" },
  ];

  axios
    .get("https://assignment-10-server-coral-theta.vercel.app/movies")
    .then((res) => {
      const data = res.data;
      setStats(data);
    })
    .catch((err) => {
      console.log(err);
    });

  axios
    .get("https://assignment-10-server-coral-theta.vercel.app/movies/latest")
    .then((res) => {
      const data = res.data;
      setLatest(data);
    })
    .catch((err) => {
      console.log(err);
    });


  return (
    <div className="w-11/12 mx-auto mt-20">
      <div className=" flex flex-col md:flex-row items-center justify-center gap-5">
        <div>
          <h1 className="p-10 bg-linear-to-br from-[#2005ee] via-[#09e8b4fd] to-[#05e9e9] rounded-2xl text-white py-20 font-semibold text-4xl md:text-5xl">
            Total Movies: {stats.length}
          </h1>
        </div>
        <div>
          <h1 className="p-10 bg-linear-to-br from-[#05e9e9] via-[#09e8b4fd] to-[#2005ee] rounded-2xl text-white py-20 font-semibold text-4xl md:text-5xl">
            Total Users: {users.length}
          </h1>
        </div>
      </div>

      {/* Top Rated Movies */}
      <div className=" mt-30">
        <h1 className="text-center font-bold text-7xl">Top-Rated Movies</h1>
        <p className="text-center font-normal text-xl mt-5">
          Discover the finest films that have captivated audiences and critics
          alike. These top-rated movies stand out for their compelling
          storytelling, exceptional performances, and unforgettable cinematic
          experiences. Each film on this list represents the very best in
          creativity and craftsmanship — a must-watch for every movie lover.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-20">
          {stats
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 3)
            .map((movie) => (
              <MovieCard movie={movie}></MovieCard>
            ))}
        </div>
      </div>
      {/* Recently Added Movies */}
      <div className="mt-30">
        <h1 className="text-center font-bold text-7xl">Latest Movies</h1>
        <p className="text-center font-normal text-xl mt-5">
          Stay up to date with the newest additions to our collection. These
          fresh releases bring new stories, unforgettable moments, and cinematic
          brilliance straight from the big screen to your watchlist. Discover
          what’s trending and be the first to experience the latest in film.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-20">
          {latest.map((movie) => (
            <MovieCard movie={movie}> </MovieCard>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center mt-20">
      <Link to={"/allMovies"} className="btn btn-primary py-7 px-12 text-2xl">Show All</Link>
      </div>
      {/* Genres */}
      <div className="w-11/12 mx-auto mt-30 text-center">
        <h1 className="text-4xl font-bold mb-4">🎥 Explore by Genre</h1>
        <p className=" max-w-2xl mx-auto mb-10">
          Dive into a world of stories across every mood and imagination.
          Whether you love fast-paced action, heartfelt romance, or mind-bending
          sci-fi, find the perfect genre to match your vibe.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 place-items-center">
          {genres.map((genre, idx) => (
            <div
              key={idx}
              className={`w-full text-white font-semibold rounded-2xl py-10 shadow-lg bg-linear-to-br ${genre.color} hover:scale-105 transition-transform duration-300`}
            >
              <div className="text-5xl mb-2">{genre.emoji}</div>
              <p className="text-lg">{genre.name}</p>
            </div>
          ))}
        </div>
      </div>
      {/* About Platform */}
      <div className="bg-base-200 py-12 px-6 text-center rounded-2xl mt-25 mb-20">
        <h2 className="text-3xl font-bold mb-4 text-primary">
          About MovieMaster Pro
        </h2>
        <p className="max-w-3xl mx-auto text-lg">
          <span className="font-semibold">MovieMaster Pro</span> is your
          ultimate movie management platform — designed to help users explore,
          manage, and analyze films with ease. From top-rated classics to the
          latest releases, MovieMaster Pro gives you instant access to detailed
          movie data, ratings, genres, and more. Whether you're a film
          enthusiast or a developer learning backend integration, our platform
          demonstrates the seamless power of modern web technologies, efficient
          data handling, and an elegant user experience.
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="p-6 bg-white shadow rounded-xl">
            <h3 className="text-xl font-semibold text-primary mb-2">
              Smart Data Management
            </h3>
            <p className="text-gray-600">
              Efficiently store, retrieve, and display movie information
              directly from your database.
            </p>
          </div>
          <div className="p-6 bg-white shadow rounded-xl">
            <h3 className="text-xl font-semibold text-primary mb-2">
              Dynamic Movie Display
            </h3>
            <p className="text-gray-600">
              Showcase movies by rating, genre, or latest additions — all
              automatically updated.
            </p>
          </div>
          <div className="p-6 bg-white shadow rounded-xl">
            <h3 className="text-xl font-semibold text-primary mb-2">
              Modern UI Experience
            </h3>
            <p className="text-gray-600">
              Built with React, Tailwind CSS, and DaisyUI for a clean,
              responsive, and engaging interface.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;