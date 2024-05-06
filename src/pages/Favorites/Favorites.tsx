import { useEffect, useState } from "react";
import { MovieCard } from "../../components/MovieCard";
import { getMovieDetails } from "../../services/movies/getMovieDetails";
import { IMovieDetail } from "../../services/movies/types";
import { ReactComponent as SortByNameIcon} from '../../assets/sortByName.svg';
import { ReactComponent as SortByCalificationIcon} from '../../assets/sortByCalification.svg';

const Favorites = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<IMovieDetail[]>([]);
  const [sortByName, setSortByName] = useState<boolean>(false);
  const [sortByCalification, setSortByCalification] = useState<boolean>(false);
  const favorites: string = localStorage.getItem("favorites") || "";

  const getFavorites = async () => {
    if (favorites.length) {
      // favorites.length > 0
      const favoritesArray = JSON.parse(favorites); // ["213123", "123123"]
      const newMovies = await Promise.all(
        favoritesArray.map(async (favoriteId: string) => {
          return getMovieDetails(favoriteId)
            .then((res) => {
              if (res && res.data) {
                // res?.data
                return res.data;
              }
            })
            .catch((err) => {
              console.log(err, "err");
            });
        })
      );
      setMovies(newMovies);
      setLoading(false);
    }
  };

  const handleSortByName = () => {
    if (!sortByName) {
      setSortByName(true);
      setSortByCalification(false); // Ensure only one filter is active at a time
      const sortedMovies = [...movies].sort((a, b) => a.title.localeCompare(b.title));
      setMovies(sortedMovies);
    } else {
      setSortByName(false);
      getFavorites();
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
      getFavorites();
    }
  };

  useEffect(() => {
    setLoading(true);
    getFavorites();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between">
          <div className="font-bold text-gray-800 text-2xl py-4 px-6">MY FAVORITES</div>
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
      <div>
        {!loading ? (
          <div>
            {favorites && favorites.length > 0 ? (
              <div>
                {movies && movies.length > 0 ? (
                  <div className="flex flex-wrap justify-start">
                    {movies.map((show: IMovieDetail) => (
                      <MovieCard
                        key={show.id}
                        movieId={show.id}
                        title={show.title}
                        genreId={show.genres[0].id}
                        voteAverage={show.vote_average}
                        posterPath={show.poster_path}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="font-semibold text-gray-800 text-2xl py-4 px-6">
                    Oops, it seems that you don't any favorite movie yet...
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="font-semibold text-gray-800 text-2xl py-4 px-6">
                  Oops, it seems that you don't any favorite movie yet...
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            <h2>Oops, it seems that you don't any favorite movie yet...</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;

// rafce
