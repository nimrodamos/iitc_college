import axios from "axios";

export const getAll = async () => {
  try {
    const {
      data: { results },
    } = await axios.get("https://pokeapi.co/api/v2/pokemon/?limt=20");
    return results;
  } catch (error) {
    console.error(error);
  }
};

export const getPokemon = async (URL)=>{
    try {
        const {data} = await axios.get(URL)
        return data
    } catch (error) {
        
    }
}