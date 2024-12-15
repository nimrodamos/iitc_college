import { useSearch } from "@/context/SearchContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (location.pathname !== "/recipes") {
      navigate("/recipes");
    }
  };

  return (
    <div className="flex items-center">
      <Input
        type="text"
        name="search"
        placeholder="Search recipes..."
        value={searchQuery}
        onChange={handleInputChange}
        className="w-64 rounded-md"
      />
    </div>
  );
};

export default SearchBar;
