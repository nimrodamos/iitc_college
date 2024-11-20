import React, { useState, useEffect } from "react";

import styles from "./HomePage.module.css";
import CardPage from "../card/CardPage.jsx";
import { fetchPokemonList, fetchPokemonDetails } from "../../pokemonApi.js";

function HomePage() {
  const [pokemonList, setPokemonList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const results = await fetchPokemonList(20);

        const detailedPokemon = await Promise.all(
          results.map(async (pokemon) => {
            const details = await fetchPokemonDetails(pokemon.url);
            return details;
          })
        );

        setPokemonList(detailedPokemon);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
        setError("Failed to fetch Pokémon data. Please try again later.");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className={styles.errorMessage}>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }
  return (
    <div>
      <h1 className={styles.title}>Pokémon Card Viewer</h1>
      <div className={styles.pokemonGrid}>
        {pokemonList.map((pokemon, index) => (
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
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
