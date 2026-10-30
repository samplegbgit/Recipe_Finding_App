
import React from "react";
import { ChevronLeft, Loader, Search } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import RecipeCard from "./RecipeCard";

const SearchView = ({ meals = [], loading }) => {
  const { query } = useParams();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/"
        className="text-yellow-400 hover:text-yellow-300 flex items-center mb-6 font-medium transition text-lg group"
      >
        <ChevronLeft className="w-6 h-6 mr-1 transition" />
        Back to Dashboard
      </Link>

      <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
        <Search className="w-7 h-7 text-yellow-400" />
        Search Results: {query}
      </h2>

      {loading && (
        <div className="text-center p-8 text-gray-300">
          <Loader className="animate-spin inline-block mr-2 text-blue-400" />
          Searching the database...
        </div>
      )}

      {!loading && meals.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {meals.map((meal) => (
            <RecipeCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}

      {!loading && meals.length === 0 && (
        <div className="text-center py-16">
          <h3 className="text-2xl font-semibold text-gray-200 mb-3">
            No Recipes Found
          </h3>
          <p className="text-gray-400">
            No recipes are currently available for "{query}".
            Try another cuisine or search term.
          </p>
        </div>
      )}
    </main>
  );
};

export default SearchView;
