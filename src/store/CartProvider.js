import React, { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = { items: [], totalAmount: 0 };

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM_TO_CART': {
      const updatedTotalAmount =
        state.totalAmount + action.payload.price * action.payload.amount;

      const existingCartItemIndex = state.items.findIndex(
        item => item.id === action.payload.id
      );
      const existingCartItem = state.items[existingCartItemIndex];

      let updatedItems;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.payload.amount,
        };

        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.payload);
      }

      return { ...state, totalAmount: updatedTotalAmount, items: updatedItems };
    }
    case 'REMOVE_ITEM_FROM_CART': {
      const cartItemIndex = state.items.findIndex(
        item => item.id === action.payload
      );
      const existingItem = state.items[cartItemIndex];
      const updatedTotalAmount = state.totalAmount - existingItem.price;

      let updatedItems;

      if (existingItem.amount === 1) {
        updatedItems = state.items.filter(item => item.id !== action.payload);
      } else {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        updatedItems = [...state.items];
        updatedItems[cartItemIndex] = updatedItem;
      }

      return { ...state, items: updatedItems, totalAmount: updatedTotalAmount };
    }
    case 'CLEAR_ITEMS_FROM_CART': {
      return { ...defaultCartState };
    }
    default:
      return { ...defaultCartState };
  }
};

const CartProvider = props => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCart = item => {
    dispatchCartAction({ type: 'ADD_ITEM_TO_CART', payload: item });
  };

  const removeItemFromCart = id => {
    dispatchCartAction({ type: 'REMOVE_ITEM_FROM_CART', payload: id });
  };

  const clearCartItems = () => {
    dispatchCartAction({ type: 'CLEAR_ITEMS_FROM_CART' });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCart,
    removeItem: removeItemFromCart,
    clearCart: clearCartItems,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
