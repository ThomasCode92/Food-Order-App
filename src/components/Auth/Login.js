import React, { useState } from 'react';

import Modal from '../UI/Modal';
import classes from './Login.module.css';

const Login = props => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  const enteredNameIsValid = enteredName.trim() !== '';
  const enteredEmailIsValid = enteredEmail.includes('@');

  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;
  const emailInputIsValid = !enteredEmailIsValid && enteredEmailTouched;

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const nameInputBlurHandler = event => {
    setEnteredNameTouched(true);
  };

  const nameInputChangeHandler = event => {
    setEnteredName(event.target.value);
  };

  const emailInputBlurHandler = event => {
    setEnteredEmailTouched(true);
  };

  const emailInputChangeHandler = event => {
    setEnteredEmail(event.target.value);
  };

  const formSubmissionHandler = event => {
    event.preventDefault();

    setEnteredNameTouched(true);

    if (!enteredNameIsValid) return;

    console.log(enteredName, enteredEmail);

    setEnteredName('');
    setEnteredEmail('');
    setEnteredNameTouched(false);
    setEnteredEmailTouched(false);
  };

  const nameInputClasses = nameInputIsInvalid
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
            onBlur={nameInputBlurHandler}
            onChange={nameInputChangeHandler}
          />
          {nameInputIsInvalid && (
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
