// favorites.js

// Retrieve favorites from localStorage or initialize an empty array
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// Function to get the current list of favorite movies
export function getFavorites() {
  return favorites;
}

// Function to add a movie to favorites
export function addToFavorites(movieId) {
  if (!favorites.includes(movieId)) {
    favorites.push(movieId); // Add the movie if it's not already in the list
    localStorage.setItem("favorites", JSON.stringify(favorites)); // Update localStorage
  }
}

// Function to remove a movie from favorites
export function removeFromFavorites(movieId) {
  favorites = favorites.filter((id) => id !== movieId); // Remove the movie by its ID
  localStorage.setItem("favorites", JSON.stringify(favorites)); // Update localStorage
}

// Function to check if a movie is in the favorites list
export function isFavorite(movieId) {
  return favorites.includes(movieId);
}
