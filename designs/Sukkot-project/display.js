//display.js

import {
  addToFavorites,
  removeFromFavorites,
  isFavorite,
  getFavorites,
} from "./favorites.js";
import {
  searchMovieById,
  fetchMovieCast,
  fetchMovieDetails,
  fetchPopularMovies,
} from "./api.js";

// Function to display movies
export function displayMovies(movies) {
  const container = document.getElementById("movies-container");
  container.innerHTML = ""; // Clear any existing movie content

  if (!movies || movies.length === 0) {
    displayError("No movies to display.");
    return;
  }

  movies.forEach((movie) => {
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");
    movieElement.dataset.movieId = movie.id;

    const imageDiv = document.createElement("div");
    imageDiv.classList.add("image-container");
    const movieImage = document.createElement("img");
    movieImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    movieImage.alt = `${movie.title} poster`;
    imageDiv.appendChild(movieImage);

    // Create a favorite star icon
    const starIcon = document.createElement("span");
    starIcon.classList.add("favorite-star");
    starIcon.innerHTML = isFavorite(movie.id) ? "⭐" : "☆";

    // Toggle favorite on star click
    starIcon.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent navigation to movie details page
      if (isFavorite(movie.id)) {
        removeFromFavorites(movie.id);
      } else {
        addToFavorites(movie.id);
      }
      starIcon.innerHTML = isFavorite(movie.id) ? "⭐" : "☆";
    });

    imageDiv.appendChild(starIcon);

    // Event to display movie details when clicking on the movie element
    movieElement.addEventListener("click", () => {
      displayMovieDetails(movie.id);
    });

    movieElement.appendChild(imageDiv);
    container.appendChild(movieElement);
  });
}

// Function to display error messages
export function displayError(message) {
  const container = document.getElementById("movies-container");
  container.innerHTML = `<p class="error">${message}</p>`;
}

// Function to display favorite movies
export function displayFavorites() {
  const favorites = getFavorites();
  const container = document.getElementById("movies-container");
  container.innerHTML = "";

  if (favorites.length === 0) {
    displayError("No favorite movies found.");
    return;
  }

  const promises = favorites.map((movieId) => searchMovieById(movieId));

  Promise.all(promises).then((movies) => {
    displayMovies(movies);
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

// Function to display movie details
export async function displayMovieDetails(movieId) {
  const container = document.getElementById("movies-container");
  container.innerHTML = "";

  try {
    const movie = await fetchMovieDetails(movieId);
    const cast = await fetchMovieCast(movieId);

    container.innerHTML = `
      <div id="movie-details">
        <h1>${movie.title}</h1>
        <div class="movie-details-container">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${
      movie.title
    } poster" class="movie-poster">
          <div class="movie-info">
            <p><strong>Release Date:</strong> ${movie.release_date}</p>
            <p><strong>Movie ID:</strong> ${movie.id}</p>
            <p><strong>Overview:</strong> ${movie.overview}</p>
            <h3>Cast:</h3>
            <ul>
              ${cast
                .map((actor) => `<li>${actor.name} as ${actor.character}</li>`)
                .join("")}
            </ul>
          </div>
        </div>
        <button id="back-button">Back to Movies</button>
      </div>
    `;

    document.getElementById("back-button").addEventListener("click", () => {
      fetchPopularMovies().then((data) => displayMovies(data.results));
    });
  } catch (error) {
    console.error("Error displaying movie details:", error);
    container.innerHTML = `<p class="error">Failed to load movie details.</p>`;
  }
}
