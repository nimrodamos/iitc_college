// display.js

import {
  addToFavorites,
  removeFromFavorites,
  isFavorite,
  getFavorites,
} from "./favorites.js";
import { searchMovieById } from "./api.js";

let isFavoritesPage = false; // Track if the current page is the favorites page

// Function to display movies
export function displayMovies(movies) {
  const container = document.getElementById("movies-container");
  container.innerHTML = ""; // Clear any existing movie content

  if (!movies || movies.length === 0) {
    displayError("No movies to display."); // Display an error if no movies are found
    return;
  }

  movies.forEach((movie) => {
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie"); // Add the 'movie' class to the div
    movieElement.dataset.movieId = movie.id; // Store movie ID as data attribute

    // Create and set the movie poster image
    const imageDiv = document.createElement("div");
    imageDiv.classList.add("image-container");
    const movieImage = document.createElement("img");
    movieImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`; // API image path
    movieImage.alt = `${movie.title} poster`;

    imageDiv.appendChild(movieImage);

    // Create a container for movie info
    const infoDiv = document.createElement("div");
    infoDiv.classList.add("info-container", "hidden"); // Hidden by default, shown on hover
    infoDiv.innerHTML = `
          <h2>${movie.title}</h2>
          <p><strong>Movie ID:</strong> ${movie.id}</p>
          <p>${movie.overview}</p>
        `;

    // Create a favorite star icon
    const starIcon = document.createElement("span");
    starIcon.classList.add("favorite-star");
    starIcon.innerHTML = isFavorite(movie.id) ? "⭐" : "☆"; // Filled star if favorite

    // Toggle favorite on star click
    starIcon.addEventListener("click", () => {
      if (isFavorite(movie.id)) {
        removeFromFavorites(movie.id); // Remove from favorites
      } else {
        addToFavorites(movie.id); // Add to favorites
      }
      starIcon.innerHTML = isFavorite(movie.id) ? "⭐" : "☆"; // Update star icon

      if (isFavoritesPage) {
        displayFavorites(); // Re-render favorites if on favorites page
      }
    });

    imageDiv.appendChild(starIcon);

    // Show movie info on hover
    movieElement.addEventListener("mouseover", () => {
      movieImage.classList.add("hidden");
      infoDiv.classList.remove("hidden");
    });

    // Hide movie info on mouse out
    movieElement.addEventListener("mouseout", () => {
      movieImage.classList.remove("hidden");
      infoDiv.classList.add("hidden");
    });

    movieElement.appendChild(imageDiv);
    movieElement.appendChild(infoDiv);
    container.appendChild(movieElement); // Append the movie element to the container
  });
}

// Function to display error messages
export function displayError(message) {
  const container = document.getElementById("movies-container");
  container.innerHTML = `<p class="error">${message}</p>`; // Show error message
}

// Function to display favorite movies
export function displayFavorites() {
  isFavoritesPage = true; // Set flag indicating we're on the favorites page
  const favorites = getFavorites(); // Get favorite movies from localStorage
  const container = document.getElementById("movies-container");
  container.innerHTML = ""; // Clear existing content

  if (favorites.length === 0) {
    displayError("No favorite movies found."); // Show error if no favorites
    return;
  }

  // Fetch each favorite movie by its ID and display them
  const promises = favorites.map((movieId) => searchMovieById(movieId));

  Promise.all(promises).then((movies) => {
    displayMovies(movies); // Display the fetched favorite movies
  });
}

// Function to display the about page content
export function displayAboutPage() {
  const container = document.getElementById("movies-container");
  container.innerHTML = `
        <h1>About Movie Hub</h1>
        <p>
          Welcome to Movie Hub! Here you can find information about popular
          movies, search for your favorite films by ID, and explore a wide range
          of genres.
        </p>
        <p>
          Our mission is to provide movie lovers with the latest updates and
          information about the film industry. Enjoy browsing!
        </p>
      `;
}
