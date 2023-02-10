import React from 'react';

import classes from './CartItem.module.css';

const CartItem = props => {
  const cartItem = props.item;
  const price = `$${cartItem.price.toFixed(2)}`;

  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{cartItem.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {cartItem.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={cartItem.onRemove}>−</button>
        <button onClick={cartItem.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
