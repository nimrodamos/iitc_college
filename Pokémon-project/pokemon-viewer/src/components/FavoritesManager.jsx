import React, { useState, useEffect } from "react";

const FavoritesManager = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
    setFavorites(
      Array.isArray(storedFavorites)
        ? storedFavorites
            .filter((fav) => fav !== null)
            .map((fav) => ({
              name: fav.name || "unknown",
              image: fav.image || "",
              types: fav.types || [],
              stats: fav.stats || {},
              abilities: fav.abilities || [],
              weight: fav.weight || 0,
              height: fav.height || 0,
              baseExperience: fav.baseExperience || 0,
            }))
        : []
    );
  }, []);

  const addFavorite = (pokemon) => {
    if (!pokemon || !pokemon.name) return;
    const completePokemon = {
      name: pokemon.name,
      image: pokemon.image || "",
      types: pokemon.types || [],
      stats: pokemon.stats || {},
      abilities: pokemon.abilities || [],
      weight: pokemon.weight || 0,
      height: pokemon.height || 0,
      baseExperience: pokemon.baseExperience || 0,
    };
    const updatedFavorites = [...favorites, completePokemon];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };
  const removeFavorite = (pokemon) => {
    if (!pokemon || !pokemon.name) return;
    const updatedFavorites = favorites.filter(
      (fav) => fav?.name !== pokemon.name
    );
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return children({ favorites, addFavorite, removeFavorite });
};

export default FavoritesManager;
