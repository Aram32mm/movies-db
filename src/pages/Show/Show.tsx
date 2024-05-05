import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { getDetails } from "../../services/movies/getDetails";

const Show = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [show, setShow] = useState<any>([]);
  const [loading, setLoading] = useState(true);

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
    await getDetails(String(id))
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

  useEffect(() => {
    const favs = localStorage.getItem("favorites") || "";
    setFavorites(favs);
    if (favs.includes(String(id))) {
      setIsFavorite(true);
    }
    setLoading(true);
    getMovieDetail();
  }, []);

  return (
    <div>
      {loading ? (
        <span>loading...</span>
      ) : (
        <>
          <div>Show: {id}</div>
          <div>Título desde el state: {location.state.movie}</div>
          <div>Título desde servicio: {show.title}</div>
          <div>Para adultos desde servicio: {show.adult ? "Yes" : "No"}</div>
          <button onClick={goBack}>Ir atrás</button>
          {isFavorite ? (
            <div>
              <button className="p4 bg-blue-500" onClick={removeFavorite}>
                Remove from favorites
              </button>
            </div>
          ) : (
            <div>
              <button className="p4 bg-red-500" onClick={addFavorite}>
                Add to favorites
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Show;
