import { useState } from "react";
import { Recipe, RecipeCategory } from "@/types/Recipe";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const CATEGORIES: RecipeCategory[] = [
  "Dinner",
  "Breakfast",
  "Lunch",
  "Dessert",
];

interface EditRecipeProps {
  recipe: Recipe;
  onUpdate: (updatedRecipe: Recipe) => void;
}

const EditRecipe = ({ recipe, onUpdate }: EditRecipeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [updatedRecipe, setUpdatedRecipe] = useState(recipe);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedRecipe((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategorySelect = (category: RecipeCategory) => {
    setUpdatedRecipe((prev) => ({ ...prev, category }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/recipes/${updatedRecipe.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedRecipe),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update recipe");
      }
      const updatedData = await response.json();
      onUpdate(updatedData);
      setIsOpen(false);
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  return (
    <div>
      <Button onClick={() => setIsOpen(true)} className="bg-blue-500">
        Edit Recipe
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Recipe</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              name="title"
              placeholder="Recipe Title"
              value={updatedRecipe.title}
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              name="image"
              placeholder="Image URL"
              value={updatedRecipe.image}
              onChange={handleChange}
              required
            />
            <Textarea
              name="ingredients"
              placeholder="Ingredients (comma-separated)"
              value={updatedRecipe.ingredients.join(", ")}
              onChange={(e) =>
                setUpdatedRecipe((prev) => ({
                  ...prev,
                  ingredients: e.target.value.split(",").map((i) => i.trim()),
                }))
              }
              required
            />
            <Textarea
              name="instructions"
              placeholder="Instructions"
              value={updatedRecipe.instructions}
              onChange={handleChange}
              required
            />
            <div>
              <label className="block font-semibold mb-2">Category</label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="w-full">
                    {updatedRecipe.category || "Select a Category"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {CATEGORIES.map((category) => (
                    <DropdownMenuItem
                      key={category}
                      onClick={() => handleCategorySelect(category)}
                      className="cursor-pointer"
                    >
                      {category}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex justify-end space-x-2">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" className="bg-green-500 hover:bg-green-600">
                Save Changes
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditRecipe;
