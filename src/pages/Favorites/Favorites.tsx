import React, { useEffect, useState } from "react";

import { MovieCard } from "../../components/MovieCard";
import { getMovieDetails } from "../../services/movies/getMovieDetails";
import { IMovieDetail } from "../../services/movies/types";

const Favorites = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [shows, setShows] = useState<IMovieDetail[]>([]);
  const favorites: string = localStorage.getItem("favorites") || "";

  const runGetFavorites = async () => {
    if (favorites.length) {
      // favorites.length > 0
      const favoritesArray = JSON.parse(favorites); // ["213123", "123123"]
      const newShows = await Promise.all(
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
      setShows(newShows);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    runGetFavorites();
  }, []);

  return (
    <div>
      <div className="font-bold text-gray-800 text-2xl py-4 px-6">
        MY FAVORITES
      </div>
      <div>
        {!loading ? (
          <div>
            {favorites && favorites.length > 0 ? (
              <div>
                {shows && shows.length > 0 ? (
                  <div className="flex flex-wrap justify-between">
                    {shows.map((show: IMovieDetail) => (
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
