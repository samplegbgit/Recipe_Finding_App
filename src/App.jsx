
import React, { useCallback, useState } from "react";
import Navbar from "./components/Navbar";
import RecipeDetailView from "./components/RecipeDetailView";
import SearchView from "./components/SearchView";
import CuisineBar from "./components/Cuisine";
import HomeView from "./components/HomeView";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const API_URL = "https://www.themealdb.com/api/json/v1/1/";

const App = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const filterRecipe = useCallback(async (query, filterType) => {
    setSearchResult([]);
    setSearchLoading(true);

    try {
      const params = new URLSearchParams({
        [filterType]: query,
      });

      const res = await fetch(
        `${API_URL}filter.php?${params.toString()}`
      );

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const result = await res.json();

      console.log(`${query} recipes:`, result);

      setSearchResult(result?.meals || []);
    } catch (error) {
      console.error("Recipe filtering error:", error);
      setSearchResult([]);
    } finally {
      setSearchLoading(false);
    }
  }, []);

  const filterByCategory = useCallback(
    (category) => {
      filterRecipe(category, "c");
    },
    [filterRecipe]
  );

  const filterByArea = useCallback(
    (area) => {
      filterRecipe(area, "a");
    },
    [filterRecipe]
  );

  const handleSearch = useCallback(async (query) => {
    setSearchResult([]);
    setSearchLoading(true);

    try {
      const params = new URLSearchParams({
        s: query,
      });

      const res = await fetch(
        `${API_URL}search.php?${params.toString()}`
      );

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const result = await res.json();

      console.log("Search results:", result);

      setSearchResult(result?.meals || []);
    } catch (error) {
      console.error("Recipe search error:", error);
      setSearchResult([]);
    } finally {
      setSearchLoading(false);
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-950 font-sans text-gray-100">
        <Navbar handleSearch={handleSearch} />

        <CuisineBar filterByArea={filterByArea} />

        <Routes>
          <Route
            path="/"
            element={
              <HomeView filterByCategory={filterByCategory} />
            }
          />

          <Route
            path="/recipe/:id"
            element={<RecipeDetailView />}
          />

          <Route
            path="/search/:query"
            element={
              <SearchView
                meals={searchResult}
                loading={searchLoading}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
