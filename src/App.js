import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Recipe from './Recipe';
const api_key = process.env.REACT_APP_API_KEY;
const api_id = process.env.REACT_APP_API_ID;

function App() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  useEffect(() => {
    getRecipes();
  }, [query]);

  // `https://api.edamam.com/search?q=${query}&app_id=${api_id}&app_key=${api_key}`
  const getRecipes = async () => {
    const response = await fetch(
      `/search?q=${query}&app_id=${api_id}&app_key=${api_key}`
    );

    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
      </header>
      <div className='App-content'>
        <h1>Edamam Recipe App</h1>
        <form onSubmit={getSearch} className='search-form'>
          <input
            type='text'
            className='search-bar'
            value={search}
            onChange={updateSearch}
          />
          <button className='search-button' type='submit'>
            Search
          </button>
        </form>
        <div className='recipes'>
          {recipes.map(recipe => (
            <Recipe
              key={recipe.recipe.label}
              title={recipe.recipe.label}
              calories={recipe.recipe.calories}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
