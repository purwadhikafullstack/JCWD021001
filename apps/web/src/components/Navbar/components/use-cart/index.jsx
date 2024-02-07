// CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCart } from '../../../../pages/cart/services/getCart';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartData, setCartData] = useState([])

  const fetchCartCount = async () => {
    try {
      const cartData = await getCart();
      setCartCount(
        cartData.reduce((acc, cart) => acc + (cart.CartProducts ? cart.CartProducts.length : 0), 0),
      );
      setCartData(cartData)
      // console.log(cartData);
    } catch (err) {
      console.error('Error fetching cart count:', err);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, []);

  const values = {
    cartData,
    cartCount,
    fetchCartCount,
  };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  return useContext(CartContext);
};
