import { useState, useEffect } from "react";
import { Recipe } from "@/types/Recipe";
import { useSearch } from "@/context/SearchContext";
import RecipeCard from "@/components/RecipeCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import AddRecipe from "@/components/AddRecipe";

const CATEGORIES = ["All", "Breakfast", "Lunch", "Dinner", "Dessert"];

const Recipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const { searchQuery } = useSearch();

  // Add Recipe Handler
  const handleAddRecipe = async (newRecipe: Omit<Recipe, "id">) => {
    try {
      const response = await fetch("http://localhost:3000/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRecipe),
      });
      if (!response.ok) throw new Error("Failed to add recipe.");
      const savedRecipe = await response.json();
      setRecipes((prev) => [...prev, savedRecipe]);
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };

  // Filter recipes based on searchQuery and selectedCategory
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    // Fetch recipes from the server
    fetch("http://localhost:3000/recipes")
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Recipes</h1>
      {/* Add Recipe */}
      <div className="flex justify-center ">
        <AddRecipe onAddRecipe={handleAddRecipe} />
      </div>
      {/* Dropdown for category filtering */}
      <div className="flex justify-center mb-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded-md">
              {selectedCategory === "All"
                ? "Select Category"
                : selectedCategory}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600">
            {CATEGORIES.map((category) => (
              <DropdownMenuItem
                key={category}
                onClick={() => setSelectedCategory(category)}
                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {category}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Recipes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
        {filteredRecipes.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 col-span-full">
            No recipes found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Recipes;
