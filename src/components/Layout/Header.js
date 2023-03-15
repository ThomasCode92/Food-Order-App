import React, { Fragment } from 'react';

import HeaderCartButton from './HeaderCartButton';
import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';
import HeaderLoginButton from './HeaderLoginButton';

const Header = props => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Food Order App</h1>
        <nav>
          <HeaderLoginButton onClick={props.onShowLogin} />
          <HeaderCartButton onClick={props.onShowCart} />
        </nav>
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt="A table full of delicious food!" />
      </div>
    </Fragment>
  );
};

export default React.memo(Header);
