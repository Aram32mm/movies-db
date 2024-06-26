import "./MovieCard.css";
import { IMAGE_SOURCE } from "../../constants/moviesMock";
import { IMovieCard } from "./types";
import { Pill } from "../Pill";
import { ROUTES } from "../../routes/constants";
import React from "react";
import { getGenreNameById } from "../../constants/getGenre";
import { useNavigate } from "react-router-dom";
import { ReactComponent as StarIcon } from '../../assets/star.svg';

const MovieCard: React.FC<IMovieCard> = ({
  title,
  genreId,
  movieId,
  voteAverage,
  posterPath,
}) => {
  const navigate = useNavigate();
  const poster = IMAGE_SOURCE + posterPath;
  let genreTitle = "Genre Not Found";
  if (genreId) {
    genreTitle = getGenreNameById(genreId);
  }

  const navigateMovies = (id: number, movieName: string) => {
    navigate(`${ROUTES.SHOW}${id}`, { state: { name: movieName } }); // /show/278362
  };

  return (
    <div
      className="bg-white m-0 auto float-left overflow-hidden block mb-7 mr-5 relative shadow-lg rounded-lg p-0 flex-shrink-0 smooth-scroll"
      onClick={() => {
        navigateMovies(movieId, title);
      }}
    >
      <div className="ml-0 min-w-full overflow-hidden bg-gray-800 float-none transition-opacity duration-5550 ease-in-out transform-gpu">
        <img
          src={poster} alt={title}
          className="max-h-96 max-w-60 transition-all duration-900 ease-in-out backface-hidden overflow-hidden min-w-full max-h-poster relative max-w-none ml-0 scale-100 hover:scale-125 hover:opacity-40"
        />
      </div>
      <div className="absolute bottom-0 left-0 w-full h-auto opacity-100 transition-all duration-300 bg-gradient-to-t from-[rgb(2,0,36)] via-transparent to-transparent rounded-b-none">
        <div className="p-4 py-3.5 w-full align-middle text-white">
          <Pill title={genreTitle} color="red" />
          <p className="text-white block text-lg font-bold leading-none mt-2.5">
            {title}
          </p>
          <div className="flex items-center">
            <StarIcon className="mr-2 w-4 h-4" /> 
            <p className="mr-2.5 text-white text-xs font-medium table uppercase leading-none">
              {voteAverage} / 10
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
