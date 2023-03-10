import React, { Fragment, useContext, useMemo, useState } from 'react';

import CartContext from '../../store/cart-context';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import Checkout from './Checkout';
import classes from './Cart.module.css';

import useHttp from '../../hooks/use-http';

const FIREBASE_URL = process.env.REACT_APP_FIREBASE_URL;

const Cart = props => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartContext = useContext(CartContext);
  const { items } = cartContext;

  const requestConfig = useMemo(() => {
    return {
      url: FIREBASE_URL + '/orders.json',
      method: 'POST',
    };
  }, []);

  const httpData = useHttp(requestConfig);
  const { isLoading, sendRequest: submitOrder } = httpData;

  const sortedItems = useMemo(() => {
    return items.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      } else if (b.name > a.name) {
        return -1;
      }
      return 0;
    });
  }, [items]);

  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
  const hasItems = items.length > 0;

  const cartItemAddHandler = item => {
    cartContext.addItem({ ...item, amount: 1 });
  };

  const cartItemRemoveHandler = id => {
    cartContext.removeItem(id);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async userData => {
    requestConfig.body = {
      user: userData,
      orderedItems: items,
    };

    await submitOrder();
    setDidSubmit(true);

    cartContext.clearCart();
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {sortedItems.map(cartItem => (
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

  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onHideCart} />
      )}
      {!isCheckout && modalActions}
    </Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;
  const didSubmitModalContent = (
    <Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onHideCart}>
          Close
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal onCloseModal={props.onHideCart}>
      {!isLoading && !didSubmit && cartModalContent}
      {isLoading && isSubmittingModalContent}
      {didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
