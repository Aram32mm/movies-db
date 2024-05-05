import { MovieCard } from '../../components/MovieCard';
import React from 'react';
import { movies } from '../../constants/moviesMock';

const Home = () => {
  return (
    <div>
      <MovieCard
        movieId={movies[0].id}
        posterPath={movies[0].poster_path}
        title={movies[0].title}
        voteAverage={movies[0].vote_average}
        genreId={movies[0].genre_ids[0]}
      />
    </div>
  );
};

export default Home;
