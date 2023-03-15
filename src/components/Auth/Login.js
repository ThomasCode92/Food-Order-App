import React, { useEffect, useState } from 'react';

import Modal from '../UI/Modal';
import classes from './Login.module.css';

const Login = props => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  useEffect(() => {
    if (enteredNameIsValid) {
      // Send Http Request...
      console.log('Name Input is valid');
    }
  }, [enteredNameIsValid]);

  const nameInputBlurHandler = event => {
    setEnteredNameTouched(true);

    if (enteredName.trim() === '') {
      return setEnteredNameIsValid(false);
    }
  };

  const nameInputChangeHandler = event => {
    setEnteredName(event.target.value);
  };

  const formSubmissionHandler = event => {
    event.preventDefault();

    setEnteredNameTouched(true);

    if (enteredName.trim() === '') {
      return setEnteredNameIsValid(false);
    }

    setEnteredNameIsValid(true);

    console.log(enteredName);
    setEnteredName('');
  };

  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

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
          <button className={classes.submit}>Submit</button>
        </div>
      </form>
    </Modal>
  );
};

export default Login;
