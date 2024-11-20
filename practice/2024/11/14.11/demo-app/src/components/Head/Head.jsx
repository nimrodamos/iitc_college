import "./Head.css";
import React from "react";

// Imports
import Intro from "../Intro/Intro.jsx";
import PrepTime from "../PrepTime/PrepTime.jsx";

// Import the image
import recipeImage from "../../assets/images/image-omelette.jpeg";

const Head = () => {
  return (
    <div className="head">
      <img src={recipeImage} alt="Omelette Recipe" className="recipe-image" />
      <h1 className="recipe-title">Delicious Recipe</h1>
      <Intro />
    </div>
  );
};
export default Head;

// export default function Head () {

// }
