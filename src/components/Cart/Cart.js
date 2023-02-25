import React, { useContext, useState } from 'react';

import CartContext from '../../store/cart-context';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import Checkout from './Checkout';
import classes from './Cart.module.css';

const Cart = props => {
  const [isCheckout, setIsCheckout] = useState(false);
  const cartContext = useContext(CartContext);

  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;

  const cartItemAddHandler = item => {
    cartContext.addItem({ ...item, amount: 1 });
  };

  const cartItemRemoveHandler = id => {
    cartContext.removeItem(id);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

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

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onHideCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal onCloseModal={props.onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onCancel={props.onHideCart} />}
      {!isCheckout && modalActions}
    </Modal>
  );
};

export default Cart;
