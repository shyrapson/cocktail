import React, { useState, useContext, createContext, useEffect } from "react";
import { useCallback } from "react";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("a");
  const [cocktails, setCocktails] = useState([]);

  // The useCallback Hook only runs when one of its dependencies update.
  //  memoized, By caching the values that the function returns after its initial execution.
  // When we input the same value into our memoized function, it returns the value stored in the cache instead of running the function again,
  //  thus boosting performance. No longer does your program have to recalculate every number to get a result.
  // The useCallback hook is used when you have a component in which the child is rerendering again and again without need.

  const fetchDrinks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}${searchTerm}`);
      const data = await response.json();
      // destructuring drinks from the fetch data
      const { drinks } = data;
      if (drinks) {
        const newCocktails = drinks.map((item) => {
          const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } =
            item;
          // return all the str to a well meaniful names
          return {
            id: idDrink,
            names: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          };
        });
        setCocktails(newCocktails);
      } else {
        setCocktails([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchDrinks();
  }, [searchTerm, fetchDrinks]);

  return (
    <AppContext.Provider
      value={{
        loading,
        cocktails,
        setSearchTerm,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// crate and make use of global context
export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider };
