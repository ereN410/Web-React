import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cards from "../card/card";
import "./movieList.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { type } = useParams();

  useEffect(() => {
    getData();
  }, [type, searchTerm]);

  const getData = () => {
    let apiUrl = `https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`;

    if (searchTerm) {
      apiUrl += `&query=${searchTerm}`;
    }

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setMovieList(data.results));
  };

  const toggleFavorite = (movie) => {
    const isFavorite = favorites.some((fav) => fav.id === movie.id);

    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.id !== movie.id));
      toast.error(`${movie.title} removed from favorites!`);
    } else {
      setFavorites([...favorites, movie]);
      toast.success(`${movie.title} added to favorites!`);
    }
  };

  return (
    <div className="movie__list">
      <h2 className="list__title">{(type ? type : "RECOMMEND ONES").toUpperCase()}</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="list__cards">
        {movieList.map((movie) => (
          <div key={movie.id} className="movie-card">
            <Cards movie={movie} />
            <button
              onClick={() => toggleFavorite(movie)}
              style={{
                backgroundColor: favorites.some((fav) => fav.id === movie.id) ? "red" : "red",
                color: favorites.some((fav) => fav.id === movie.id) ? "white" : "black",
              }}
            >
              {favorites.some((fav) => fav.id === movie.id) ? " ❤️   " : "  🤍  "}
            </button>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default MovieList;
