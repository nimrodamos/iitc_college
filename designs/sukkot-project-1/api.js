// Function to fetch popular movies from the API

export async function fetchPopularMovies() {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

  try {
    const response = await fetch(url); // Send the API request
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json(); // Return the JSON data containing the movies
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error; // Propagate the error to be handled elsewhere
  }
}

// Function to search for a movie by its ID using the API
export async function searchMovieById(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;

  try {
    const response = await fetch(url); // Send the API request
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json(); // Return the movie details for the given ID
  } catch (error) {
    console.error("Error fetching movie:", error);
    throw error; // Propagate the error for further handling
  }
}

// Function to fetch trending movies (day or week)
export async function fetchTrendingMovies(timeWindow = "day") {
  const url = `https://api.themoviedb.org/3/trending/movie/${timeWindow}?api_key=${apiKey}`;

  try {
    const response = await fetch(url); // Send the API request
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data.results; // Return the list of trending movies
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error; // Propagate the error to be handled elsewhere
  }
}
