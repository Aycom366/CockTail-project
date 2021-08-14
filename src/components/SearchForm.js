import React, { useEffect } from 'react';
import { useGlobalContext } from '../context';

//typing component
const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext();

  //uncontrolled inp9ut

  const searchValue = React.useRef('');

  //makes the form focus at load, ref is been used to get the previsous word inside the form
  useEffect(() => {
    searchValue.current.focus();
  }, []);

  //the searchCocktail triggering at input change
  const searchCocktail = () => {
    setSearchTerm(searchValue.current.value);
    console.log(searchValue.current.value);
  };

  //to avoid refreshing the app when the user is pressing enter key
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="section search">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">search your favorite cocktail</label>
          <input
            type="text"
            id="name"
            onChange={searchCocktail}
            ref={searchValue}
          />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
