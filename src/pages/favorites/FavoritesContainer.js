
import React from "react";
import FavoritesPage from "./FavoritesPage";

const FavoritesContainer = ({ favorites }) => {
  return (
    <div>
      <h1>My Movie App</h1>
      <FavoritesPage favorites={favorites} />
    </div>
  );
};

export default FavoritesContainer;
