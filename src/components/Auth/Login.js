import React, { useState } from 'react';

import Modal from '../UI/Modal';
import classes from './Login.module.css';

const Login = props => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  const enteredNameIsValid = enteredName.trim() !== '';
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  let formIsValid = false;

  if (enteredNameIsValid) {
    formIsValid = true;
  }
  const nameInputBlurHandler = event => {
    setEnteredNameTouched(true);
  };

  const nameInputChangeHandler = event => {
    setEnteredName(event.target.value);
  };

  const formSubmissionHandler = event => {
    event.preventDefault();

    setEnteredNameTouched(true);

    if (!enteredNameIsValid) return;

    console.log(enteredName);
    setEnteredName('');
    setEnteredNameTouched(false);
  };

  const nameInputClasses = nameInputIsInvalid
    ? `${classes['form-control']} ${classes.invalid}`
    : classes['form-control'];

  return (
    <Modal onCloseModal={props.onHideLogin}>
      <form className={classes.form} onSubmit={formSubmissionHandler}>
        <div className={nameInputClasses}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={enteredName}
            onBlur={nameInputBlurHandler}
            onChange={nameInputChangeHandler}
          />
          {nameInputIsInvalid && (
            <p className={classes['error-text']}>Name must not be empty!</p>
          )}
        </div>
        <div className={classes['form-actions']}>
          <button className={classes.submit} disabled={!formIsValid}>
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default Login;
