import React, { useState, useEffect } from 'react';

import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

   useEffect(() => { 
    const fetchMeals = async () => {
      setError(null);
      const response = await fetch('https://react-http-10a52-default-rtdb.firebaseio.com/meals.json');
  
      if (!response.ok) {
        throw new Error('Something went wrong!');
        // when we generate error we get an obj, by default has a .message property
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
      setIsLoading(false);
    }

    fetchMeals().catch(error => {
      setIsLoading(false);
      setError(error.message);
    });
    // we have to catch the error like this instead of wrapping in try {} and catch (error) {} because
    // fetchMeals() is an async func that returns promise, if it throws error inside promise that error will cause that promise to reject
    // we can't use try catch to wrap because we'd need to turn the fetchMeals with await and turn the first func in useEffect with async (not allowed with react)
  }, []);

  if (isLoading) {
    return <section className={classes.MealsLoading}>
      <p> Loading... </p>
    </section>
  }

  if (error) {
    return <section className={classes.MealsError}>
      <p>{error}</p>
    </section>
  }

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