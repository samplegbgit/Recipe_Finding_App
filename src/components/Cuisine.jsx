
import React from "react";
import { Globe } from "lucide-react";
import { Link } from "react-router-dom";

const Cuisine = ({ filterByArea }) => {
  const featuredAreas = [
    "American",
    "British",
    "Canadian",
    "Chinese",
    "Croatian",
    "Dutch",
    "Egyptian",
    "French",
    "Greek",
    "Indian",
    "Irish",
    "Italian",
    "Jamaican",
    "Japanese",
    "Kenyan",
    "Malaysian",
    "Mexican",
    "Moroccan",
    "Polish",
    "Portuguese",
    "Russian",
    "Spanish",
    "Thai",
    "Tunisian",
    "Turkish",
    "Vietnamese"
  ];

  return (
    <section className="px-4 py-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-yellow-400 font-bold">
          <Globe className="w-5 h-5" />
          Global Cuisines:
        </div>

        {featuredAreas.map((area) => (
          <Link
            key={area}
            to={`/search/${area}`}
            onClick={() => filterByArea(area)}
            className="px-4 py-2 rounded-full bg-gray-800 text-gray-200 hover:bg-yellow-500 hover:text-black transition"
          >
            {area}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Cuisine;
