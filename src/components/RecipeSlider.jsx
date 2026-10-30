
import React from "react";
import { useFetch } from "./useFetch";

const RecipeSlider = ({ title, fetchUrl }) => {
  const { data, loading, error } = useFetch(fetchUrl);

  const meals = data?.meals || [];

  if (loading) {
    return <p className="text-center p-8">Loading {title}...</p>;
  }

  if (error) {
    return <p className="text-center p-8 text-red-400">{error}</p>;
  }

  return (
    <section className="mt-10 mx-auto">
      <h2 className="text-3xl font-bold text-white mb-6">
        {title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <div key={meal.idMeal} className="p-4 bg-gray-900 rounded-xl">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="text-white mt-3">{meal.strMeal}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecipeSlider;
