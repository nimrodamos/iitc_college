import HomePage from "../HomePage/HomePage";
import CardPage from "../CardPage/CardPage";
import { useState } from "react";

const Main = ()=>{
    const [userChoice , setUserChoice] = useState(0);
    const [didUserClick , setDidUserClick] = useState(false);
    return(
        <div>
            {didUserClick ? 
            <CardPage userChoice = {userChoice}/> 
            : <HomePage setUserChoice = {setUserChoice} setDidUserClick = {setDidUserClick}/>}
        </div>
    )
}

export default Main;