import React, { useCallback, useState } from 'react';

import CartProvider from './store/CartProvider';

import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = useCallback(() => {
    setCartIsShown(true);
  }, []);

  const hideCartHandler = useCallback(() => {
    if (cartIsShown) { // Dummy Example!!!
      setCartIsShown(false);
    }
  }, [cartIsShown]);

  return (
    <CartProvider>
      <Header onShowCart={showCartHandler} />
      {cartIsShown && <Cart onHideCart={hideCartHandler} />}
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
