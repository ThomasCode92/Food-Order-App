import React from 'react';
import Modal from '../UI/Modal';
import classes from './Login.module.css';

const Login = props => {
  return (
    <Modal onCloseModal={props.onHideLogin}>
      <form className={classes.form}>
        <div className={classes['form-control']}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" />
        </div>
        <div className={classes['form-actions']}>
          <button className={classes.submit}>Submit</button>
        </div>
      </form>
    </Modal>
  );
};

export default Login;
