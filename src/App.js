import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import pages
import Home from './pages/Home';
import About from './pages/About';
import SingleCocktail from './pages/SingleCocktail';
import Error from './pages/Error';

// import components
import Navbar from './components/Navbar';
function App() {
  return (
    <div>
      {/* The Router would make us navigate between pages */}
      <Router>
        {/* The Navbar would be on all pages so therefore would be place above the swtich  */}
        <Navbar />

        {/* The switch makes us access other pages */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          {/* A page passing parameter */}

          <Route exact path="/cocktail/:id">
            <SingleCocktail />
          </Route>
          <Route exact path="*">
            <Error />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
