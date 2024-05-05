import React, { useEffect, useState } from "react";

import { IMovieDetail } from "./types";
import { MovieCard } from "../../components/MovieCard";
import { getDetails } from "../../services/movies/getDetails";

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
          return getDetails(favoriteId)
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
      {!loading ? (
        <div>
          <h2>My Favorites</h2>
          {favorites && favorites.length > 0 ? (
            <div>
              {shows && shows.length > 0 ? (
                <div>
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
                <div>Error fetching movies...</div>
              )}
            </div>
          ) : (
            <div>
              <h3>Oops, it seems that you don't any favorite movie yet...</h3>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2>Loading...</h2>
        </div>
      )}
    </div>
  );
};

export default Favorites;

// rafce
