import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IMAGE_SOURCE } from "../../constants/moviesMock";
import { Pill } from "../../components/Pill";
import { getMovieDetails } from "../../services/movies";
import { getMovieRecommendations } from "../../services/movies";
import { IMovieRecommendation } from "../../services/movies/types";
import { MovieCard } from "../../components/MovieCard";
import { ReactComponent as AdultIcon } from '../../assets/adult.svg';
import { ReactComponent as ClockIcon } from '../../assets/clock.svg';
import { ReactComponent as CalendarIcon } from '../../assets/calendar.svg';
import { ReactComponent as StarIcon } from '../../assets/star.svg';
import { ReactComponent as GraphIcon } from '../../assets/graph.svg';


const Show = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [show, setShow] = useState<any>({});
  const [recommendedMovies, setRecommendedMovies] = useState<IMovieRecommendation[]>([]);
  const [recommendedLoading, setRecommendedLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [errorMovies, setErrorMovies] = useState<boolean>(false);

  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string>(""); // "["3982732"]"

  const goBack = () => {
    navigate(-1);
  };

  const addFavorite = () => {
    const favs = favorites.length > 0 ? JSON.parse(favorites) : []; // "["3982732"]" -> ["3982732"] || []
    const newFavorites = [...favs, id]; // ["3982732", "9823782"]
    setFavorites(JSON.stringify(newFavorites)); // "["3982732", "9823782"]"
    setIsFavorite(true);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  const removeFavorite = () => {
    const favs = favorites.length > 0 ? JSON.parse(favorites) : [];
    let newFavorites = [...favs];
    newFavorites = newFavorites.filter((e) => e !== id);
    setFavorites(JSON.stringify(newFavorites));
    setIsFavorite(false);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  const getMovieDetail = async () => {
    await getMovieDetails(String(id))
      .then((res) => {
        if (res && res.data) {
          setShow(res.data);
        }
      })
      .catch((err) => {
        console.log(err, "err");
      });
    setLoading(false);
  };

  const getRecommendations = async () => {
    await getMovieRecommendations(String(id))
      .then((res) => {
        if (res && res.data) {
          setRecommendedMovies(res.data.results);
        }
      })
      .catch((err) => {
        setErrorMovies(true);
      });
    setRecommendedLoading(false);
  };

  useEffect(() => {
    const favs = localStorage.getItem("favorites") || "";
    setFavorites(favs);
    setIsFavorite(favs.includes(String(id)));
    setRecommendedLoading(true);
    setLoading(true);
    getMovieDetail();
    getRecommendations();
  }, [id]);

  return (
      <div>
        { loading || recommendedLoading? (
          <span>Loading...</span>
        ) : (
          <div>
            <div className="flex flex-col mb-8">
              <div>
                <div className="mb-8">
                  <button onClick={goBack} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Go Back
                  </button>
                </div>
              </div>

              <div className="flex flex-row justify-center items-start">
                <div className="w-1/3">
                  <div>
                    <img src={IMAGE_SOURCE + show.poster_path} alt={show.title} />
                  </div>
                </div>

                <div className="w-2/3">
                  <div className="mb-4 pl-8">
                    <div className="text-5xl font-bold mb-4">{show.title}</div>
                    <div className="flex flex-wrap">
                      <div className="flex items-center">
                        <AdultIcon className="w-4 h-4 mr-1 mb-2" /> 
                        <div className="mr-4 mb-2">{show.adult ? "18+" : "18-"}</div>
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="w-4 h-4 mr-1 mb-2" /> 
                        <div className="mr-4 mb-2">{show.runtime} min.</div>
                      </div>
                      <div className="flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-1 mb-2" /> 
                        <div className="mr-4 mb-2">{show.release_date.substring(0, 4)}</div>
                      </div>
                      <div className="flex items-center">
                        <StarIcon className="w-4 h-4 mr-1 mb-2" /> 
                        <div className="mr-4 mb-2">{show.vote_average}</div>
                      </div>
                      <div className="flex items-center">
                        <GraphIcon className="w-4 h-4 mr-1 mb-2" /> 
                        <div className="mr-4 mb-2">{show.vote_count}</div>
                      </div>
                      
                    </div>
                  </div>

                  {show.tagline !== "" && (
                    <div className="mb-4 italic pl-8">"{show.tagline}"</div>
                  )}
                  <div className="mb-4 pl-8">{show.overview}</div>

                  <div className="flex mb-4 pl-8">
                    <div className="flex-1">
                      <h1 className="text-lg font-bold leading-6 mb-4">Genres</h1>
                      <div className="flex flex-wrap gap-2">
                        {show.genres.map((genre: any) => (
                          <Pill key={genre.id} title={genre.name} color="emerald" />
                        ))}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h1 className="text-lg font-bold leading-6 mb-4">Favorite</h1>
                      {isFavorite ? (
                        <button onClick={removeFavorite} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                          Remove from Favorites
                        </button>
                      ) : (
                        <button onClick={addFavorite} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
                          Add to Favorites
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Recommendation Part */}
            <div className="flex flex-col">
              <div className="font-bold text-gray-800 text-2xl py-4 px-6">
                RECOMMENDATIONS
              </div>
              <div className="flex max-w-full overflow-x-auto">
                {recommendedLoading && <div> Loading...</div>}
                {errorMovies && <div> Error fetching recommendations...</div>}
                {!recommendedMovies?.length && !errorMovies && (
                  <div> No recommendations available.</div>
                )}
                {recommendedMovies?.length > 0 &&
                  recommendedMovies.map((movie) => (
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
        )}
      </div>
  );
};

export default Show;
