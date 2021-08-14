import React from 'react';
import Loading from '../components/Loading';
import { useParams, Link } from 'react-router-dom';
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const SingleCocktail = () => {
  //the use params is what we pass in to another page just like an id
  //we access the id coming fom the cocktail page
  const { id } = useParams();

  const [loading, setLoading] = React.useState(false);

  //the single cocktail about to be rendered
  const [cocktail, setCocktail] = React.useState(null);

  React.useEffect(() => {
    setLoading(true);

    //we can also use a function in the useEffect
    async function getCocktail() {
      try {
        const response = await fetch(`${url}${id}`);
        const data = await response.json();
        console.log(data.drinks);
        if (data.drinks) {
          //checking the app return array of objects and right away desturcturing it, so therefore
          const {
            strDrink: name,
            strDrinkThumb: image,
            strAlcoholic: info,
            strCategory: category,
            strGlass: glass,
            strInstructions: instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          } = data.drinks[0];

          //ingredients arrays
          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          ];

          //setting the cocktail, if the object matches with the name have given it, your good to go
          const newCocktail = {
            name,
            image,
            info,
            category,
            glass,
            instructions,
            ingredients,
          };
          setCocktail(newCocktail);
        } else {
          setCocktail(null);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getCocktail();

    //anytimes the id changes or the page is loaded then get the cocktail
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!cocktail) {
    return <h2 className="section-title">no cocktail to display</h2>;
  }

  //to be able to use all these in the return componemts,we destructure the values in cocktail state to be able to used in the final destination
  const { name, image, category, info, glass, ingredients, instructions } =
    cocktail;

  return (
    <section className="section cocktail-section">
      <h2 className="section-title">{name}</h2>
      <div className="drink">
        <img src={image} alt={name} />
        <div className="drink-info">
          <p>
            <span className="drink-data">name: </span>
            {name}
          </p>
          <p>
            <span className="drink-data">category: </span>
            {category}
          </p>
          <p>
            <span className="drink-data">info: </span>
            {info}
          </p>
          <p>
            <span className="drink-data">glass: </span>
            {glass}
          </p>
          <p>
            <span className="drink-data">instructions: </span>
            {instructions}
          </p>
          <p>
            <span className="drink-data">ingredients :</span>
            {ingredients.map((item, index) => {
              //if item is not null
              return item ? <span key={index}>{item}</span> : null;
            })}
          </p>
        </div>
      </div>
      {/* back home link */}
      <Link to="/" className="btn btn-primary">
        back home
      </Link>
    </section>
  );
};

export default SingleCocktail;
