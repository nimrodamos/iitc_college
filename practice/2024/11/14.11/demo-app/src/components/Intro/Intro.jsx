import "./Intro.css";
import React from "react";

const Intro = () => {
  return (
    <div className="intro">
      <p className="intro-description">
        An easy and quick dish, perfect for any meal. This classic omelette
        combines beaten eggs cooked to perfection, optionally filled with your
        choice of cheese, vegetables, or meats.
      </p>
      <div className="intro-meta">
        <span>Preparation time</span>
        <span>Total: Approximately 10 minutes</span>
        <span>Preparation: 5 minutes</span>
        <span>Cooking: 5 minutes</span>
      </div>
    </div>
  );
};

export default Intro;
