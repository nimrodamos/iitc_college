import { getAll } from "../../utils/GetApi";
import { useState, useEffect } from "react";

const Card = ({ setDidUserClick, setUserChoice }) => {
  const [pokeballData, setPokeballData] = useState(null);

  const getAllPOkes = async()=>{
    const data = await getAll();
    setPokeballData(data);
  }

  useEffect(() => {
    getAllPOkes();
  }, []);

  const userChoiceAndClick = () => {
    setDidUserClick(true);
  };
  return (
    pokeballData && (
      <>
        {pokeballData.map((pokemon) => (
          <div
            onClick= {()=>{userChoiceAndClick() , setUserChoice(pokemon.url)}}
            className="card"
            key={`idIs${pokemon.name}`}
          >
            {pokemon.name}
          </div>
        ))}
      </>
    )
  );
};

export default Card;