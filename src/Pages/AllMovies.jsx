import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MovieCard from '../Components/MovieCard/MovieCard';
import Loading from '../Components/Loading/Loading';


const AllMovies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("http://localhost:3000/movies")
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

    return (
        <div className='bg-base-100 min-h-screen w-11/12 mx-auto mt-20'>
            <h1 className="text-center font-bold text-7xl">The Movie Vault</h1>
            <p className="text-center font-normal text-xl mt-5">
                Step inside the ultimate cinematic library. From timeless classics to the newest releases, this page brings together every movie in our collection. Browse by genre, discover hidden gems, and enjoy the full spectrum of stories that MovieMaster Pro has to offer.
            </p>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-10 mt-20 mb-20'>
                {movies.map(movie => <MovieCard key={movie._id} movie={movie}></MovieCard>)}
            </div>
        </div>
    );
};

export default AllMovies;
