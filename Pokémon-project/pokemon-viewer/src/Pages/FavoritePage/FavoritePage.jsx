import React from "react";
import styles from "../home/HomePage.module.css";
import CardPage from "../card/CardPage";

function FavoritePage({ favorites, addFavorite, removeFavorite }) {
  return (
    <div className={styles.pageContainer}>
      <h1>Your Favorite Pokémon</h1>
      {favorites.length === 0 ? (
        <p>No favorite Pokémon yet! Add some from the home page.</p>
      ) : (
        <div className={styles.pokemonGrid}>
          {favorites.map((pokemon, index) => (
            <CardPage
              key={index}
              name={pokemon.name}
              image={pokemon.image}
              types={pokemon.types}
              stats={pokemon.stats}
              abilities={pokemon.abilities}
              weight={pokemon.weight}
              height={pokemon.height}
              baseExperience={pokemon.baseExperience}
              isFavorite={true}
              addFavorite={addFavorite}
              removeFavorite={removeFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritePage;
