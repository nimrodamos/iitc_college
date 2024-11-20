import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

// פונקציה שמחזירה רשימת Pokémon כולל מידע נוסף (כמו תמונה)
export const getPokemonList = async (limit = 20, offset = 0) => {
  try {
    // שלב ראשון: קבלת רשימת Pokémon בסיסית
    const response = await axios.get(BASE_URL, {
      params: { limit, offset },
    });

    // שלב שני: משיכת פרטים נוספים לכל Pokémon
    const pokemonDetails = await Promise.all(
      response.data.results.map(async (pokemon) => {
        const details = await axios.get(pokemon.url); // קריאה ל-URL של הפרטים
        return {
          name: pokemon.name,
          image: details.data.sprites.front_default, // תמונה
        };
      })
    );

    return pokemonDetails;
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    throw error;
  }
};
