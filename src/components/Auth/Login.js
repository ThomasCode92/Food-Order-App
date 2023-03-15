import React, { useState } from 'react';
import useInput from '../../hooks/use-input';

import Modal from '../UI/Modal';
import classes from './Login.module.css';

const Login = props => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput(value => value.trim() !== '');

  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  const enteredEmailIsValid = enteredEmail.includes('@');
  const emailInputIsValid = !enteredEmailIsValid && enteredEmailTouched;

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const emailInputBlurHandler = event => {
    setEnteredEmailTouched(true);
  };

  const emailInputChangeHandler = event => {
    setEnteredEmail(event.target.value);
  };

  const formSubmissionHandler = event => {
    event.preventDefault();

    if (!enteredNameIsValid) return;

    console.log(enteredName, enteredEmail);

    resetNameInput();

    setEnteredEmail('');
    setEnteredEmailTouched(false);
  };

  const nameInputClasses = nameInputHasError
    ? `${classes['form-control']} ${classes.invalid}`
    : classes['form-control'];

  const emailInputClasses = emailInputIsValid
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
            onBlur={nameBlurHandler}
            onChange={nameChangeHandler}
          />
          {nameInputHasError && (
            <p className={classes['error-text']}>Name must not be empty!</p>
          )}
        </div>
        <div className={emailInputClasses}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onBlur={emailInputBlurHandler}
            onChange={emailInputChangeHandler}
          />
          {emailInputIsValid && (
            <p className={classes['error-text']}>Please enter a valid email!</p>
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
