import { Link } from "react-router-dom";
import SearchBar from "@/components/SearchBar";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <nav className="bg-yellow-500 text-black px-4 py-3 shadow-lg">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold hover:text-gray-700 mb-2 sm:mb-0"
        >
          Recipe Manager
        </Link>

        {/* SearchBar */}
        <div className="w-full sm:w-auto flex-1 sm:flex-none">
          <SearchBar />
        </div>

        {/* Menu */}
        <ul className="flex space-x-4 mt-2 sm:mt-0">
          <li>
            <Link to="/" className="hover:text-gray-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/recipes" className="hover:text-gray-200">
              Recipes
            </Link>
          </li>
          <li>
            <Link to="/profile" className="hover:text-gray-200">
              Profile
            </Link>
          </li>
        </ul>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
