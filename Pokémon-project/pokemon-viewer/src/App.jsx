import React from "react";
import "./App.css";
import HomePage from "./Pages/home/HomePage";
import AboutPage from "./Pages/AboutPage/AboutPage";
import Navbar from "./components/Navbar";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import FavoritesManager from "./components/FavoritesManager";
import FavoritePage from "./Pages/FavoritePage/FavoritePage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <FavoritesManager>
        {({ favorites, addFavorite, removeFavorite }) => (
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  favorites={favorites}
                  addFavorite={addFavorite}
                  removeFavorite={removeFavorite}
                />
              }
            />
            <Route
              path="/favorite"
              element={
                <FavoritePage
                  favorites={favorites}
                  addFavorite={addFavorite}
                  removeFavorite={removeFavorite}
                />
              }
            />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        )}
      </FavoritesManager>
    </BrowserRouter>
  );
}

export default App;
