import { MovieCard } from '../../components/MovieCard';
import { useEffect, useState } from 'react';
import { getPopularMovies, getTopRatedMovies, getNowPlayingMovies } from '../../services/movies';
import { IMovieResponse } from '../../services/movies/types';


const Home = () => {
    const [popularMovies, setPopularMovies] = useState<IMovieResponse[]>([]);
    const [topRatedMovies, setTopRatedMovies] = useState<IMovieResponse[]>([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState<IMovieResponse[]>([]);
    
    const [loading, setLoading] = useState(false);
    const [errorMovies, setErrorMovies] = useState<boolean>(false);

    const getPopular = async () => {
        await getPopularMovies()
            .then((res) => {
                if (res && res.data) {
                    console.log(res.data.results, "res");
                    setPopularMovies(res.data.results.slice(0, 8));
                }
            })
            .catch((err) => {
                setErrorMovies(true);
            });
        setLoading(false);
    };

    const getTopRated = async () => {
        await getTopRatedMovies()
            .then((res) => {
                if (res && res.data) {
                    console.log(res.data.results, "res");
                    setTopRatedMovies(res.data.results.slice(0, 8));
                }
            })
            .catch((err) => {
                setErrorMovies(true);
            });
        setLoading(false);
    };

    const getNowPlaying = async () => {
        await getNowPlayingMovies()
            .then((res) => {
                if (res && res.data) {
                    console.log(res.data.results, "res");
                    setNowPlayingMovies(res.data.results.slice(0, 8));
                }
            })
            .catch((err) => {
                setErrorMovies(true);
            });
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        getPopular();
        getTopRated();
        getNowPlaying();
    }, []);

    return (
      <div className="flex flex-col">
        {/* POPULAR */}
        <div>
            <div className="font-bold text-gray-800 text-2xl py-4 px-6">
                POPULAR
            </div>
            <div className="flex max-w-full overflow-x-auto">
              {loading && <div> Loading...</div>}
              {errorMovies && <div> Error...</div>}
              {popularMovies?.length > 0 &&
                popularMovies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movieId={movie.id}
                    posterPath={movie.poster_path}
                    title={movie.title}
                    voteAverage={movie.vote_average}
                    genreId={movie.genre_ids[0]}
                  />
                ))}
            </div>
        </div>
        {/* TOP RATED */}
        <div>
            <div className="font-bold text-gray-800 text-2xl py-4 px-6">
                TOP RATED
            </div>
            <div className="flex max-w-full overflow-x-auto">
              {loading && <div> Loading...</div>}
              {errorMovies && <div> Error...</div>}
              {topRatedMovies?.length > 0 &&
                topRatedMovies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movieId={movie.id}
                    posterPath={movie.poster_path}
                    title={movie.title}
                    voteAverage={movie.vote_average}
                    genreId={movie.genre_ids[0]}
                  />
                ))}
            </div>
        </div>
        {/* NOW PLAYING */}
        <div>
            <div className="font-bold text-gray-800 text-2xl py-4 px-6">
                NOW PLAYING
            </div>
            <div className="flex max-w-full overflow-x-auto">
              {loading && <div> Loading...</div>}
              {errorMovies && <div> Error...</div>}
              {nowPlayingMovies?.length > 0 &&
                nowPlayingMovies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movieId={movie.id}
                    posterPath={movie.poster_path}
                    title={movie.title}
                    voteAverage={movie.vote_average}
                    genreId={movie.genre_ids[0]}
                  />
                ))}
            </div>
        </div>
      </div>
    ) 

};

export default Home;
