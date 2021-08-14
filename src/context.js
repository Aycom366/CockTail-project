import React, { useState, useContext, useEffect } from 'react';
import { useCallback } from 'react';

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  //loading
  const [loading, setLoading] = useState(true);

  //whatever we are typing in the form, essential to add something as a value in the usestate.
  const [searchTerm, setSearchTerm] = useState('a');

  //actuals cocktails list
  const [cocktails, setCocktails] = useState([]);

  //fetching drinl from cocktails db API, calling these function on every input
  //use call back means, if something changes in the function, then run this function
  const fetchDrinks = useCallback(async () => {
    setLoading(true);

    try {
      //the $(ur) is the url of the api itself,to search by name, we just added the parameter to search hich is the searchTerm
      const response = await fetch(`${url}${searchTerm}`);
      const data = await response.json();

      //destructure drink from my API
      const { drinks } = data;

      //if drink is not null, just grab only the objects below
      if (drinks) {
        const newCocktails = drinks.map((item) => {
          const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } =
            item;

          //right away chaning them into new objects so i can used them
          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          };
        });
        setCocktails(newCocktails);
      }
      //else if its null, then set cocktails to null
      else {
        setCocktails([]);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
    //and also create from the scratch only if searchTerm changes
  }, [searchTerm]);

  //only run this term if the form to search is changing
  useEffect(() => {
    fetchDrinks();
  }, [searchTerm, fetchDrinks]);

  return (
    <AppContext.Provider value={{ loading, cocktails, setSearchTerm }}>
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
