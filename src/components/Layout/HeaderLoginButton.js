import React from 'react';

import classes from './HeaderLoginButton.module.css';

const HeaderLoginButton = props => {
  return (
    <button className={classes.button} onClick={props.onClick}>
      Login
    </button>
  );
};

export default HeaderLoginButton;
