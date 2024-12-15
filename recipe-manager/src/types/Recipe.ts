export type RecipeCategory =
  | "Dinner"
  | "Breakfast"
  | "Lunch"
  | "Dessert"
  | undefined;

export interface Recipe {
  id: string;
  title: string;
  image: string;
  ingredients: string[];
  instructions: string;
  category: RecipeCategory;
}
