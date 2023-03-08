import React, { useCallback, useEffect, useMemo, useState } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import Modal from '../UI/Modal';

import useHttp from '../../hooks/use-http';

const FIREBASE_URL = process.env.REACT_APP_FIREBASE_URL;

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  const transformMeals = useCallback(mealsObj => {
    const loadedMeals = [];

    for (const key in mealsObj) {
      const loadedMeal = mealsObj[key];
      loadedMeals.push({
        ...loadedMeal,
        id: key,
      });
    }

    setMeals(loadedMeals);
  }, []);

  const requestConfig = useMemo(() => {
    return { url: FIREBASE_URL + '/meals.json' };
  }, []);

  const httpData = useHttp(requestConfig, transformMeals);
  const { isLoading, error, sendRequest: fetchMeals } = httpData;

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  if (isLoading) {
    return (
      <section className={classes['meals-loading']}>
        <p>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <Modal>
        <div className={classes['error-message']}>
          <p>{error}</p>
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
