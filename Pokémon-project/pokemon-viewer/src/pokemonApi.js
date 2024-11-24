import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

export const fetchPokemonList = async (limit = 20) => {
  try {
    const response = await axios.get(`${BASE_URL}?limit=${limit}`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching Pokémon list:", error.message || error);
    return [];
  }
};

export const fetchPokemonDetails = async (url) => {
  try {
    const response = await axios.get(url);
    return {
      name: response.data.name,
      image:
        response.data.sprites.other.showdown.front_default ||
        response.data.sprites.other["official-artwork"].front_default ||
        response.data.sprites.front_default,
      types: response.data.types.map((typeInfo) => typeInfo.type.name),
      audio: response.data.audio || null,
      stats: {
        hp: response.data.stats[0]?.base_stat || 0,
        attack: response.data.stats[1]?.base_stat || 0,
        defense: response.data.stats[2]?.base_stat || 0,
        speed: response.data.stats[5]?.base_stat || 0,
      },
      abilities: response.data.abilities.map(
        (abilityInfo) => abilityInfo.ability.name
      ),
      weight: response.data.weight / 10,
      height: response.data.height / 10,
      baseExperience: response.data.base_experience || 0,
    };
  } catch (error) {
    console.error("Error fetching Pokémon details:", error.message || error);

    throw new Error("Failed to fetch Pokémon details. Please try again.");
  }
};
