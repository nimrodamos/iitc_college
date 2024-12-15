import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Recipe } from "@/types/Recipe";
import { Link } from "react-router-dom";

const RecipeCarousel = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  // Fetch recipes from API
  useEffect(() => {
    fetch("http://localhost:3000/recipes")
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  if (recipes.length === 0) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400">
        No recipes available.
      </p>
    );
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <Carousel>
        {/* Previous Button */}
        <CarouselPrevious className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 bg-gray-800 dark:bg-gray-700 text-white dark:text-gray-300 p-2 rounded-full shadow-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition pointer-events-auto">
          &#x2039; {/* Left Arrow */}
        </CarouselPrevious>

        {/* Carousel Content */}
        <CarouselContent className="-ml-2 md:-ml-4">
          {recipes.map((recipe) => (
            <CarouselItem
              key={recipe.id}
              className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 flex-shrink-0"
            >
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
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Next Button */}
        <CarouselNext className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 bg-gray-800 dark:bg-gray-700 text-white dark:text-gray-300 p-2 rounded-full shadow-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition pointer-events-auto">
          &#x203A; {/* Right Arrow */}
        </CarouselNext>
      </Carousel>
    </div>
  );
};

export default RecipeCarousel;
