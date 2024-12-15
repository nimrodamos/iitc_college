import RecipeCarousel from "@/components/RecipeCarousel";
import { useProfile } from "@/context/UserProfileContext";

const Home = () => {
  const { profile } = useProfile();
  return (
    <div className="p-4 bg-white dark:bg-gray-900 text-black dark:text-white">
      <h1 className="text-2xl sm:text-4xl font-bold m-4 text-center">
        Hello, {profile.name}!
      </h1>
      <h2 className="text-lg sm:text-3xl font-bold text-center my-6">
        Welcome to Recipe Manager – <br />
        your go-to app for delicious recipes!
      </h2>
      <RecipeCarousel />
    </div>
  );
};

export default Home;
