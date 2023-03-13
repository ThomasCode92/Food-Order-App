import React, { useState } from 'react';

import Modal from '../UI/Modal';
import classes from './Login.module.css';

const Login = props => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(true);

  const nameInputChangeHandler = event => {
    setEnteredName(event.target.value);
  };

  const formSubmissionHandler = event => {
    event.preventDefault();

    if (enteredName.trim() === '') {
      return setEnteredNameIsValid(false);
    }

    setEnteredNameIsValid(true);

    console.log(enteredName);
    setEnteredName('');
  };

  const nameInputClasses = enteredNameIsValid
    ? classes['form-control']
    : `${classes['form-control']} ${classes.invalid}`;

  return (
    <Modal onCloseModal={props.onHideLogin}>
      <form className={classes.form} onSubmit={formSubmissionHandler}>
        <div className={nameInputClasses}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={enteredName}
            onChange={nameInputChangeHandler}
          />
          {!enteredNameIsValid && (
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
