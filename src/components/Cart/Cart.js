import React, { useContext } from 'react';

import CartContext from '../../store/cart-context';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';

const Cart = props => {
  const cartContext = useContext(CartContext);

  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;

  const cartItemAddHandler = item => {};

  const cartItemRemoveHandler = id => {};

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartContext.items.map(cartItem => (
        <CartItem
          key={cartItem.id}
          item={cartItem}
          onAdd={cartItemAddHandler.bind(null, cartItem)}
          onRemove={cartItemRemoveHandler.bind(null, cartItem.id)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onCloseModal={props.onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onHideCart}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
