import React from "react";
import styles from "../home/HomePage.module.css";
import CardPage from "../card/CardPage";
import typeColors from "../card/typeColors";

function FavoritePage({ favorites, addFavorite, removeFavorite }) {
  return (
    <div className={styles.pageContainer}>
      <h1>Your Favorite Pokémon</h1>
      {favorites.length === 0 ? (
        <p>No favorite Pokémon yet! Add some from the home page.</p>
      ) : (
        <div className={styles.pokemonGrid}>
          {favorites.map((pokemon, index) => {
            const primaryType = pokemon.types[0];
            const backgroundColor = typeColors[primaryType] || "#f4f4f4"; // צבע ברירת מחדל אם הטייפ לא נמצא

            return (
              <div
                key={index}
                className={styles.pokemonCard}
                style={{ backgroundColor }}
              >
                <CardPage
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
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default FavoritePage;
