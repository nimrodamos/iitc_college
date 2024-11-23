import React from "react";
import "./App.css";
import HomePage from "./Pages/home/HomePage";
import AboutPage from "./Pages/AboutPage/AboutPage";
import Navbar from "./components/Navbar";
import FavoritePage from "./Pages/FavoritePage/FavoritePage";

import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/favorite" element={<FavoritePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
