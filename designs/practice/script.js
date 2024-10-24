const apiKey = "4ad8d558c1809bbed4b3ecc525572e6b"; // החלף עם המפתח שלך

async function fetchPopularMovies() {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data);

    // קרא לפונקציה שתציג את הסרטים בדף
    displayMovies(data.results);
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

function displayMovies(movies) {
  const container = document.getElementById("movies-container"); // נקודת ההכנסה לדף

  movies.forEach((movie) => {
    // יצירת אלמנט עבור כל סרט
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie"); // אפשר להוסיף קלאס לצורך עיצוב

    // הוספת שם הסרט ותמונה
    movieElement.innerHTML = `
      <h2>${movie.title}</h2>
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} poster">
    `;

    // הוספת הסרט ל-container בדף
    container.appendChild(movieElement);
  });
}

// קריאה לפונקציה שמביאה את הסרטים
fetchPopularMovies();
