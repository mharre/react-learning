import React, { useState, useEffect } from 'react';

import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);

   useEffect(() => { 
    async function fetchMovies() {
      const response = await fetch('https://react-http-10a52-default-rtdb.firebaseio.com/meals.json');
  
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
  
      const data = await response.json();
  
      const loadedMeals = [];
      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price
        })
      }
      setMeals(loadedMeals);
    }
    fetchMovies();
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
      />));

    return (
        <section className={classes.meals}>
          <Card>
            <ul>
              {mealsList}
            </ul>
          </Card>
        </section>
    )
};

export default AvailableMeals;