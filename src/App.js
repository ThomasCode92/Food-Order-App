import React, { useCallback, useState } from 'react';

import CartProvider from './store/CartProvider';

import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';
import Login from './components/Auth/Login';
import Meals from './components/Meals/Meals';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [loginIsShown, setLoginIsShown] = useState(false);

  const showCartHandler = useCallback(() => {
    setCartIsShown(true);
  }, []);

  const hideCartHandler = useCallback(() => {
    if (cartIsShown) {
      // Dummy Example!!!
      setCartIsShown(false);
    }
  }, [cartIsShown]);

  const toggleLoginHandler = () => {
    setLoginIsShown(prevState => !prevState);
  };

  return (
    <CartProvider>
      <Header onShowCart={showCartHandler} onShowLogin={toggleLoginHandler} />
      {cartIsShown && <Cart onHideCart={hideCartHandler} />}
      {loginIsShown && <Login onHideLogin={toggleLoginHandler} />}
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
