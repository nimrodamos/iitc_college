import {getPokemon} from "../../utils/GetApi"
import { useState, useEffect } from "react";


const CardPage = ({userChoice})=>{
    const [data , setdata] = useState(null)

    const getPoke = async()=>{
        const data = await getPokemon(userChoice);
        setdata(data);     
      }
      
      useEffect(() => {
        getPoke();
      }, []);

      console.log(data);
      

    return(
        data && (
            <>
            <div>
               <img src={data.sprites.other.dream_world.front_default} alt="" /> 
            </div>
            </>
          )
    )
}

export default CardPage;