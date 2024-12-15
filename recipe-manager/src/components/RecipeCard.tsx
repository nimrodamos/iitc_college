import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Recipe } from "@/types/Recipe";

const RecipeCard = ({ recipe }: { recipe: Recipe }) => (
  <Link to={`/recipes/${recipe.id}`}>
    <Card className="shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow duration-300">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-40 object-cover rounded-t-lg"
      />
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">
          {recipe.title}
        </CardTitle>
        <CardDescription className="text-sm opacity-80 text-gray-700 dark:text-gray-400">
          {recipe.category}
        </CardDescription>
      </CardHeader>
    </Card>
  </Link>
);

export default RecipeCard;
