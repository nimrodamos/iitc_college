import React from "react";
import "./App.css";
import HomePage from "./Pages/home/HomePage";
import AboutPage from "./Pages/AboutPage/AboutPage";

import FavoritePage from "./Pages/Favorite/FavoritePage";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/favorite" element={<FavoritePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
