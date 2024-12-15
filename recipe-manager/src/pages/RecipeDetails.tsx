import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Recipe } from "@/types/Recipe";
import { Button } from "@/components/ui/button";
import DeleteButton from "@/components/DeleteButton";
import EditRecipe from "@/components/EditRecipe";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/recipes/${id}`)
      .then((response) => response.json())
      .then((data) => setRecipe(data))
      .catch((error) => console.error("Error fetching recipe details:", error));
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/recipes/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete recipe");
      }
      navigate("/recipes");
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const handleUpdate = (updatedRecipe: Recipe) => {
    setRecipe(updatedRecipe); // Update the local state with the new recipe data
  };

  if (!recipe) {
    return <p className="text-center mt-8 dark:text-white">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mb-6">
          <Button
            asChild
            variant="secondary"
            className="text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:border-gray-500 dark:hover:border-gray-400"
          >
            <Link to="/recipes">Back to Recipes</Link>
          </Button>
          <div className="flex space-x-4">
            <EditRecipe recipe={recipe} onUpdate={handleUpdate} />
            <DeleteButton onDelete={handleDelete} />
          </div>
        </div>

        {/* Recipe Card */}
        <Card className="shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <CardHeader className="p-6">
            <CardTitle className="text-3xl font-bold">{recipe.title}</CardTitle>
            <CardDescription className="text-gray-500 dark:text-gray-400 text-lg mt-1">
              {recipe.category}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
            <ul className="list-disc list-inside space-y-2 mb-6">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <h2 className="text-xl font-semibold mb-4">Instructions</h2>
            <p className="leading-relaxed">{recipe.instructions}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecipeDetails;
