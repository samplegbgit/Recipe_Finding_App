
import React from "react";
import { useFetch } from "./useFetch";
import RecipeCard from "./RecipeCard";
import { Clock, Loader } from "lucide-react";

const TrendingRecipe = ({ title, fetchUrl }) => {
  const { data, loading, error } = useFetch(fetchUrl);

  const meals = data?.meals || [];

  if (loading) {
    return (
      <div className="text-center p-8 text-gray-300">
        <Loader className="animate-spin inline-block mr-2 text-blue-400" />
        Loading {title}...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-400">
        Failed to load {title}: {error}
      </div>
    );
  }

  if (meals.length === 0) {
    return (
      <div className="text-center p-8 text-gray-300">
        No trending recipes found.
      </div>
    );
  }

  return (
    <section className="mt-10 mx-auto">
      <h2 className="text-3xl font-extrabold text-gray-100 mb-6 tracking-tight border-l-4 border-yellow-400 pl-4 flex items-center">
        <Clock className="w-6 h-6 mr-3 text-blue-500" />
        {title}
      </h2>

      <div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
        {meals.map((meal) => (
          <RecipeCard key={meal.idMeal} meal={meal} />
        ))}
      </div>
    </section>
  );
};

export default TrendingRecipe;
