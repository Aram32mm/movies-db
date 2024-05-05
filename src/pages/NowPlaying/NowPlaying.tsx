import React, { useEffect, useState } from "react";

import { MovieCard } from "../../components/MovieCard";
import { getNowPlayingMovies } from "../../services/movies";
import { IMovieResponse } from "../../services/movies/types";

const NowPlaying: React.FC = () => {
  const [movies, setMovies] = useState<IMovieResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMovies, setErrorMovies] = useState<boolean>(false);

  const getNowPlaying = async () => {
    await getNowPlayingMovies()
      .then((res) => {
        if (res && res.data) {
          setMovies(res.data.results);
        }
      })
      .catch((err) => {
        setErrorMovies(true);
      });
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getNowPlaying();
  }, []);

  return (
    <div>
      <div className="font-bold text-gray-800 text-2xl py-4 px-6">
          NOW PLAYING
      </div>
      <div>
        {loading && <div> Loading...</div>}
        {errorMovies && <div> Error...</div>}
        {movies?.length > 0 &&
          movies.map((movie) => (
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
  );
};

export default NowPlaying;
