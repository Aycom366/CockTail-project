import React from 'react';
import CocktailList from '../components/CocktailList';
import SearchForm from '../components/SearchForm';

const Home = () => {
  return (
    <main>
      {/* compnebt used to find cockstails */}
      <SearchForm />

      {/* component containging list of cocktails */}
      <CocktailList />
    </main>
  );
};

export default Home;
