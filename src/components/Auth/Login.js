import React, { useState } from 'react';

import Modal from '../UI/Modal';
import classes from './Login.module.css';

const Login = props => {
  const [enteredName, setEnteredName] = useState('');

  const nameInputChangeHandler = event => {
    setEnteredName(event.target.value);
  };

  const formSubmissionHandler = event => {
    event.preventDefault();

    if (enteredName.trim() === '') {
      return;
    }

    console.log(enteredName);
    setEnteredName('');
  };

  return (
    <Modal onCloseModal={props.onHideLogin}>
      <form className={classes.form} onSubmit={formSubmissionHandler}>
        <div className={classes['form-control']}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={enteredName}
            onChange={nameInputChangeHandler}
          />
        </div>
        <div className={classes['form-actions']}>
          <button className={classes.submit}>Submit</button>
        </div>
      </form>
    </Modal>
  );
};

export default Login;
