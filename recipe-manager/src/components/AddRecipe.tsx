import { Recipe, RecipeCategory } from "@/types/Recipe";
import { useState } from "react";
import { Button } from "@/components/ui/button";
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

const CATEGORIES: RecipeCategory[] = [
  "Dinner",
  "Breakfast",
  "Lunch",
  "Dessert",
];

const AddRecipe = ({
  onAddRecipe,
}: {
  onAddRecipe: (recipe: Omit<Recipe, "id">) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newRecipe, setNewRecipe] = useState<Omit<Recipe, "id">>({
    title: "",
    image: "",
    ingredients: [],
    instructions: "",
    category: undefined,
  });
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewRecipe((prev) => ({ ...prev, [name]: value }));
  };

  // Handle ingredients input
  const handleIngredientsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setNewRecipe((prev) => ({
      ...prev,
      ingredients: value
        .split(",") // מפריד פסיקים
        .map((i) => i.trim()) // מסיר רווחים מיותרים
        .filter((i) => i !== ""), // מסיר מחרוזות ריקות
    }));
  };

  const handleCategorySelect = (category: RecipeCategory) => {
    setError("");
    setNewRecipe((prev) => ({ ...prev, category }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newRecipe.category) {
      setError("Please select a category.");
      return;
    }

    onAddRecipe(newRecipe);
    setIsOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setNewRecipe({
      title: "",
      image: "",
      ingredients: [],
      instructions: "",
      category: undefined,
    });
    setError("");
  };

  return (
    <div className="my-4">
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-yellow-500 hover:bg-yellow-600"
      >
        Add New Recipe
      </Button>

      <Dialog
        open={isOpen}
        onOpenChange={(isOpen) => {
          setIsOpen(isOpen);
          if (!isOpen) resetForm();
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a New Recipe</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              name="title"
              placeholder="Recipe Title"
              value={newRecipe.title}
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              name="image"
              placeholder="Image URL"
              value={newRecipe.image}
              onChange={handleChange}
              required
            />
            <Textarea
              name="ingredients"
              placeholder="Ingredients (comma-separated)"
              value={newRecipe.ingredients.join(", ")}
              onChange={handleIngredientsChange}
              required
            />
            <Textarea
              name="instructions"
              placeholder="Instructions"
              value={newRecipe.instructions}
              onChange={handleChange}
              required
            />

            <div>
              <label className="block font-semibold mb-2">Category</label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="w-full">
                    {newRecipe.category || "Select a Category"}
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
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            <div className="flex justify-end space-x-2">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                Save Recipe
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddRecipe;
