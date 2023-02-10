import React, { useEffect, useReducer } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import Modal from '../UI/Modal';

const FIREBASE_URL = process.env.REACT_APP_FIREBASE_URL;

const INITIAL_STATE = { meals: [], isLoading: true, httpError: false };

const mealsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MEALS':
      return { meals: action.payload, isLoading: false, httpError: false };
    case 'SET_HTTP_ERROR':
      return { meals: [], isLoading: false, httpError: action.payload };
    case 'CONFIRM_HTTP_ERROR':
      return { meals: [], isLoading: false, httpError: false };
    default:
      return INITIAL_STATE;
  }
};

const AvailableMeals = () => {
  const [mealsState, dispatchMealsState] = useReducer(
    mealsReducer,
    INITIAL_STATE
  );

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

      dispatchMealsState({ type: 'SET_MEALS', payload: loadedMeals });
    };

    fetchMeals().catch(error => {
      dispatchMealsState({ type: 'SET_HTTP_ERROR', payload: error.message });
    });
  }, []);

  if (mealsState.isLoading) {
    return (
      <section className={classes['meals-loading']}>
        <p>Loading...</p>
      </section>
    );
  }

  if (mealsState.httpError) {
    const confirmError = () => {
      dispatchMealsState({ type: 'CONFIRM_HTTP_ERROR' });
    };

    return (
      <Modal onCloseModal={confirmError}>
        <div className={classes['error-message']}>
          <p>{mealsState.httpError}</p>
        </div>
      </Modal>
    );
  }

  const mealsList = mealsState.meals.map(meal => (
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
