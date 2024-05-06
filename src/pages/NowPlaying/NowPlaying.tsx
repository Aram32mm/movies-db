import React, { useEffect, useState } from "react";
import { MovieCard } from "../../components/MovieCard";
import { getNowPlayingMovies } from "../../services/movies";
import { IMovieResponse } from "../../services/movies/types";
import { ReactComponent as SortByNameIcon} from '../../assets/sortByName.svg';
import { ReactComponent as SortByCalificationIcon} from '../../assets/sortByCalification.svg';

const NowPlaying: React.FC = () => {
  const [movies, setMovies] = useState<IMovieResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMovies, setErrorMovies] = useState<boolean>(false);
  const [sortByName, setSortByName] = useState<boolean>(false);
  const [sortByCalification, setSortByCalification] = useState<boolean>(false);

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

  const handleSortByName = () => {
    if (!sortByName) {
      setSortByName(true);
      setSortByCalification(false); // Ensure only one filter is active at a time
      const sortedMovies = [...movies].sort((a, b) => a.title.localeCompare(b.title));
      setMovies(sortedMovies);
    } else {
      setSortByName(false);
      getNowPlaying();
    }
  };

  const handleSortByCalification = () => {
    if (!sortByCalification) {
      setSortByCalification(true);
      setSortByName(false); // Ensure only one filter is active at a time
      const sortedMovies = [...movies].sort((a, b) => b.vote_average - a.vote_average);
      setMovies(sortedMovies);
    } else {
      setSortByCalification(false);
      getNowPlaying();
    }
  };

  useEffect(() => {
    setLoading(true);
    getNowPlaying();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between">
          <div className="font-bold text-gray-800 text-2xl py-4 px-6">NOW PLAYING</div>
          <div className="flex items-center">
            <button
              onClick={handleSortByName}
              className={`flex items-center px-2 py-1 rounded-md ml-2 text-sm ${
                sortByName ? "bg-green-500 text-white" : "bg-blue-500 text-white"
              }`}
            >
              <SortByNameIcon className="w-3 h-3 ml-1" />
              <div className="px-2 py-1">{sortByName ? "Sorted By Name" : "Sort By Name"}</div>
            </button>
            <button
              onClick={handleSortByCalification}
              className={`flex items-center px-2 py-1 rounded-md ml-2 text-sm ${
                sortByCalification ? "bg-green-500 text-white" : "bg-blue-500 text-white"
              }`}
            >
              <SortByCalificationIcon className="w-3 h-3 ml-1" />
              <div className="px-2 py-1">{sortByCalification ? "Sorted By Calification" : "Sort By Calification"}</div>
            </button>
          </div>  
      </div>
      <div className="flex flex-wrap justify-between">
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
