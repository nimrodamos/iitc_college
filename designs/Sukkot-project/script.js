//script.js

import {
  fetchPopularMovies,
  searchMovieById,
  fetchTrendingMovies,
} from "./api.js";
import {
  displayMovies,
  displayAboutPage,
  displayFavorites,
} from "./display.js";

// Handle search form submission
document.querySelector(".search-bar").addEventListener("submit", (event) => {
  event.preventDefault();
  const searchInput = event.target.search.value.trim(); // Get the trimmed value from the search input
  if (searchInput) {
    searchMovieById(searchInput).then((movie) => {
      if (movie) {
        displayMovies([movie]); // Display the searched movie
      }
    });
  }
  event.target.reset(); // Clear the input field after submission
});

// Handle home link click
document.getElementById("home-link").addEventListener("click", (event) => {
  event.preventDefault();
  fetchPopularMovies().then((data) => {
    displayMovies(data.results); // Display popular movies
  });
});

// Handle favorites link click
document.getElementById("favorites-link").addEventListener("click", (event) => {
  event.preventDefault(); // Prevent default anchor behavior
  displayFavorites(); // Display favorite movies
});

// Handle about link click
document.getElementById("about-link").addEventListener("click", (event) => {
  event.preventDefault(); // Prevent default anchor behavior
  displayAboutPage(); // Display the about page
});

// Handle the selection between "Popular Today" and "Popular This Week"
document.getElementById("popularSelect").addEventListener("change", (event) => {
  const selectedOption = event.target.value; // Get the user's selection

  if (selectedOption === "default") {
    // If the default option is selected, fetch all popular movies
    fetchPopularMovies().then((data) => {
      displayMovies(data.results); // Display all popular movies
    });
  } else {
    // If "day" or "week" is selected, fetch trending movies accordingly
    fetchTrendingMovies(selectedOption).then((movies) => {
      displayMovies(movies); // Display trending movies based on the selection
    });
  }
});

// Fetch and display popular movies on page load
fetchPopularMovies().then((data) => {
  displayMovies(data.results); // Display movies on initial page load
});
