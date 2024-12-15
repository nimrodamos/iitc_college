import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import RecipeDetails from "./pages/RecipeDetails";
import Profile from "./pages/Profile";
import { SearchProvider } from "./context/SearchContext";
import Navbar from "./components/Navbar";
import { ProfileProvider } from "./context/UserProfileContext";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ProfileProvider>
          <SearchProvider>
            <Navbar />
            <div>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/recipes" element={<Recipes />} />
                <Route path="/recipes/:id" element={<RecipeDetails />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>
          </SearchProvider>
        </ProfileProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
