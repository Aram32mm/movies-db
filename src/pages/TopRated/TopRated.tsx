import React, { useEffect, useState } from "react";

import { IMovieResponse } from "../../services/movies/types";
import { MovieCard } from "../../components/MovieCard";
import { getTopRatedMovies } from "../../services";

const TopRated: React.FC = () => {
  const [movies, setMovies] = useState<IMovieResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMovies, setErrorMovies] = useState<boolean>(false);

  const getTopRated = async () => {
    await getTopRatedMovies()
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
    getTopRated();
  }, []);

  return (
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
  );
};

export default TopRated;
