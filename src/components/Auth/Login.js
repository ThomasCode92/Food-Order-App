import React from 'react';
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

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(value => value.includes('@'));

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = event => {
    event.preventDefault();

    if (!enteredNameIsValid) return;

    console.log(enteredName, enteredEmail);

    resetNameInput();
    resetEmailInput();
  };

  const nameInputClasses = nameInputHasError
    ? `${classes['form-control']} ${classes.invalid}`
    : classes['form-control'];

  const emailInputClasses = emailInputHasError
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
            onBlur={emailBlurHandler}
            onChange={emailChangeHandler}
          />
          {emailInputHasError && (
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
