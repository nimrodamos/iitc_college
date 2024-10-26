// api.js

import { apiKey } from "./config.js";

export async function fetchPopularMovies() {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch popular movies");
    return await response.json();
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error;
  }
}

export async function searchMovieById(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch movie by ID");
    return await response.json();
  } catch (error) {
    console.error("Error fetching movie:", error);
    throw error;
  }
}

// Fetch movie details by ID
export async function fetchMovieDetails(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch movie details");
    return await response.json();
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
}

// Fetch cast information for a specific movie
export async function fetchMovieCast(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch cast information");
    const data = await response.json();
    return data.cast.slice(0, 10); // Return the top 10 cast members
  } catch (error) {
    console.error("Error fetching cast:", error);
    return [];
  }
}

// Fetch trending movies by time window (day or week)
export async function fetchTrendingMovies(timeWindow = "day") {
  const url = `https://api.themoviedb.org/3/trending/movie/${timeWindow}?api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch trending movies");
    const data = await response.json();
    return data.results; // Return the list of trending movies
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
}
