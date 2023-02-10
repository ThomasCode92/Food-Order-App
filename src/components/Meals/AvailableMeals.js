import React, { useEffect, useState } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import Modal from '../UI/Modal';

const FIREBASE_URL = process.env.REACT_APP_FIREBASE_URL;

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(FIREBASE_URL);
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const loadedMeals = [];

      for (const key in responseData) {
        const loadedMeal = responseData[key];
        loadedMeals.push({
          ...loadedMeal,
          id: key,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch(error => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes['meals-loading']}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    const confirmError = () => {
      setHttpError(false);
    };

    return (
      <Modal onCloseModal={confirmError}>
        <div className={classes['error-message']}>
          <p>{httpError}</p>
        </div>
      </Modal>
    );
  }

  const mealsList = meals.map(meal => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      {mealsList.length > 0 && (
        <Card>
          <ul>{mealsList}</ul>
        </Card>
      )}
    </section>
  );
};

export default AvailableMeals;
